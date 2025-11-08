import React from 'react';

/**
 * Empty State Component
 * Displays message when no podcasts are available
 * @returns {JSX.Element} Empty state
 */
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
    <div className="text-gray-400 text-6xl">📭</div>
    <p className="text-gray-600 text-lg">No podcasts found</p>
  </div>
);

export default EmptyState;