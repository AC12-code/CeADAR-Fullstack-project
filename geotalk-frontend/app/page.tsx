import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the Map component, disabling SSR (Server-Side Rendering)
const Map = dynamic(() => import('../components/Map'), {
  ssr: false,  // Disable SSR for this component
});

export default function Home() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h1>Geographical Data Map</h1>
      {/* Render the Map component */}
      <Map />
    </div>
  );
}
