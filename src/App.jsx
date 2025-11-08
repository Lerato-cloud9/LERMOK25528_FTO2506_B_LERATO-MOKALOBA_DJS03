import React, { useState, useEffect } from 'react';
import { Calendar, Loader, AlertCircle, Inbox } from 'lucide-react';

/**
 * Genre data mapping
 * Maps genre IDs to their titles for display purposes
 */
const GENRES = [
  { id: 1, title: "Personal Growth" },
  { id: 2, title: "Investigative Journalism" },
  { id: 3, title: "History" },
  { id: 4, title: "Comedy" },
  { id: 5, title: "Entertainment" },
  { id: 6, title: "Business" },
  { id: 7, title: "Fiction" },
  { id: 8, title: "News" },
  { id: 9, title: "Kids and Family" }
];
/**
 * Utility function to format dates in human-readable format
 * @param {string} dateString - ISO date string from API
 * @returns {string} Formatted date string (e.g., "Updated November 3, 2022")
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Updated today";
  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 7) return `Updated ${diffDays} days ago`;
  if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
  
  return `Updated ${date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`;
};

/**
 * Utility function to get genre names from genre IDs
 * @param {number[]} genreIds - Array of genre ID numbers
 * @returns {string[]} Array of genre title strings
 */
const getGenreNames = (genreIds) => {
  if (!genreIds || !Array.isArray(genreIds)) return [];
  return genreIds
    .map(id => GENRES.find(genre => genre.id === id)?.title)
    .filter(Boolean);
};

/**
 * Loading State Component
 * Displays a loading spinner while data is being fetched
 * @returns {JSX.Element} Loading indicator with spinner and text
 */
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
    <Loader className="w-12 h-12 text-blue-500 animate-spin" />
    <p className="text-gray-600 text-lg">Loading podcasts...</p>
  </div>
);

/**
 * Error State Component
 * Displays error message when data fetch fails
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @returns {JSX.Element} Error state with icon and message
 */
const ErrorState = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
    <AlertCircle className="w-12 h-12 text-red-500" />
    <p className="text-red-600 text-lg font-medium">Error loading podcasts</p>
    <p className="text-gray-600">{message}</p>
  </div>
);

/**
 * Empty State Component
 * Displays message when no podcasts are available
 * @returns {JSX.Element} Empty state with icon and message
 */
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
    <Inbox className="w-12 h-12 text-gray-400" />
    <p className="text-gray-600 text-lg">No podcasts found</p>
  </div>
);

/**
 * Header Component
 * Displays the app header with title
 * @returns {JSX.Element} Application header
 */
const Header = () => (
  <header className="bg-white shadow-sm border-b border-gray-200">
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        🎙️ Podcast Discovery
      </h1>
    </div>
  </header>
);

/**
 * Podcast Card Component
 * Displays a single podcast preview with image, title, seasons, genres, and last updated date
 * @param {Object} props - Component props
 * @param {Object} props.podcast - Podcast data object
 * @param {string} props.podcast.id - Unique podcast identifier
 * @param {string} props.podcast.title - Podcast title
 * @param {string} props.podcast.image - Podcast cover image URL
 * @param {number} props.podcast.seasons - Number of seasons
 * @param {number[]} props.podcast.genres - Array of genre IDs
 * @param {string} props.podcast.updated - Last updated date string
 * @returns {JSX.Element} Podcast preview card
 */

const PodcastCard = ({ podcast }) => {
  const { title, image, seasons, genres, updated } = podcast;
  const genreNames = getGenreNames(genres);
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={`${title} cover`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">
          {seasons} {seasons === 1 ? 'Season' : 'Seasons'}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {genreNames.slice(0, 3).map((genre, index) => (
            <span 
              key={index}
              className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
          {genreNames.length > 3 && (
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
              +{genreNames.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mt-auto">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{formatDate(updated)}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Podcast Grid Component
 * Displays a responsive grid of podcast cards
 * @param {Object} props - Component props
 * @param {Array} props.podcasts - Array of podcast objects to display
 * @returns {JSX.Element} Responsive grid layout with podcast cards
 */
const PodcastGrid = ({ podcasts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {podcasts.map(podcast => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

/**
 * Main App Component
 * Fetches podcast data from API and manages application state
 * Handles loading, error, and empty states
 * Renders the complete podcast discovery interface
 * @returns {JSX.Element} The main application component
 */
function App() {
  // State management for podcasts data
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    /**
   * Fetches podcast data from the API on component mount
   * Uses useEffect hook to ensure data is fetched only once
   * Handles loading states and errors appropriately
   */
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://podcast-api.netlify.app/');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch podcasts: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Validate that we received an array
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        
        setPodcasts(data);
      } catch (err) {
        console.error('Error fetching podcasts:', err);
        setError(err.message);
        setPodcasts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []); // Empty dependency array ensures this runs only once on mount

    return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Conditional rendering based on application state */}
        {loading && <LoadingState />}
        
        {error && !loading && <ErrorState message={error} />}
        
        {!loading && !error && podcasts.length === 0 && <EmptyState />}
        
        {!loading && !error && podcasts.length > 0 && (
          <PodcastGrid podcasts={podcasts} />
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>Podcast Discovery App • Data from Podcast API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;