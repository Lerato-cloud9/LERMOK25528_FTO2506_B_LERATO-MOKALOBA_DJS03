/**
 * DateUtils Module
 * Provides utility functions for formatting dates
 */

/**
 * Formats an ISO date string into a human-readable format
 * @param {string} dateString - ISO date string (e.g., "2022-11-03T07:00:00.000Z")
 * @returns {string} Formatted date string (e.g., "November 3, 2022")
 * 
 * @example
 * formatDate("2022-11-03T07:00:00.000Z") // Returns "November 3, 2022"
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
}

/**
 * Gets a relative time string (e.g., "2 days ago")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time string
 * 
 * @example
 * getRelativeTime("2022-11-01T07:00:00.000Z") // Returns "3 years ago"
 */
export function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }
  
  return 'Just now';
}