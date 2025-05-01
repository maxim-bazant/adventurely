import { useParams } from "react-router-dom"
import styles from "./PublicUserProfile.module.scss"
import { useEffect } from "react";
import useUserStore from "../../store/users";
import Loader from "../../components/Loader/Loader";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import CardGrid from "../../components/CardGrid/CardGrid";
import useTripStore from "../../store/trip";
import ExploreCard from "../../components/ExploreCard/ExploreCard";

export default function PublicUserProfilePage() {
    const { users, getUser, isLoadingUsers } = useUserStore();
    const { trips, fetchTripsForUser } = useTripStore();
    const { userID }= useParams();

    useEffect(() => {
        if (userID && !users?.find(user => user.id === userID)) {
            getUser(userID);
            fetchTripsForUser(userID);
        }
    }, [userID]);

    return (
        ( isLoadingUsers && <Loader message="Getting user details"/> ||

        <div className={styles.mainContainer}>
            <DashboardHeader title="Profile Info" />
            <div className={styles.infoContainer}>
                <div className={styles.profileImageContainer}>
                    <img src={users[0]?.picture}/>
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.infoColumn}>
                        <span className={styles.label}>Name</span>
                        <span className={styles.value}>{users[0]?.name}</span>
                    </div>
                    <div className={styles.infoColumn}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.value}>{users[0]?.email}</span>
                    </div>
                    <div className={styles.infoColumn}>
                        <span className={styles.label}>Nickname</span>
                        <span className={styles.value}>{users[0]?.nickname}</span>
                    </div>
                </div>
            </div>
            
            <DashboardHeader title="Other Trips" />
            <CardGrid>
                {
                    trips
                        .filter((trip) => trip.isPublic)
                        .reverse()
                        .map((trip) => (
                            <ExploreCard key={trip._id} trip={trip} scale={0.9}/>
                        ))
                }
            </CardGrid>
            
    </div>
        )
    )
}