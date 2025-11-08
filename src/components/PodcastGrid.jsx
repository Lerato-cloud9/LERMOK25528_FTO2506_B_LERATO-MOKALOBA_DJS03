import React from 'react';
import { formatDate, getGenreNames } from '../utils/helpers';

/**
 * Podcast Modal Component
 * Shows detailed podcast information
 * @param {Object} props - Component props
 * @param {Object} props.podcast - Podcast details
 * @param {Function} props.onClose - Close handler
 * @returns {JSX.Element} Modal
 */
const PodcastModal = ({ podcast, onClose }) => {
  if (!podcast) return null;
  
  const genreNames = getGenreNames(podcast.genres);
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{podcast.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 text-3xl leading-none"
            >
              &times;
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <img 
              src={podcast.image} 
              alt={podcast.title}
              className="w-full md:w-64 rounded-lg"
            />
            
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="text-gray-700 mb-4">{podcast.description}</p>
              
              <h3 className="font-bold text-lg mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {genreNames.map((genre, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-gray-500">{formatDate(podcast.updated)}</p>
            </div>
          </div>
          
          {podcast.seasons && podcast.seasons.length > 0 && (
            <>
              <h3 className="font-bold text-lg mb-3">Seasons</h3>
              <ul className="space-y-2">
                {podcast.seasons.map((season, index) => (
                  <li 
                    key={index}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <span className="font-medium">{season.title}</span>
                    <span className="text-sm text-gray-600">{season.episodes} episodes</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastModal;