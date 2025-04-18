
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const usePageScroll = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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
  
  return { isScrolled };
};

export default usePageScroll;
