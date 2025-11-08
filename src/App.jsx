import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import PodcastGrid from './components/PodcastGrid';
import PodcastModal from './components/PodcastModal';

/**
 * Main App Component
 * Fetches podcast data from API and manages application state
 * @returns {JSX.Element} The main application component
 */

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

/**
   * Fetches podcast data from the API on component mount
   * Handles loading states and errors appropriately
   */

useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://podcast-api.netlify.app/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        
        const data = await response.json();
        setPodcasts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPodcasts([]);
      } finally {
        setLoading(false);
      }
    };

        fetchPodcasts();
  }, []);

  /**
   * Handles podcast card click to show details
   * @param {string} podcastId - The ID of the selected podcast
   */
  const handlePodcastClick = async (podcastId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
      const data = await response.json();
      setSelectedPodcast(data);
    } catch (err) {
      console.error('Failed to fetch podcast details:', err);
    }
  };

    /**
   * Closes the modal and clears selected podcast
   */
  const handleCloseModal = () => {
    setSelectedPodcast(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {!loading && !error && podcasts.length === 0 && <EmptyState />}
        {!loading && !error && podcasts.length > 0 && (
          <PodcastGrid podcasts={podcasts} onPodcastClick={handlePodcastClick} />
        )}
      </main>
      {selectedPodcast && (
        <PodcastModal podcast={selectedPodcast} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;