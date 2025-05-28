import React from 'react';
import AlbumList from './AlbumList';
import { filterAlbums } from '../../../utils/searchUtils';
import { useDataManagement } from '../../../hooks/useDataManagement';

const Albums = ({ searchTerm }) => {
  const { data: albums, loading, error, setData: setAlbums } = useDataManagement('albums');

  if (loading) return <div>Loading albums...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
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