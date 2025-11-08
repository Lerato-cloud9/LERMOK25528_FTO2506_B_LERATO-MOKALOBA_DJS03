import React, { useState, useEffect } from 'react';
import { Calendar, Loader, AlertCircle, Inbox } from 'lucide-react';

/**
 * Main App Component
 * Fetches podcast data from API and manages application state
 * @returns {JSX.Element} The main application component
 */

*
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