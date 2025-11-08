import React from 'react';

/**
 * Loading State Component
 * Displays a loading spinner while data is being fetched
 * @returns {JSX.Element} Loading indicator
 */
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-600 text-lg">Loading podcasts...</p>
  </div>
);

export default LoadingState;