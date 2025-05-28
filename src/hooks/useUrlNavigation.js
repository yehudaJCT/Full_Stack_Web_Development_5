import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useCallback } from "react";
import { getCurrentUser } from "../utils/users";

export const useUrlNavigation = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const currentUser = getCurrentUser();

    // Get current user ID from params or current user
    const getUserId = useCallback(() => {
        return params.userId || currentUser?.userId || "1";
    }, [params.userId, currentUser?.userId]);

    // Navigate to different sections with informative URLs
    const navigateToSection = useCallback((section, itemId = null, subSection = null, subItemId = null) => {
        const userId = getUserId();
        let url = `/users/${userId}`;

        if (section) {
            url += `/${section}`;
        }

        if (itemId) {
            url += `/${itemId}`;
        }

        if (subSection) {
            url += `/${subSection}`;
        }

        if (subItemId) {
            url += `/${subItemId}`;
        }

        navigate(url);
    }, [navigate, getUserId]);

    // Specific navigation functions
    const navigateToPosts = useCallback(() => {
        navigateToSection('posts');
    }, [navigateToSection]);

    const navigateToPost = useCallback((postId) => {
        navigateToSection('posts', postId);
    }, [navigateToSection]);

    const navigateToAlbums = useCallback(() => {
        navigateToSection('albums');
    }, [navigateToSection]);

    const navigateToAlbum = useCallback((albumId) => {
        navigateToSection('albums', albumId);
    }, [navigateToSection]);

    const navigateToPhotos = useCallback((albumId) => {
        navigateToSection('albums', albumId, 'photos');
    }, [navigateToSection]);

    const navigateToPhoto = useCallback((albumId, photoId) => {
        navigateToSection('albums', albumId, 'photos', photoId);
    }, [navigateToSection]);

    const navigateToTodos = useCallback(() => {
        navigateToSection('todos');
    }, [navigateToSection]);

    const navigateToTodo = useCallback((todoId) => {
        navigateToSection('todos', todoId);
    }, [navigateToSection]);

    const navigateToHome = useCallback(() => {
        const userId = getUserId();
        navigate(`/users/${userId}`);
    }, [navigate, getUserId]);

    // Parse current URL to determine active section and item
    const parseCurrentUrl = useCallback(() => {
        const { userId, postId, albumId, photoId, todoId } = params;
        const pathSegments = location.pathname.split('/').filter(Boolean);
        
        let activeTab = 'posts'; // default
        let activeItemId = null;
        let subSection = null;
        let subItemId = null;

        if (pathSegments.includes('posts')) {
            activeTab = 'posts';
            activeItemId = postId;
        } else if (pathSegments.includes('albums')) {
            activeTab = 'albums';
            activeItemId = albumId;
            if (pathSegments.includes('photos')) {
                subSection = 'photos';
                subItemId = photoId;
            }
        } else if (pathSegments.includes('todos')) {
            activeTab = 'todos';
            activeItemId = todoId;
        }

        return {
            userId: userId || getUserId(),
            activeTab,
            activeItemId,
            subSection,
            subItemId,
            pathSegments
        };
    }, [params, location.pathname, getUserId]);

    return {
        navigateToPosts,
        navigateToPost,
        navigateToAlbums,
        navigateToAlbum,
        navigateToPhotos,
        navigateToPhoto,
        navigateToTodos,
        navigateToTodo,
        navigateToHome,
        navigateToSection,
        parseCurrentUrl,
        currentParams: params,
        currentLocation: location,
        getUserId
    };
};