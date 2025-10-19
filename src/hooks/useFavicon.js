import { useEffect } from 'react';

/**
 * Hook to dynamically update the page favicon
 * @param {string} letter - The letter (A-Z) to show as favicon, or null for default
 */
export const useFavicon = (letter) => {
  useEffect(() => {
    const updateFavicon = (letterToShow) => {
      // Remove existing favicon links
      const existingLinks = document.querySelectorAll('link[rel*="icon"]');
      existingLinks.forEach(link => link.remove());

      // Create new favicon link
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      
      if (letterToShow && /^[A-Za-z]$/.test(letterToShow)) {
        // Use the flag for the specified letter
        link.href = `/flags/${letterToShow.toLowerCase()}.svg`;
      } else {
        // Use default Alpha flag
        link.href = '/flags/a.svg';
      }
      
      document.head.appendChild(link);
    };

    updateFavicon(letter);
  }, [letter]);
};
