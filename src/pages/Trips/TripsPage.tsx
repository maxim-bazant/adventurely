import styles from './Trips.module.scss';
import Card from '../../components/Card/Card';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import { useNavigate } from 'react-router-dom';
import useTripStore from '../../store/trip';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../../components/Loader/Loader';
import CardGrid from '../../components/CardGrid/CardGrid';


const TripsPage = () => {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const { fetchTripsForUser, trips, isLoading } = useTripStore();

    useEffect(() => {
        fetchTripsForUser(user!.sub!);
    }, [fetchTripsForUser, user]);


    const handleAddTrip = () => {
        navigate('/my-trips/add');
    }

    return (
        ( isLoading && <Loader message="Loading your trips..."/> )||
        <div className={styles.container}>
            <DashboardHeader title="My Trips" button={{ title: "+ Add Trip", onClick: handleAddTrip }}/>
            
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
