
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useScrollToSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback((sectionId: string, pageUrl: string = '/') => {
    // If we're already on the target page, scroll to the section
    if (location.pathname === pageUrl) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to the page first, then scroll after navigation is complete
      navigate(pageUrl, { state: { scrollToId: sectionId } });
    }
  }, [location.pathname, navigate]);

  return scrollToSection;
};

export default useScrollToSection;
