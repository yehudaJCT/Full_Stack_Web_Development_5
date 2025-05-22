import React from 'react';

const FloatingActionButton = () => (
  <button
    className="btn btn-light border rounded-circle position-absolute"
    style={{
      width: 70,
      height: 70,
      bottom: 30,
      right: 30,
      fontSize: 36,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}
  >
    +
  </button>
);

export default FloatingActionButton;