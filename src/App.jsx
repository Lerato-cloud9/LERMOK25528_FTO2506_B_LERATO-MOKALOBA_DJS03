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
}