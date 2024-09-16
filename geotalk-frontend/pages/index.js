
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';

// Dynamically import GeoDataDisplay with SSR disabled
const GeoDataDisplay = dynamic(() => import('../components/Map'), {
  ssr: false,  // Disable SSR for this component
});

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Head section for SEO, meta tags, and app name in the tab */}
      <Head>
        <title>Geo Earth App</title> {/* Update app name */}
        <meta name="description" content="Visualize geographical data interactively." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main content */}
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Geo Data Visualisation</h1>
        <h2 className={styles.subtitle}>Explore Geo Data on a Global Scale</h2>

        {/* Render the GeoDataDisplay component */}
        <div className={styles.mapContainer}>
          <GeoDataDisplay />
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Geo Earth App &copy; 2024 | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
