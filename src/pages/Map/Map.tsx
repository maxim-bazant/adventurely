import styles from "./Map.module.scss";

import WorldMap from "../../components/WorldMap/WorldMap";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import CircleProgressBar from "../../components/CircleProgressBar/CircleProgressBar";

import countries from "../../components/CountriesList";


const Map = () => {
    const { user } = useAuth0();
    const [visitedCountries, setVisitedCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/api/trips/countries/${user?.sub}`);
            setVisitedCountries(res.data);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.mainContainer}>
            <DashboardHeader title="World Map"/>
            <WorldMap visitedCountries={visitedCountries}/>
            <div className={styles.data}>
                <div className={styles.VisitedCountriesContainer}>
                    <h1>Visited countries</h1>
                    <div className={styles.VisitedCountriesList}>
                        {visitedCountries.map((country, index) => (
                            <p key={index}>{country}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.ProgressCircleContainer}>
                    <div className={styles.circle}>
                        <CircleProgressBar number={visitedCountries.length} totalNumber={Object.keys(countries).length}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;