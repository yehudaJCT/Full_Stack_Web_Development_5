import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider';
import { getAll } from '../../../utils/dbUtil';
import AlbumList from './AlbumList';

const Albums = () => {
    const { currentUser } = useContext(UserContext);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            getAll('albums')
                .then(data => {
                    const userAlbums = data.filter(album => String(album.userId) === String(currentUser));
                    setAlbums(userAlbums);
                })
                .finally(() => setLoading(false));
        } else {
            setAlbums([]);
            setLoading(false);
        }
    }, [currentUser]);

    if (loading) return <div>Loading albums...</div>;
    if (albums.length === 0) return <div>No albums found for this user.</div>;

    return (
        <AlbumList albums={albums} setAlbums={setAlbums} />
    );
};

export default Albums;