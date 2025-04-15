
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUp, Instagram, Video, Image } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Events", path: "/events" },
    { name: "Models", path: "/models" },
    { name: "Products", path: "/products" },
    { name: "Instagram", path: "/instagram" },
    { name: "3D Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      setShowScrollToTop(position > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Check if we're on a specific page rather than the home page section
  const isStandalonePage = location.pathname !== "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollPosition > 50 || isStandalonePage
            ? "neo-blur py-3 backdrop-blur-xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 z-50 relative"
            >
              <span className="text-2xl font-bold tracking-tight text-gradient">
                DigitalStrike
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded opacity-100 transition-opacity duration-300"
                    />
                  )}
                </Link>
              ))}
              <Link to="/contact" className="ml-2">
                <button className="cta-button">Get a Quote</button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden z-50 relative"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 neo-blur flex flex-col items-center justify-center transform transition-all duration-300 ease-in-out"
        >
          <nav className="flex flex-col items-center space-y-4 p-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="mt-4">
              <button className="cta-button">Get a Quote</button>
            </Link>
          </nav>
        </div>
      )}

      {/* Scroll To Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-30 p-3 bg-brand rounded-full shadow-neon hover:shadow-neon hover:scale-110 transition-all duration-300 opacity-100 transform translate-y-0"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </>
  );
}
