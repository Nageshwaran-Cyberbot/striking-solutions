
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageScroll = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check for a scrollToId in the location state
    if (location.state && location.state.scrollToId) {
      const element = document.getElementById(location.state.scrollToId);
      if (element) {
        // Small delay to ensure the component is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      
      // Clean up the location state to prevent scrolling on subsequent renders
      window.history.replaceState({}, document.title);
    } else {
      // Scroll to top when navigating to a new page without a specific section
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);
};

export default usePageScroll;
