import { useNavigate } from 'react-router-dom';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Rating from '@mui/material/Rating';

import styles from './Card.module.scss';
import TripType from '../../types/TripType';
import useTripStore from '../../store/trip';
import { formatDate } from '../formatDate';

import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import PublicIcon from '../PublicIcon/PublicIcon';


interface CardProps {
    addCard?: boolean;
    trip?: TripType;
    scale?: number;
}

const Card: React.FC<CardProps> = ({ addCard = false, trip, scale = 1 }: CardProps) => {
    const navigate = useNavigate();
    const { deleteTrip } = useTripStore();

    const handleClick = (id: string) => {
        navigate(`/my-trips/${id}`);
    }

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
        <div className={styles.cardContainer} style={{ transform: `scale(${scale})` }}>
                {addCard ? (
                    <div className={styles.cardContainerInner} onClick={() => handleClick(addCard ? 'add' : trip!._id!)}>
                        <div className={styles.addCard}>
                            <AddCircleOutlineIcon />
                            <p>Add new trip</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.editDelete}>
                            <EditButton onClick={() => handleEditTrip(trip!._id!)} />
                            <DeleteButton onClick={() => handleDeleteTrip(trip!)} />
                        </div>
                        <div className={styles.cardContainerInner} onClick={() => handleClick(addCard ? 'add' : trip!._id!)}>
                            <div className={styles.imageContainer}>
                                <img src={trip!.imageUrl} alt="image" />
                                <div className={`${styles.publicIcon} ${trip!.isPublic ? styles.public : ""}`}>
                                    <PublicIcon size={35} isPublic={trip!.isPublic} />
                                </div>
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
                )}
                </div>
    );
}

export default Card;
