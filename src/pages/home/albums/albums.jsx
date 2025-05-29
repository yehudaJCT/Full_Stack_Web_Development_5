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
      {searchTerm && (
        <div className="alert alert-info mb-3">
          <small>
            Found <strong>{filteredAlbums.length}</strong> album{filteredAlbums.length !== 1 ? 's' : ''} 
            {searchTerm && ` matching "${searchTerm}"`}
          </small>
        </div>
      )}
      <AlbumList 
        albums={filteredAlbums} 
        setAlbums={setAlbums} 
      />
    </div>
  );
};

export default Albums;