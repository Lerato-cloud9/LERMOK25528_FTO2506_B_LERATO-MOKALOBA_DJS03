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
  
  getNames(genreIds) {
    return genreIds.map(
      (id) => genres.find((g) => g.id === id)?.title || "Unknown"
    );
  },
};
