import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./TripDetail.module.scss";

import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Loader from "../../components/Loader/Loader";

import useTripStore from "../../store/trip";
import { useAuth0 } from "@auth0/auth0-react";

import EditButton from "../../components/EditButton/EditButton";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import TripType from "../../types/TripType";
import TripDeatilInfo from "../../components/TripDetailInfo/TripDetailInfo";


const TripDetailPage = () => {
  const { user } = useAuth0();
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchTripsForUser, deleteTrip, trips, isLoading } = useTripStore();

  useEffect(() => {
    if (user?.sub) {
      fetchTripsForUser(user.sub); 
    }
  }, [fetchTripsForUser, user]);
  
  // Find the trip by id
  const trip = trips.find((t) => t._id === id);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditTrip = (id: string) => {
    navigate(`/my-trips/edit/${id}`);
  }

  const handleDeleteTrip = async (trip: TripType) => {
    try {
        await deleteTrip(trip!);
        navigate('/my-trips');
        console.log("✅ Trip deleted");
    } catch (error) {
        console.error("❌ Failed to delete trip:", error);
    }
};

  return (
    (isLoading && <Loader message="Loading trip details..." />) ||
    <div className={styles.container}>
      {trip ? (
        // Display the trip details
        <div>
          <div className={styles.actionButtons}>
            <button className={styles.goBackButton} onClick={handleGoBack}>Go Back</button>

            {/* Edit and delete buttons (hide when not the owner of the trip) */}
            <div className={styles.editDelete}>
              <EditButton size={35} onClick={() => handleEditTrip(trip._id!)} />
              <DeleteButton size={35} onClick={() => handleDeleteTrip(trip)} />
          </div>
          </div>
          <div className={styles.tripDetailInfoContainer}>
            <TripDeatilInfo trip={trip}/>
          </div>
        </div>

      ) : (
        // Display an error message if the trip is not found
        <div className={styles.errorContainer}>
          <DashboardHeader title="Couldn't find your trip..." button={{ title: "Go Back", onClick: handleGoBack }} />
        </div>
      )}
    </div>
  );
};

export default TripDetailPage;
