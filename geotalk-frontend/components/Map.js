// Add 'use client' at the top to mark it as a Client Component
'use client';

// import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const Map = () => {
//   const [geoData, setGeoData] = useState([]);  // State to store an array of GeoJSON data

//   useEffect(() => {
//     // Fetch the list of GeoData objects from the backend API
//     axios.get('http://localhost:8000/api/geodata/')
//       .then(response => {
//         // Fetch the vector data for each GeoData object
//         const requests = response.data.map(geo => axios.get(geo.vector_data));
//         return Promise.all(requests);  // Wait for all requests to resolve
//       })
//       .then(responses => {
//         setGeoData(responses.map(res => res.data));  // Store all GeoJSON data
//       })
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {geoData.map((data, index) => (
//         <GeoJSON key={index} data={data} />  // Display each GeoJSON data layer
//       ))}
//     </MapContainer>
//   );
// };

// export default Map;
import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

const GeoDataDisplay = () => {
  const [geoDataList, setGeoDataList] = useState([]); // List to store all GeoData objects
  const [selectedGeoData, setSelectedGeoData] = useState(null); // Selected GeoData object

  // Fetch GeoData list from backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/geodata/')
      .then(response => {
        setGeoDataList(response.data); // Store the list of GeoData objects
      })
      .catch(error => console.error('Error fetching GeoData:', error));
  }, []);

  // Fetch GeoJSON data for a specific GeoData object
  const handleSelectGeoData = (geoData) => {
    setSelectedGeoData(null); // Reset selected data while fetching
    axios.get(geoData.vector_data)
      .then(res => {
        setSelectedGeoData({ ...geoData, vectorData: res.data }); // Store GeoData with vector data
      })
      .catch(error => console.error('Error fetching GeoJSON data:', error));
  };

  return (
    <div>
      <h1>Geo Data Visualization</h1>

      {/* Display GeoData List and allow selection */}
      <ul>
        {geoDataList.map(geoData => (
          <li key={geoData.id}>
            <button onClick={() => handleSelectGeoData(geoData)}>
              {geoData.name}
            </button>
          </li>
        ))}
      </ul>

      {/* If vector data and raster data are available, display them */}
      {selectedGeoData && (
        <div>
          <h2>{selectedGeoData.name}</h2>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON data={selectedGeoData.vectorData} />
          </MapContainer>

          {/* Display raster image */}
          {selectedGeoData.raster_data && (
            <div>
              <h3>Raster Image</h3>
              <img src={selectedGeoData.raster_data} alt="Raster Data" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeoDataDisplay;
