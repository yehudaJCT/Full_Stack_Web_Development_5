import React, { useState, useEffect } from 'react';
import AlbumDetail from './AlbumDetail';
import { useUrlNavigation } from '../../../hooks/useUrlNavigation';

const AlbumList = ({ albums, setAlbums, searchTerm = '', showSearchResults = false }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const { parseCurrentUrl, navigateToAlbum, navigateToAlbums } = useUrlNavigation();

  // Parse URL to determine if we should show a specific album
  useEffect(() => {
    const urlState = parseCurrentUrl();
    if (urlState.activeItemId && urlState.activeTab === 'albums') {
      const albumId = parseInt(urlState.activeItemId);
      const album = albums.find(a => a.id === albumId);
      if (album) {
        setSelectedAlbum(album);
      }
    } else {
      setSelectedAlbum(null);
    }
  }, [parseCurrentUrl, albums]);

  const handleDoubleClick = (album) => {
    setSelectedAlbum(album);
    navigateToAlbum(album.id);
  };

  const handleBackToList = () => {
    setSelectedAlbum(null);
    navigateToAlbums();
  };

  if (selectedAlbum) {
    return (
      <AlbumDetail
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
        setAlbums={setAlbums}
        onBack={handleBackToList}
        searchTerm={searchTerm}
      />
    );
  }

  return (
    <div>
      {showSearchResults && (
        <div className="alert alert-info mb-3">
          <small>
            Found <strong>{albums.length}</strong> album{albums.length !== 1 ? 's' : ''} 
            matching "{searchTerm}"
          </small>
        </div>
      )}
      <h4>Your Albums</h4>
      <ul className="list-group">
        {albums.map(album => (
          <li
            key={album.id}
            className="list-group-item"
            onDoubleClick={() => handleDoubleClick(album)}
            style={{ cursor: 'pointer' }}
            title="Double-click to view/edit album"
          >
            <strong> {album.id}. </strong>
            <strong> {album.title} </strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;