import React, { useEffect, useState } from 'react';
import { getAll } from '../../../utils/dbUtil';
import FloatingActionButton from '../Components/floatingActionButton';



const PHOTOS_PER_PAGE = 8;

const PhotoList = ({ albumId }) => {
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
        setVisiblePhotos(filtered.slice(0, PHOTOS_PER_PAGE));
        setPage(1);
      })
      .finally(() => setLoading(false));
  }, [albumId]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const nextPhotos = allPhotos.slice(0, nextPage * PHOTOS_PER_PAGE);
    setVisiblePhotos(nextPhotos);
    setPage(nextPage);
  };

  if (loading) return <div>Loading photos...</div>;
  if (allPhotos.length === 0) return <div>No photos in this album.</div>;

  return (
    <div className="mt-3">
      <h5>Photos</h5>
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
      {visiblePhotos.length < allPhotos.length && (
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