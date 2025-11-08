import React from 'react';

/**
 * Error State Component
 * Displays error message when data fetch fails
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @returns {JSX.Element} Error state
 */
const ErrorState = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
    <div className="text-red-500 text-6xl">⚠️</div>
    <p className="text-red-600 text-lg font-medium">Error loading podcasts</p>
    <p className="text-gray-600">{message}</p>
  </div>
);

export default ErrorState;