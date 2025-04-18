
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePageScroll } from "@/hooks/usePageScroll";
import { useMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, User, Settings, LogOut, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled } = usePageScroll();
  const isMobile = useMobile();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Models", path: "/models" },
    { name: "Products", path: "/products" },
    { name: "Events", path: "/events" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled || isOpen
          ? "bg-background/80 backdrop-blur-lg shadow-md py-3"
          : "py-5"
      } transition-all duration-300`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold text-white">
          YourBrand
          <span className="text-brand">Digital</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium hover:text-brand-accent transition-colors ${
                location.pathname === link.path
                  ? "text-brand underline decoration-2 underline-offset-8"
                  : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative hover:scale-110 transition-transform outline-none">
                  <div className="w-9 h-9 rounded-full bg-brand/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-brand" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name || "Account"}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/user/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/signin"
              className="text-sm font-medium text-white border border-white/20 rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-white md:hidden focus:outline-none"
          >
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background/90 backdrop-blur-lg shadow-xl"
          >
            <div className="container mx-auto py-6 px-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-medium hover:text-brand-accent transition-colors ${
                      location.pathname === link.path
                        ? "text-brand"
                        : "text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-gray-700 my-2"></div>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/user/settings"
                      className="text-lg font-medium text-white flex items-center"
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="text-lg font-medium text-white flex items-center"
                      >
                        <Settings className="mr-2 h-5 w-5" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="text-lg font-medium text-white flex items-center"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="text-lg font-medium text-white flex items-center"
                    >
                      <User className="mr-2 h-5 w-5" />
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="text-lg font-medium text-white flex items-center"
                    >
                      <UserPlus className="mr-2 h-5 w-5" />
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
