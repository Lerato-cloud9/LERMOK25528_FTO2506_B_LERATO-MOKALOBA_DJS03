/**
 * Genre data mapping
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
 * Formats date in human-readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
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
 * Gets genre names from genre IDs
 * @param {number[]} genreIds - Array of genre IDs
 * @returns {string[]} Array of genre names
 */
export const getGenreNames = (genreIds) => {
  if (!genreIds || !Array.isArray(genreIds)) return [];
  return genreIds
    .map(id => GENRES.find(genre => genre.id === id)?.title)
    .filter(Boolean);
};