// Add 'use client' at the top to mark it as a Client Component
'use client';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Map = () => {
  const [geoData, setGeoData] = useState([]);  // State to store an array of GeoJSON data

  useEffect(() => {
    // Fetch the list of GeoData objects from the backend API
    axios.get('http://localhost:8000/api/geodata/')
      .then(response => {
        // Fetch the vector data for each GeoData object
        const requests = response.data.map(geo => axios.get(geo.vector_data));
        return Promise.all(requests);  // Wait for all requests to resolve
      })
      .then(responses => {
        setGeoData(responses.map(res => res.data));  // Store all GeoJSON data
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData.map((data, index) => (
        <GeoJSON key={index} data={data} />  // Display each GeoJSON data layer
      ))}
    </MapContainer>
  );
};

export default Map;
