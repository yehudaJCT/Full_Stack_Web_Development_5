import React, { useState } from 'react';
import AlbumDetail from './AlbumDetail';

const AlbumList = ({ albums, setAlbums }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  if (selectedAlbum) {
    return (
      <AlbumDetail
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
        setAlbums={setAlbums}
      />
    );
  }

  return (
    <div>
      <h4>Your Albums</h4>
      <ul className="list-group">
        {albums.map(album => (
          <li
            key={album.id}
            className="list-group-item"
            onDoubleClick={() => setSelectedAlbum(album)}
            style={{ cursor: 'pointer' }}
            title="Double-click to view/edit album"
          >
            <strong>{album.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
