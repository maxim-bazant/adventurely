import { useNavigate } from "react-router-dom";
import TripType from "../../types/TripType";
import styles from "./ExploreCard.module.scss"
import { formatDate } from "../formatDate";
import { Rating } from "@mui/material";

interface ExploreCardProps {
    trip: TripType;
    user?: any;
    scale?: number;
}

const ExploreCard = ({ trip, user, scale = 1 }: ExploreCardProps) => {
    const navigate = useNavigate();

    const handleClick = (id: string) => {
        navigate(`/explore/${id}`);
    }

    const handleUSerClick = () => {
        navigate(`/explore/user-profile/${user.user_id}`)
    }

    return (
        <div className={styles.cardContainer} style={{ transform: `scale(${scale})` }}>
            {
                user &&

                <div className={styles.profile} onClick={handleUSerClick}>
                    <img src={user?.picture} alt="profile picture" />
                </div>
            }
            <div className={styles.CardContainer}>
                <div className={styles.cardContainerInner} onClick={() => handleClick(trip!._id!)}>
                    <div className={styles.imageContainer}>
                        <img src={trip!.imageUrl} alt="image" />
                    </div>
                    <div className={styles.infoContainer}>
                        <h2 className={styles.title}>{trip!.title}</h2>
                        <div className={styles.descriptionContainer}>
                            <p>{trip!.description}</p>
                        </div>
                        <div className={styles.dateRating}>
                            <div className={styles.dateContainer}>
                                <p className={styles.date}>{formatDate(trip!.startDate)}</p>
                                <p className={styles.date}>{formatDate(trip!.endDate)}</p>
                            </div>
                            <div className={styles.rating}>
                                <Rating name="read-only" value={+(trip!.rating ?? 0)} readOnly />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExploreCard;