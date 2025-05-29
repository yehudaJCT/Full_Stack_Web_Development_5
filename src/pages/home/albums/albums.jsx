import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider';
import { getAll } from '../../../utils/dbUtil';
import AlbumList from './AlbumList';
import { filterAlbums } from '../../../utils/searchUtils';
import { sortAlbums } from '../../../utils/sortUtils';

const Albums = ({ searchTerm, sortBy = "id" }) => {
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
  
  // Sort the filtered albums
  const sortedAlbums = sortAlbums(filteredAlbums, sortBy);

  const getSortDescription = () => {
    switch (sortBy) {
      case "title":
        return "sorted by title";
      case "id":
      default:
        return "sorted by ID";
    }
  };

  return (
    <div>
      {(searchTerm || sortBy !== "id") && (
        <div className="alert alert-info mb-3">
          <small>
            {searchTerm ? (
              <>
                Found <strong>{sortedAlbums.length}</strong> album{sortedAlbums.length !== 1 ? 's' : ''} 
                {` matching "${searchTerm}"`}
                {sortBy !== "id" && `, ${getSortDescription()}`}
              </>
            ) : (
              <>
                Showing <strong>{sortedAlbums.length}</strong> album{sortedAlbums.length !== 1 ? 's' : ''} {getSortDescription()}
              </>
            )}
          </small>
        </div>
      )}
      <AlbumList 
        albums={sortedAlbums} 
        setAlbums={setAlbums}
        searchTerm={searchTerm}
        showSearchResults={false} // We're handling this in the parent component now
      />
    </div>
  );
};

export default Albums;