import styles from "./TripDetailInfo.module.scss"

import PublicIcon from "../../components/PublicIcon/PublicIcon";
import { formatDate } from "../../components/formatDate";

import EventIcon from '@mui/icons-material/Event';
import WalletIcon from '@mui/icons-material/Wallet';
import PlaceIcon from '@mui/icons-material/Place';
import { blue } from "@mui/material/colors";
import { Rating } from "@mui/material";
import TripType from "../../types/TripType";

interface TripDetailInfoProps {
    trip: TripType;
}

const TripDeatilInfo = ({ trip }: TripDetailInfoProps) => {
    return (
        <>
        <div className={styles.tripInfo}>
            <div className={styles.tripDetailContainer}>
            <div className={styles.imageContainer}>
                <img src={trip.imageUrl} alt="trip image" />
                <div className={`${styles.publicIcon} ${trip!.isPublic ? styles.public : ""}`}>
                    <PublicIcon size={50} isPublic={trip!.isPublic} />
                </div>
            </div>
            <div className={styles.tripDetail}>
                <h1>{trip.title}</h1>
                <p className={styles.description}>{trip.description}</p>
                <div className={styles.date}>
                <EventIcon fontSize="large" sx={{ color: blue[900] }}/>
                <p>{formatDate(trip.startDate)}</p>
                <p> - </p>
                <p>{formatDate(trip.endDate)}</p>
                </div>
                <div className={styles.price}>
                <WalletIcon fontSize="large" sx={{ color: blue[900] }}/>
                <p>${trip.price}</p>
                </div>
                
                <div className={styles.rating}>
                <Rating size="large" name="read-only" value={+(trip!.rating ?? 0)}readOnly />
                </div>
            </div>
            </div>
            <div className={styles.countriesContainer}>
                <PlaceIcon fontSize="large" sx={{ color: blue[900] }}/>
                <div className={styles.countries}>
                    { trip.countries.map((country, index) => (
                    <p key={index} style={{ marginBlock: 5 }}>{country}</p>
                    ))}
                </div>
            </div>
        </div>

        {/* Display the more info section */}
        <div className={styles.moreInfoContainer}>
            <div className={styles.moreInfo}>
            {trip.moreInfo.map((info, index) => (
            info.type === "Title" ? (
                <div className={styles.moreInfoTitle} key={index}>
                <h1 key={index}>{info.content}</h1>
                </div>
            ) : info.type === "Text" ? (
                <div className={styles.moreInfoText} key={index}>
                {info.content.split('\n').map((line: string, lineIndex: number) => (
                    <p key={lineIndex}>{line}</p> 
                ))}
                </div>
            ) : info.type === "Image" ? (
                <img key={index} src={info.content} alt="Uploaded" />
            ) : null
            ))}

            </div>
        </div>
        </>
    );
};

export default TripDeatilInfo;