
import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds } from 'leaflet';

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

const GeoDataDisplay = () => {
  const [geoJsonDataList, setGeoJsonDataList] = useState([]); // Store all GeoJSON data from the URL
  const [mapBounds, setMapBounds] = useState(null); // Store the map bounds
  const [rasterUrls, setRasterUrls] = useState([]); // Store raster image URLs
  const [geoNames, setGeoNames] = useState([]); // Store GeoJSON names

  // Fetch all GeoData objects from the backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/geodata/') // Fetch list of GeoData objects
      .then(response => {
        const geoDataList = response.data;

        // Fetch vector and raster data for each GeoData object
        const fetchPromises = geoDataList.map(geoData =>
          axios.get(geoData.vector_data).then(vectorResponse => ({
            name: geoData.name,
            vectorData: vectorResponse.data,
            rasterUrl: `http://localhost:8000/media/rasters/tiles/{z}/{x}/{y}.png`
          }))
        );

        return Promise.all(fetchPromises);
      })
      .then(geoJsonDataList => {
        setGeoJsonDataList(geoJsonDataList); // Store all GeoJSON data
        setRasterUrls(geoJsonDataList.map(geo => geo.rasterUrl)); // Store raster image URLs
        setGeoNames(geoJsonDataList.map(geo => geo.name)); // Store GeoJSON names

        // Calculate combined bounds for all GeoJSON features
        const allBounds = geoJsonDataList.flatMap(geo => calculateBounds(geo.vectorData));
        const bounds = new LatLngBounds(allBounds);
        setMapBounds(bounds); // Set the calculated combined bounds
      })
      .catch(error => console.error('Error fetching GeoJSON or raster data:', error));
  }, []);

  // Calculate the bounding box of the GeoJSON data
  const calculateBounds = (geoJson) => {
    const coordinates = geoJson.features.flatMap(feature => {
      return feature.geometry.coordinates[0].map(coord => [coord[1], coord[0]]); // Leaflet expects [lat, lon] instead of [lon, lat]
    });
    return coordinates;
  };

  // Custom style for GeoJSON layer
  const geoJsonStyle = {
    color: '#FF0000', // Red color for boundaries
    weight: 2,        // Line thickness
    fillOpacity: 0.1  // Light fill color (change opacity as needed)
  };

  // Function to render popups with the feature's properties
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const popupContent = `
        <strong>Station Name:</strong> ${feature.properties.STATION_NA}<br/>
        <strong>Division:</strong> ${feature.properties.Division}<br/>
        <strong>Address:</strong> ${feature.properties.ADDRESS}<br/>
        <strong>Phone Number:</strong> ${feature.properties.PHONE_NUMB}<br/>
        <strong>Area (Sq km):</strong> ${feature.properties.Area_Sq_km}<br/>
        <strong>Population:</strong> ${feature.properties.Pop_by_Dis}
      `;
      layer.bindPopup(popupContent); // Attach the popup to each feature
    }
  };

  return (
    <div>
      <h1>Geo Data Visualisation</h1>

      {/* If vector data is available, display it */}
      {geoJsonDataList.length > 0 && mapBounds && (
        <MapContainer bounds={mapBounds} center={[53.0, -8.0]} zoom={6} style={{ height: '500px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {/* Loop through each GeoJSON data and add to the map */}
          {geoJsonDataList.map((geo, index) => (
            <GeoJSON key={index} data={geo.vectorData} style={geoJsonStyle} onEachFeature={onEachFeature} />
          ))}

          {/* If a raster URL is available, add it as a tile layer */}
          {rasterUrls.map((rasterUrl, index) => (
            rasterUrl && (
              <TileLayer
                key={index}
                url={rasterUrl}  // Use the raster URL as the TileLayer URL
                attribution={`Raster Layer for ${geoNames[index]}`}  // Add attribution or name
              />
            )
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default GeoDataDisplay;




