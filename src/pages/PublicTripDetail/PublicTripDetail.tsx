import { useNavigate, useParams } from "react-router-dom";
import TripDeatilInfo from "../../components/TripDetailInfo/TripDetailInfo";
import useTripStore from "../../store/trip";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";

import styles from "./PublicTripDetail.module.scss"
import useUserStore from "../../store/users";

const PublicTripDetailPage = () => {
    const { id } = useParams();
    const { users, getUser, isLoadingUsers } = useUserStore();
    const { trips, getTrips, isLoading } = useTripStore();
    const navigate = useNavigate();

    useEffect(() => {
        getTrips();
    }, [])

    useEffect(() => {
        if (trips) {
            const trip = trips.find(trip => trip._id === id);
            if (trip) {
                getUser(trip.userID);
            }
        }
    }, [trips])

    const trip = trips.find((t) => t._id === id);
    if (!trip) {
        return
    }

    const handleClick = () => {
        navigate(`/explore/user-profile/${trip.userID}`)
    }

    return (
        ((isLoading || isLoadingUsers) && <Loader message="Loading trip details..." />) ||
        <div>
            <div className={styles.profileContainer}>
                <div className={styles.profileInnerContainer} onClick={handleClick}>
                    <img src={users[0]?.picture} alt="Profile picture" />
                    <p>{ users[0]?.nickname }</p>
                </div>
            </div>
            <TripDeatilInfo trip={trip} />
        </div>
    );
};

export default PublicTripDetailPage;