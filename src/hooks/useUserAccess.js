import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from '../utils/users';

export const useUserAccess = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAccess = () => {
            try {
                const currentUser = getCurrentUser();

                // If no current user, redirect to login
                if (!currentUser) {
                    navigate('/login');
                    return;
                }

                const urlUserId = params.userId;
                const currentUserId = currentUser.userId?.toString();

                // If there's a userId in the URL, check if it matches current user
                if (urlUserId && urlUserId !== currentUserId) {
                    setError(`Access forbidden. You can only view your own data.`);
                    setIsAuthorized(false);

                    // Redirect to current user's URL after a short delay
                    setTimeout(() => {
                        const currentPath = window.location.pathname;
                        const newPath = currentPath.replace(`/users/${urlUserId}`, `/users/${currentUserId}`);
                        navigate(newPath);
                    }, 2000);

                    setIsLoading(false);
                    return;
                }

                // Access granted
                setIsAuthorized(true);
                setError(null);
                setIsLoading(false);

            } catch (err) {
                console.error('Error checking user access:', err);
                setError('An error occurred while verifying access.');
                setIsAuthorized(false);
                setIsLoading(false);
            }
        };

        checkAccess();
    }, [params.userId, navigate]);

    const redirectToUserData = () => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            const currentPath = window.location.pathname;
            const pathParts = currentPath.split('/');
            const newPath = currentPath.replace(`/users/${pathParts[2]}`, `/users/${currentUser.userId}`);
            navigate(newPath); 
        }
    };

    return {
        isAuthorized,
        isLoading,
        error,
        currentUser: getCurrentUser(),
        redirectToUserData
    };
};