import React from 'react';
import { formatDate, getGenreNames } from '../utils/helpers';

/**
 * Podcast Card Component
 * Displays a single podcast preview
 * @param {Object} props - Component props
 * @param {Object} props.podcast - Podcast data
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} Podcast card
 */
const PodcastCard = ({ podcast, onClick }) => {
  const { title, image, seasons, genres, updated } = podcast;
  const genreNames = getGenreNames(genres);
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
    >
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
        
        <p className="text-xs text-gray-500">{formatDate(updated)}</p>
      </div>
    </div>
  );
};

export default PodcastCard;
