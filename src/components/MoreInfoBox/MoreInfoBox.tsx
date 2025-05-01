import { TextField, Button } from "@mui/material";
import styles from "./MoreInfoBox.module.scss";
import DeleteButton from "../DeleteButton/DeleteButton";
import imageCompression from "browser-image-compression";
import { useState } from "react";

interface MoreInfoBoxProps {
  info: {
    id: number;
    [key: string]: any;
  };
  onChange: (id: number, content: any) => void;
  onDelete: (id: number) => void;
}

const MoreInfoBox = ({ info, onChange, onDelete }: MoreInfoBoxProps) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(info.content as string);
  const [formData] = useState(new FormData()); 
  const [loadingImage, setLoadingImage] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (info.type === "Image" && file) {
      // Validate file type
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validImageTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF, or WEBP).");
        return;
      }
  
      // Compress image
      setLoadingImage(true);

      const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);

      formData.append("file", compressedFile);

      onChange(info.id, formData); // Pass base64 to display the preview
  
      // Generate a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setLoadingImage(false);
      };
      reader.readAsDataURL(compressedFile);
    } else {
      onChange(info.id, e.target.value);
    }
  };
  
  return (
    <div className={styles.container}>
      {info.type === "Image" ? (
        <div className={styles.imageContainer}>
          {loadingImage ? (
            <div className={styles.imagePreview}>
              <p>No image uploaded</p>
            </div>
            ) : ( info.content ? (
              <img src={imagePreview} alt="Uploaded" />
            ) : (
              <div className={styles.imagePreview}>
                <p>No image uploaded</p>
              </div>
            )
          )}
          <div className={styles.buttonContainer}>
            <Button variant="contained" component="label">
              {info.content ? "Change" : "Upload"} Image
              <input type="file" hidden onChange={handleChange} />
            </Button>
            <div className={styles.deleteButtonContainer}>
              <DeleteButton onClick={() => onDelete(info.id)} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.box}>
            <TextField
              label={info.type}
              value={info.content || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={info.type === "Title" ? 1 : (info.type === "Text" && info.content ? Math.max(info.content.split("\n").length, 3) : 3)}
              required
            />
          </div>
          <div className={styles.deleteButtonContainer}>
            <DeleteButton onClick={() => onDelete(info.id)} />
          </div>
        </>
      )}
    </div>
  );
};

export default MoreInfoBox;
