/**
 * GenreService Module
 * Handles genre ID to name mapping and genre-related operations
 */

import { genres } from "../data.js";

/**
 * Service to retrieve genre titles from genre IDs.
 *
 * @principle SRP - Single Responsibility Principle: Only responsible for mapping genre IDs to names.
 */
export function getGenreNames(genreIds, genresData = null) {
  // If we have API genre data, use it
  if (genresData && genresData.length > 0) {
    return genreIds
      .map(id => {
        const genre = genresData.find(g => g.id === id);
        return genre ? genre.title : null;
      })
      .filter(Boolean); // Remove null values
  }

  // Otherwise use fallback genre map
  return genreIds
    .map(id => genreMap[id])
    .filter(Boolean); // Remove undefined values
}

/**
 * Gets a single genre name by ID
 * @param {number} genreId - Genre ID number
 * @param {Object[]} genresData - Optional: Full genre objects from API
 * @returns {string|null} Genre name or null if not found
 * 
 * @example
 * getGenreById(1) // Returns "Personal Growth"
 */
