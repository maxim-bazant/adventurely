import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Redirect to /dashboard if the user tries to access a non-existent route
const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/my-trips');
    }
    , [navigate]);

    return null;
};

export default NotFound;
