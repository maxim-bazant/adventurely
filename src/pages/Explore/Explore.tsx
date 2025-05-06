import styles from './Explore.module.scss';
import { useEffect } from 'react';
import useUserStore from '../../store/users';
import Loader from '../../components/Loader/Loader';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import CardGrid from '../../components/CardGrid/CardGrid';
import useTripStore from '../../store/trip';
import { useAuth0 } from '@auth0/auth0-react';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';


const Explore = () => {
    const { user } = useAuth0();
    const { users, fetchUsers, isLoadingUsers } = useUserStore();
    const { trips, getTrips, isLoading } = useTripStore();

    useEffect(() => {
        fetchUsers();
        getTrips();
    }, []);

    const publicTrips = () => {
        return trips.filter((trip) => {
            return trip.isPublic === true;
        })
        .filter((trip) => {
            return trip.userID !== user?.sub;
        });
    }

    return (
        ((isLoadingUsers || isLoading) && <Loader message="Loading trips to explore" />) ||
        <div className={styles.mainContainer}>
            <DashboardHeader title='Explore' />
            <CardGrid>
                { publicTrips().map((trip) => {
                    return (
                        <ExploreCard key={trip._id} trip={trip} user={users.filter((user) => {
                            return user.user_id == trip.userID
                        })[0]} />
                    )
                })}
            </CardGrid>
        </div>
    );
};

export default Explore;