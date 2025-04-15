
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden bg-gradient-to-b from-brand-dark to-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Company info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-bold tracking-tight text-gradient">
                DigitalStrike
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Elevate your brand with our innovative digital marketing solutions.
              We transform ideas into impactful campaigns.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Events", path: "/events" },
                { name: "Models", path: "/models" },
                { name: "Products", path: "/products" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-brand transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                "Digital Marketing Campaigns",
                "Event Management",
                "Product Advertisement",
                "Modeling & Talent",
                "Creative Strategy",
                "Brand Development",
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href={`/services#${service.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-400 hover:text-brand transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="space-y-3">
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-brand hover:bg-brand/90 text-white font-medium rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DigitalStrike. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookies Policy</a>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-10 right-10 p-3 bg-brand rounded-full shadow-neon hover:shadow-neon hover:scale-110 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      </div>
    </footer>
  );
}
