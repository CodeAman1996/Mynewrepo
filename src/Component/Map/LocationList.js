// LocationList.js
import React from 'react';

const LocationList = ({ locations, onRevisit, onRemove }) => {
  return (
    <div>
      <h2>Location List</h2>
      <ul>
       {locations && locations.map((location) => (

          <li key={location.id}>
            Latitude: {location.lat}, Longitude: {location.lng}
            <button onClick={() => onRevisit(location)}>Revisit</button>
            <button onClick={() => onRemove(location.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
