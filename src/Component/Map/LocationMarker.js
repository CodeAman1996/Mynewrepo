// LocationMarker.js
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const LocationMarker = ({ location, onClick }) => {
  return (
    <Marker
      position={{ lat: location.lat, lng: location.lng }}
      onClick={onClick}
    >
      <InfoWindow position={{ lat: location.lat, lng: location.lng }}>
        <div>
          <h3>Selected Location</h3>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      </InfoWindow>
    </Marker>
  );
};

export default LocationMarker;
