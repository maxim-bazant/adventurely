import { useAuth0 } from "@auth0/auth0-react";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

import styles from "./Profile.module.scss";
import useTripStore from "../../store/trip";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const { user, logout } = useAuth0();
    const { trips } = useTripStore();

    const handleLogOut = () => {
        logout({ returnTo: window.location.origin } as any);
    };

    const [visitedCountries, setVisitedCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`https://adventurely-backend.onrender.com/api/trips/countries/${user?.sub}`);
            setVisitedCountries(res.data);
        };
        fetchData();
    }, []);


    return (
        <div>

        <div className={styles.mainContainer}>
            <DashboardHeader title="Profile Settings" />
            <div className={styles.infoContainer}>
                <div className={styles.profileImageContainer}>
                    <img src={user?.picture}/>
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.infoColumn}>
                        <span className={styles.label}>Name</span>
                        <span className={styles.value}>{user?.name}</span>
                    </div>
                    <div className={styles.infoColumn}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.value}>{user?.email}</span>
                    </div>
                    <div className={styles.infoColumn}>
                        <span className={styles.label}>Nickname</span>
                        <span className={styles.value}>{user?.nickname}</span>
                    </div>
                </div>
            </div>
            
            <DashboardHeader title="My Adventurely" />
            <div className={styles.infoContainer}>
                <div className={styles.profileInfo}>
                    <div className={styles.infoColumn}>
                        <span className={styles.label}>Total Trips</span>
                        <span className={styles.value}>{trips.length}</span>
                    </div>
                    <div className={styles.infoColumn}>
                        <span className={styles.label}>Countries Visited</span>
                        <span className={styles.value}>{visitedCountries.length}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.buttonContainer}>
            <button className={styles.logOutBtn} onClick={handleLogOut}>Log out</button>
        </div>
    </div>
    );
};

export default Profile;