import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';

const Map = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: -34.397,
    lng: 150.644,
  };

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('locations'));
    if (storedLocations) {
      setLocations(storedLocations);
    }
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ id: uuidv4(), lat, lng });
  };

  const handleAddLocation = () => {
    if (selectedLocation) {
      const newLocation = {
        id: selectedLocation.id,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        name: `Location ${locations.length + 1}`,
      };
      setLocations([...locations, newLocation]);
      localStorage.setItem('locations', JSON.stringify([...locations, newLocation]));
      setSelectedLocation(null);
    }
  };

  const handleRevisitLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleRemoveLocation = (id) => {
    const updatedLocations = locations.filter(location => location.id !== id);
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onClick={handleMapClick}
      >
        {selectedLocation && (
          <Marker
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onClick={() => setSelectedLocation(null)}
          />
        )}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => handleRevisitLocation(location)}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h3>Selected Location</h3>
              <p>Latitude: {selectedLocation.lat}</p>
              <p>Longitude: {selectedLocation.lng}</p>
              <button onClick={handleAddLocation}>Add to List</button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <div>
        <h2>Location List</h2>
        <ul>
          {locations.map((location) => (
            <li key={location.id}>
              Latitude: {location.lat}, Longitude: {location.lng}
              <button onClick={() => handleRevisitLocation(location)}>Revisit</button>
              <button onClick={() => handleRemoveLocation(location.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;
