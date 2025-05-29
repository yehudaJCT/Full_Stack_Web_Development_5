import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider';
import { getAll } from '../../../utils/dbUtil';
import AlbumList from './AlbumList';
import { filterAlbums } from '../../../utils/searchUtils';


const Albums = ({ searchTerm }) => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);

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
  }, [currentUser, setAlbums]);

  if (loading) return <div>Loading albums...</div>;
  if (albums.length === 0) return <div>No albums found for this user.</div>;

  // Filter albums based on search term
  const filteredAlbums = filterAlbums(albums, searchTerm || '');

  return (
    <div>
      <AlbumList 
        albums={filteredAlbums} 
        setAlbums={setAlbums}
        searchTerm={searchTerm}
        showSearchResults={searchTerm && filteredAlbums.length !== albums.length}
      />
    </div>
  );
};

export default Albums;