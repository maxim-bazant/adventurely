import { useNavigate, useParams } from "react-router-dom";
import useTripStore from "../../store/trip";
import NotFound from "../NotFound";
import TripForm from "../../components/TripForm/TripForm";
import FormDataType from "../../types/FormDataType";
import Loader from "../../components/Loader/Loader";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

const EditTrip = () => {
    const { trips, editTrip, isLoading } = useTripStore();
    const navigate = useNavigate();

    const tripID = useParams<{ id: string }>().id;
    const trip = trips.find((trip) => trip._id === tripID);

    if (!trip) {
        return <NotFound />;
    }

    const handleSubmit = async (newTripData: FormDataType) => {
        await editTrip(tripID!, newTripData, trip.imageUrl, trip.moreInfo);
        navigate(-1);
    };

    return (
        ( isLoading && <Loader message="Editing your trip..."/> )||
        <div>
            <DashboardHeader title="Editing Your Trip" button={{ title: "Back", onClick: () => navigate(-1)}}/>
            <TripForm initialData={trip} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditTrip;
