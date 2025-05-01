import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import styles from "./TripForm.module.scss";
import TripType from "../../types/TripType";
import FormDataType from "../../types/FormDataType";

import imageCompression from "browser-image-compression";
import { Switch } from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";
import CountrySelector from "../CountrySelector/CountrySelector";
import PlusButtonWithOptions from "../PlusButtonWithOptions/PlusButtonWithOptions";
import MoreInfoBox from "../MoreInfoBox/MoreInfoBox";

interface TripFormProps {
  initialData?: TripType;
  onSubmit: (data: FormDataType) => Promise<void>;
}

const TripForm: React.FC<TripFormProps> = ({ initialData, onSubmit }) => {
  const { user } = useAuth0();

  // Use optional chaining and default values to handle undefined initialData
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [rating, setRating] = useState<number | null>(initialData?.rating || 0);
  const [price, setPrice] = useState<number | null>(initialData?.price || null);
  const [startDate, setStartDate] = useState<string | null>(initialData?.startDate || null);
  const [endDate, setEndDate] = useState<string | null>(initialData?.endDate || null);
  const [countries, setCountries] = useState<string[]>(initialData?.countries || []);
  const [isPublic, setPublic] = useState<boolean>(initialData?.isPublic || false);

  const [moreInfo, setMoreInfo] = useState<{ id: number; [key: string]: any }[]>(
    initialData?.moreInfo?.map((info, index) => ({ id: index, ...info })) || []
  );
  
  const [formError, setFormError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData] = useState(new FormData());
  const [chosenOption, setChosenOption] = useState<string>("");
  
  const TITLE_LIMIT = 25;
  const DESCRIPTION_LIMIT = 200;

  useEffect(() => {
      if (chosenOption) {
        const newInfo = { id: Date.now(), type: chosenOption}; // Adjust the content as needed
        setMoreInfo((prevInfo) => [...prevInfo, newInfo]);
        setChosenOption(""); // Reset the chosen option
      }
    }, [chosenOption]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null); // Clear form error when user uploads a new image
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validImageTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, or WEBP).");
      return;
    }

    setLoadingImage(true);

    const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: true };
    const compressedFile = await imageCompression(file, options);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setLoadingImage(false);
    };
    reader.readAsDataURL(compressedFile);

    if (formData.has("file")) { // Remove previous file if exists. When user uploads a new image
      formData.delete("file");
    };

    formData.append("file", compressedFile);
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateFrom = e.target.value;
    setStartDate(newDateFrom);
    if (endDate && new Date(newDateFrom) > new Date(endDate)) {
      setDateError("Start date cannot be later than end date.");
    } else {
      setDateError(null);
    }
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (startDate && new Date(newEndDate) < new Date(startDate)) {
      setDateError("End date cannot be earlier than start date.");
    } else {
      setDateError(null);
    }
  };

  const handleMoreInfoChange = (id: number, content: string | File) => {
    setFormError(null); // Clear form error when user uploads a new image
    setMoreInfo((prevInfo) =>
      prevInfo.map((info) =>
        info.id === id ? { ...info, "content": content } : info
      )
    );
    console.log(moreInfo);
  };

  const handleMoreInfoDelete = (id: number) => {
    setMoreInfo((prevInfo) => prevInfo.filter((info) => info.id !== id));
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Ensure required fields are filled
    if (!title || !description || rating === null || !price || !startDate || !endDate || !countries || !formData.get("file") && !initialData?.imageUrl) {
      // check all variables to get rid of the null value warning otherwise, but in reality it's not possible to have null values
      setFormError("Please upload image!");
      
      return;
    }

    // Ensure all more info fields are filled
    if (moreInfo.some((info) => !info.content)) {
      setFormError("Please fill in all more info fields.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setDateError("End date cannot be earlier than start date.");
      return;
    }
  
    try {
      setFormError(null);
      setDateError(null);

      onSubmit({
        userID: user?.sub || "",
        title,
        description,
        price,
        startDate,
        endDate,
        rating,
        imageFormData: formData,
        countries,
        isPublic,
        moreInfo
      });

    } catch (error: any) {
      if (error.response?.data?.imageUrl) {
        console.error("Failed to upload image:", error);
        setFormError("Failed to upload image. Please try again.");
      } else {
        console.error("Failed to submit form:", error);
        setFormError("Failed to submit form. Please try again.");
      }
    }
  };
  

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={handleSubmit}>
        <h2>Main Card Info</h2>
        <div className={styles.cardInfo}>
          {/* Image and Upload Button */}
          <div className={styles.imageSection}>
            <div className={styles.imageBox}>
            {loadingImage ? (
                <p>Loading...</p>
              ) : imagePreview ? (
                <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
              ) : initialData?.imageUrl ? (
                <img src={initialData.imageUrl} alt="Preview" className={styles.imagePreview} />
              ) : (
                <p>No Image Uploaded</p>
              )}
            </div>
            <Button
              variant="contained"
              component="label"
              className={styles.uploadButton}
            >
              { imagePreview ? "Change Image" : "Upload Image" }
              <input type="file" name="image" hidden onChange={handleImageUpload} />
            </Button>
            {formError && <p className={styles.errorMessage}>{formError}</p>}
          </div>

          <div className={styles.textContainer}>
            {/* Title and Description */}
            <div className={styles.titleDescriptionSection}>
              <div className={styles.inputField}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  slotProps={{
                    htmlInput: {
                        maxLength: TITLE_LIMIT,
                    },
                }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p>{TITLE_LIMIT - title.length} characters remaining</p>
              </div>
              <div className={styles.inputField}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  slotProps={{
                    htmlInput: {
                        maxLength: DESCRIPTION_LIMIT,
                    },
                }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p>
                  {DESCRIPTION_LIMIT - description.length} characters remaining
                </p>
              </div>
              <div className={styles.inputField}>
                <CountrySelector value={countries} onChange={setCountries} />
              </div>
            </div>

            {/* Other Info (Price, Rating, Date) */}
            <div className={styles.otherInfoSection}>
              <div className={styles.inputField}>
                <TextField
                  label="Price ($)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  required
                  value={price || ""}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
              </div>
              <div className={styles.inputField}>
                <TextField
                  label="Date From"
                  type="date"
                  required
                  slotProps={{
                    inputLabel: {
                        shrink: true,
                    }
                }}
                  fullWidth
                  value={startDate || ""}
                  onChange={handleDateFromChange} // Updated event handler
                />
              </div>
              <div className={styles.inputField} style={{ marginBottom: "0px" }}>
                <TextField
                  label="Date To"
                  type="date"
                  required
                  slotProps={{
                    inputLabel: {
                        shrink: true,
                    }
                }}
                  fullWidth
                  value={endDate || ""}
                  onChange={handleDateToChange} // Updated event handler
                />
              </div>
              <div className={styles.dateError}>
                {dateError && <p className={styles.errorMessage}>{dateError}</p>} {/* Date error message */}
              </div>
              <div className={styles.inputField}>
                <div className={styles.ratingContainer}>
                    <p>Rating:</p>
                    <Rating
                    name="rating"
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue ?? 0)}
                    />
                </div>
              </div>
              <div className={styles.inputField}>
                <div className={styles.ratingContainer}>
                  <p>Public: </p>
                  <Switch
                    checked={isPublic}
                    onChange={(_, newValue) => setPublic(newValue)}
                    inputProps={{ 'aria-label': 'public setting' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.moreInfoSection}>
          <h2>More Info</h2>
        </div>

        {moreInfo.length > 0 && (
          <ul>
            {moreInfo.map((info) => (
              <MoreInfoBox
                key={info.id}
                info={info}
                onChange={handleMoreInfoChange}
                onDelete={handleMoreInfoDelete}
              />
            ))}
          </ul>
        )}

        
        <div className={styles.moreInfo}>
            <PlusButtonWithOptions setChosenOption={setChosenOption}/>
        </div>

        <div className={styles.addButton}>
            <button
                className="fillBtn"
                type="submit"
                disabled={!!(formError || dateError) || loadingImage}
            >
              {
                initialData?._id ? "Save Changes" : "Add New Trip"
              }
            </button>
        </div>
      </form>

    </div>
  );
};

export default TripForm;
