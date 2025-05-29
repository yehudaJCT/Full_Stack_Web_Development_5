import React, { useState } from 'react';
import { update, remove } from '../../../utils/dbUtil';
import PhotoList from './PhotoList';
import { useUrlNavigation } from '../../../hooks/useUrlNavigation';

const AlbumDetail = ({ selectedAlbum, setSelectedAlbum, setAlbums, onBack, searchTerm = '' }) => {
  const [editTitle, setEditTitle] = useState(selectedAlbum.title || '');
  const { navigateToAlbums, navigateToPhotos } = useUrlNavigation();

  const handleSave = async () => {
    try {
      const updated = await update('albums', selectedAlbum.id, { 
        ...selectedAlbum, 
        title: editTitle 
      });
      setAlbums(prev => prev.map(a => (a.id === selectedAlbum.id ? updated : a)));
      handleBack();
    } catch (err) {
      alert('Failed to save changes');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this album?')) return;
    try {
      await remove('albums', selectedAlbum.id);
      setAlbums(prev => prev.filter(a => a.id !== selectedAlbum.id));
      handleBack();
    } catch (err) {
      alert('Failed to delete album');
    }
  };

  const handleBack = () => {
    setSelectedAlbum(null);
    if (onBack) {
      onBack();
    } else {
      navigateToAlbums();
    }
  };

  const handleViewPhotos = () => {
    navigateToPhotos(selectedAlbum.id);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Edit Album</h4>
        <small className="text-muted">Album ID: {selectedAlbum.id}</small>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          className="form-control"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
      </div>
      
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
        <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
        <button className="btn btn-secondary me-2" onClick={handleBack}>Back</button>
        <button className="btn btn-info" onClick={handleViewPhotos}>View Photos</button>
      </div>

      <PhotoList albumId={selectedAlbum.id} searchTerm={searchTerm} />
    </div>
  );
};

export default AlbumDetail;