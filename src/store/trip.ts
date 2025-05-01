import { create } from "zustand";
import axios from "axios";
import TripType from "../types/TripType";
import FormDataType from "../types/FormDataType";

interface TripStore {
  trips: TripType[]; // Array of trips
  isLoading: boolean; // Loading state
  addTrip: (trip: FormDataType) => Promise<void>; // Add a new trip
  deleteTrip: (trip: TripType) => Promise<void>; // Delete a trip
  getTrips: () => Promise<void>; // Get all trips
  fetchTripsForUser: (userID: string) => Promise<void>; // Fetch trips for a user
  editTrip: (tripID: string, data: FormDataType, currentImageUrl: string, currentMoreInfo: FormDataType["moreInfo"]) => Promise<void>; // Edit a trip
}

const useTripStore = create<TripStore>((set) => ({
  trips: [],
  isLoading: false,

  addTrip: async (trip: FormDataType) => {
    set({ isLoading: true });
    try {
      // MORE INFO UPLOAD TO S3
      const updatedMoreInfo = await Promise.all(
        trip.moreInfo.map(async (info) => {
          if (info.type === "Image" && info.content instanceof FormData) {
            try {
              const imageUrl = await axios.post("https://adventurely-backend.onrender.com/api/bucket/upload", info.content, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              return { ...info, content: imageUrl.data.imageUrl }; // Update content with S3 URL
            } catch (error) {
              console.error(`Error uploading image for ID ${info._id}:`, error);
              return info; // Return original object if upload fails
            }
          }
          return info; // Return unchanged object for non-image types
        })
      );
    

      // MAIN IMAGE UPLOAD TO S3
      const response = await axios.post("https://adventurely-backend.onrender.com/api/bucket/upload", trip.imageFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // MongoDB ready Trip with image URL
      const finalTrip: TripType = { ...trip, imageUrl: response.data.imageUrl, moreInfo: updatedMoreInfo };
      
      const res = await axios.post("https://adventurely-backend.onrender.com/api/trips", finalTrip, {
        headers: { "Content-Type": "application/json" },
      });

      const newTrip = res.data.newTrip;
      
      set((state) => ({
        trips: [newTrip, ...state.trips],
      }));
    } catch (error) {
      console.error("❌ Failed to add trip:", error);
    } finally {
      set({ isLoading: false });
      console.log("✅ Trip added");
    }
  },

  getTrips: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("https://adventurely-backend.onrender.com/api/trips");
      set({ trips: res.data });
    } catch (error) {
      console.error("❌ Failed to fetch trips:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTripsForUser: async (userID) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`https://adventurely-backend.onrender.com/api/trips/${userID}`);
      set({ trips: res.data });
    } catch (error) {
      console.error("❌ Failed to fetch trips:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTrip: async (trip: TripType) => {
    set({ isLoading: true });
    try {

      // MORE INFO delete from S3
      await Promise.all(
        trip.moreInfo.map(async (info) => {
          if (info.type === "Image") {
            try {
              await axios.delete("https://adventurely-backend.onrender.com/api/bucket/delete", { data: { imageUrl: info.content } });
            } catch (error) {
              console.error(`Error deleting image for ID ${info._id}:`, error);
            }
          }
        })
      );

      if (trip.imageUrl) {
        await axios.delete("https://adventurely-backend.onrender.com/api/bucket/delete", { data: { imageUrl: trip.imageUrl } });
      }
      await axios.delete(`/api/trips/${trip._id}`);
      set((state) => ({
        trips: state.trips.filter((t) => t._id !== trip._id),
      }));
    } catch (error) {
      console.error("❌ Failed to delete trip:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  editTrip: async (tripID: string, newTripData: FormDataType, currentImageUrl: string, currentMoreInfo: FormDataType["moreInfo"]) => {
    set({ isLoading: true });
    try {
      let uploadedImageUrl = currentImageUrl; // Default to existing image

      if (newTripData.imageFormData.get("file")) {
        // Upload new image
        const response = await axios.post("https://adventurely-backend.onrender.com/api/bucket/upload", newTripData.imageFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedImageUrl = response.data.imageUrl;

        // Delete old image
        await axios.delete("https://adventurely-backend.onrender.com/api/bucket/delete", { data: { imageUrl: currentImageUrl } });
      }

      
      const modifiedOrRemoved = currentMoreInfo.filter(item1 => {
        const match = newTripData.moreInfo.find(item2 => item1.id === item2.id);
        return !match || match.name !== item1.name; // Return true if removed or name changed
      });

      await Promise.all(
        modifiedOrRemoved.map(async (info) => {
          try {
            // Delete image for removed info
            if (info.type === "Image") {
              await axios.delete("https://adventurely-backend.onrender.com/api/bucket/delete", { data: { imageUrl: info.content } });
            }
          } catch (error) {
            console.error(`Error deleting image for ID ${info._id}:`, error);
          }
        }
      ));

      // MORE INFO UPLOAD TO S3
      await Promise.all(
        newTripData.moreInfo.map(async (info) => {
          if (info.type === "Image" && info.content instanceof FormData) {
            try {
              const response = await axios.post("https://adventurely-backend.onrender.com/api/bucket/upload", info.content, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              info.content = response.data.imageUrl;
            } catch (error) {
              console.error(`Error uploading image for ID ${info._id}:`, error);
            }
          }
          })
      )


      // Update trip in database
      await axios.put(`https://adventurely-backend.onrender.com/api/trips/${tripID}`, {
        title: newTripData.title,
        description: newTripData.description,
        price: newTripData.price,
        startDate: newTripData.startDate,
        endDate: newTripData.endDate,
        rating: newTripData.rating,
        imageUrl: uploadedImageUrl,
        countries: newTripData.countries,
        isPublic: newTripData.isPublic,
        moreInfo: newTripData.moreInfo,
      } as TripType);

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip._id === tripID ? { ...trip, ...newTripData, imageUrl: uploadedImageUrl } : trip
        ),
      }));

    } catch (error) {
      console.error("❌ Failed to edit trip:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTripStore;
