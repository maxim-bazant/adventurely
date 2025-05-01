import useTripStore from "../../store/trip";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import TripForm from "../../components/TripForm/TripForm";

import FormDataType from "../../types/FormDataType";
import Loader from "../../components/Loader/Loader";


const AddTrip = () => {
  const { addTrip, isLoading } = useTripStore();
  const navigate = useNavigate();

  const handleAddTrip = async (data: FormDataType) => {
    try {
      await addTrip(data);
      navigate("/my-trips");
    } catch (error) {
      console.error("Failed to add trip:", error);
    } finally {
    }
  };

  return (
    ( isLoading && <Loader message="Adding your new Trip..."/> )||
    <div>
      <DashboardHeader title="Add new trip" button={{ title: "Go Back", onClick: () => navigate("/my-trips")}}/>
      <TripForm onSubmit={handleAddTrip}/>
    </div>
  );
};

export default AddTrip;
