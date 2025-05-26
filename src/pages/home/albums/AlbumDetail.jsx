import React, { useState } from 'react';
import { update, remove } from '../../../utils/dbUtil';
import PhotoList from './PhotoList';

const AlbumDetail = ({ selectedAlbum, setSelectedAlbum, setAlbums }) => {
  const [editTitle, setEditTitle] = useState(selectedAlbum.title || '');

  const handleSave = async () => {
    try {
      const updated = await update('albums', selectedAlbum.id, { ...selectedAlbum, title: editTitle });
      setAlbums(prev => prev.map(a => (a.id === selectedAlbum.id ? updated : a)));
      setSelectedAlbum(null);
    } catch (err) {
      alert('Failed to save changes');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this album?')) return;
    try {
      await remove('albums', selectedAlbum.id);
      setAlbums(prev => prev.filter(a => a.id !== selectedAlbum.id));
      setSelectedAlbum(null);
    } catch (err) {
      alert('Failed to delete album');
    }
  };

  const handleBack = () => {
    setSelectedAlbum(null);
  };

  return (
    <div>
      <h4>Edit Album</h4>
      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          className="form-control"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
      </div>
      <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
      <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
      <button className="btn btn-secondary" onClick={handleBack}>Back</button>
      <PhotoList albumId={selectedAlbum.id} />
    </div>
  );
};

export default AlbumDetail;
