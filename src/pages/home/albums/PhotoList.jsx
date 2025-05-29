import React, { useEffect, useState } from 'react';
import { getAll, remove, update } from '../../../utils/dbUtil'; // Added deleteItem and updateItem
import { filterPhotos } from '../../../utils/searchUtils';
import FloatingActionButton from '../Components/floatingActionButton';

const PHOTOS_PER_PAGE = 8;

const PhotoList = ({ albumId, searchTerm = '' }) => {
  const [allPhotos, setAllPhotos] = useState([]);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getAll('photos')
      .then(data => {
        const filtered = data.filter(photo => String(photo.albumId) === String(albumId));
        setAllPhotos(filtered);
        
        const searchFiltered = filterPhotos(filtered, searchTerm);
        setVisiblePhotos(searchFiltered.slice(0, PHOTOS_PER_PAGE));
        setPage(1);
      })
      .finally(() => setLoading(false));
  }, [albumId, searchTerm]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const searchFiltered = filterPhotos(allPhotos, searchTerm);
    const nextPhotos = searchFiltered.slice(0, nextPage * PHOTOS_PER_PAGE);
    setVisiblePhotos(nextPhotos);
    setPage(nextPage);
  };

  const handleDelete = (photoId) => {
    remove('photos', photoId).then(() => {
      const updatedPhotos = allPhotos.filter(photo => photo.id !== photoId);
      setAllPhotos(updatedPhotos);
      setVisiblePhotos(filterPhotos(updatedPhotos, searchTerm).slice(0, page * PHOTOS_PER_PAGE));
    });
  };

  const handleEdit = (photoId, newTitle) => {
    update('photos', photoId, { title: newTitle }).then(() => {
      const updatedPhotos = allPhotos.map(photo =>
        photo.id === photoId ? { ...photo, title: newTitle } : photo
      );
      setAllPhotos(updatedPhotos);
      setVisiblePhotos(filterPhotos(updatedPhotos, searchTerm).slice(0, page * PHOTOS_PER_PAGE));
    });
  };

  if (loading) return <div>Loading photos...</div>;
  if (allPhotos.length === 0) return <div>No photos in this album.</div>;

  const filteredPhotos = filterPhotos(allPhotos, searchTerm);

  if (filteredPhotos.length === 0 && searchTerm) {
    return (
      <div className="mt-3">
        <h5>Photos</h5>
        <div className="alert alert-info">
          No photos found matching "{searchTerm}" in this album.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h5>Photos</h5>
      {searchTerm && (
        <div className="alert alert-info mb-3">
          <small>
            Found <strong>{filteredPhotos.length}</strong> photo{filteredPhotos.length !== 1 ? 's' : ''} 
            matching "{searchTerm}" in this album
          </small>
        </div>
      )}
      <div className="row">
        {visiblePhotos.map(photo => (
          <div key={photo.id} className="col-6 col-md-4 col-lg-3 mb-3">
            <div className="card">
              <img src={photo.thumbnailUrl} alt={photo.title} className="card-img-top" />
              <div className="card-body">
                <small>{photo.title}</small>
                <div className="mt-2">
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(photo.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      const newTitle = prompt('Enter new title:', photo.title);
                      if (newTitle) handleEdit(photo.id, newTitle);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visiblePhotos.length < filteredPhotos.length && (
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
      <FloatingActionButton activeTab={"photos"} setData={setAllPhotos} />
    </div>
  );
};

export default PhotoList;