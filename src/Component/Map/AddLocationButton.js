// AddLocationButton.js
import React from 'react';

const AddLocationButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ position: 'absolute', top: '10px', right: '10px' }}>
      Add Location
    </button>
  );
};

export default AddLocationButton;
