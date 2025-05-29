import { useState, useEffect, useCallback, useContext } from 'react';
import { getAll } from '../utils/dbUtil';
import { UserContext } from './userProvider';

export const useDataManagement = (resourceType) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(UserContext);

    // Load data for the current user 
    const loadData = useCallback(async () => {
        if (!currentUser) {
            setData([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const allData = await getAll(resourceType);
            const userData = allData.filter(item =>
                String(item.userId) === String(currentUser)
            );
            setData(userData);
        } catch (err) {
            setError(`Failed to load ${resourceType}`);
            console.error(`Error loading ${resourceType}:`, err);
        } finally {
            setLoading(false);
        }
    }, [currentUser, resourceType]);

    // Load data when component mounts or user changes
    useEffect(() => {
        loadData();
    }, [loadData]);

    // Add new item to the data
    // const addItem = useCallback((newItem) => {
    //     setData(prev => [...prev, newItem]);
    // }, []);

    const addItem = (newItem) => {setData(prev => [...prev, newItem]);}

    // Update existing item
    const updateItem = useCallback((itemId, updatedItem) => {
        setData(prev => prev.map(item =>
            item.id === itemId ? updatedItem : item
        ));
    }, []);

    // Remove item
    const removeItem = useCallback((itemId) => {
        setData(prev => prev.filter(item => item.id !== itemId));
    }, []);

    // Find item by ID
    const findItemById = useCallback((itemId) => {
        return data.find(item => item.id === parseInt(itemId));
    }, [data]);

    // Refresh data
    const refreshData = useCallback(() => {
        loadData();
    }, [loadData]);

    return {
        data,
        loading,
        error,
        addItem,
        updateItem,
        removeItem,
        findItemById,
        refreshData,
        setData
    };
};