import React from 'react';

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

export default Header;