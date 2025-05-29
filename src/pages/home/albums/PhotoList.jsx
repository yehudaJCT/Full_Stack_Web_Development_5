import React, { useEffect, useState } from 'react';
import { getAll } from '../../../utils/dbUtil';
import { filterPhotos } from '../../../utils/searchUtils';

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
        
        // Apply search filter and reset pagination
        const searchFiltered = filterPhotos(filtered, searchTerm);
        setVisiblePhotos(searchFiltered.slice(0, PHOTOS_PER_PAGE));
        setPage(1);
      })
      .finally(() => setLoading(false));
  }, [albumId, searchTerm]); // Added searchTerm as dependency

  const handleLoadMore = () => {
    const nextPage = page + 1;
    // Apply search filter before pagination
    const searchFiltered = filterPhotos(allPhotos, searchTerm);
    const nextPhotos = searchFiltered.slice(0, nextPage * PHOTOS_PER_PAGE);
    setVisiblePhotos(nextPhotos);
    setPage(nextPage);
  };

  if (loading) return <div>Loading photos...</div>;
  if (allPhotos.length === 0) return <div>No photos in this album.</div>;

  // Get filtered photos for display logic
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
    </div>
  );
};

export default PhotoList;