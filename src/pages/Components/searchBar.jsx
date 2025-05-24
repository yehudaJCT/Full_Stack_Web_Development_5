import React from 'react';

const SearchBar = () => (
  <div className="d-flex align-items-center mb-4 w-100" style={{ maxWidth: 700 }}>
    <span className="me-2" style={{ fontSize: 24 }}>&#128269;</span>
    <input
      type="text"
      className="form-control me-2"
      placeholder="Search"
    />
    <span className="ms-2" style={{ fontSize: 28 }}>&#9776;</span>
  </div>
);

export default SearchBar;