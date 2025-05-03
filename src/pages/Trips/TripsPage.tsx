import styles from './Trips.module.scss';
import Card from '../../components/Card/Card';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import useTripStore from '../../store/trip';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../../components/Loader/Loader';
import CardGrid from '../../components/CardGrid/CardGrid';
import { useNavigate } from 'react-router-dom';


const TripsPage = () => {
    const { user } = useAuth0();
    const { fetchTripsForUser, trips, isLoading } = useTripStore();
    const navigate = useNavigate()

    useEffect(() => {
        fetchTripsForUser(user!.sub!);
    }, [fetchTripsForUser, user]);

    const handleOnClick = () => {
        navigate("/my-trips/add")
    }

    return (
        ( isLoading && <Loader message="Loading your trips..."/> )||
        <div className={styles.container}>
            <DashboardHeader title="My Trips" button={{ title: "+ Add", onClick: handleOnClick, hideOnMobile: true }}/>
            
            <CardGrid>
                {/* Reverse the trips array to show the latest trip first */}
                {trips.reverse().map((trip) => (
                    <Card
                    key={trip._id}
                    trip={trip}
                    />
                ))}
                
                <Card addCard={true} />
            </CardGrid>
            </div>
    );
};

export default TripsPage;
