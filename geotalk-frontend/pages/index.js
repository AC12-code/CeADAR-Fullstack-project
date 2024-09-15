// Add 'use client' at the top to mark it as a Client Component
// 'use client';

// import GeoDataDisplay from '../components/Map'; // Import the GeoDataDisplay component

// const Home = () => {
//   return (
//     <div>
//       <h1>Welcome to Geo Data Visualization</h1>
//       {/* Render the GeoDataDisplay component */}
//       <GeoDataDisplay />
//     </div>
//   );
// };

// export default Home;
// Add 'use client' at the top to mark it as a Client Component
'use client';

import dynamic from 'next/dynamic';

// Dynamically import GeoDataDisplay with SSR disabled
const GeoDataDisplay = dynamic(() => import('../components/Map'), {
  ssr: false,  // Disable SSR for this component
});

const Home = () => {
  return (
    <div>
      <h1>Welcome to Geo Data Visualization</h1>
      {/* Render the GeoDataDisplay component */}
      <GeoDataDisplay />
    </div>
  );
};

export default Home;
