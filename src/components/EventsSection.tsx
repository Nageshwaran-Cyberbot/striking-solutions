import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { EventsBackground } from './events/EventsBackground';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Event type interface
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  image: string;
}

// Sample events data
const events: Event[] = [
  {
    id: 1,
    title: "Digital Marketing Summit 2025",
    date: "May 15-17, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Tech Convention Center, New York",
    type: "Conference",
    description: "Join industry leaders and innovators for three days of insights, networking, and cutting-edge digital marketing strategies.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Brand Evolution Workshop",
    date: "June 8, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Creative Hub, Los Angeles",
    type: "Workshop",
    description: "An intensive one-day workshop focused on brand development, repositioning, and creating compelling brand narratives.",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "E-Commerce Growth Symposium",
    date: "July 22, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Business Tower, Chicago",
    type: "Symposium",
    description: "Discover strategies to boost your e-commerce performance, optimize conversion rates, and enhance customer experience.",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "Social Media Innovation Forum",
    date: "August 14-15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Digital Arena, San Francisco",
    type: "Forum",
    description: "Explore the latest trends and innovations in social media marketing with hands-on sessions and expert panels.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    title: "Content Creation Masterclass",
    date: "September 5, 2025",
    time: "1:00 PM - 5:00 PM",
    location: "Media Center, Miami",
    type: "Masterclass",
    description: "Learn advanced techniques for creating compelling content that engages audiences and drives brand awareness.",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    title: "Product Launch Excellence",
    date: "October 19, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Grand Hotel, Seattle",
    type: "Gala Event",
    description: "A premium networking event showcasing successful product launches and strategies for market penetration.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
];

export function EventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Function to handle carousel navigation
  const navigateCarousel = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % events.length
      : (currentIndex - 1 + events.length) % events.length;
    
    setCurrentIndex(newIndex);
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Enhanced 3D card effect
  const handleCardMovement = (e: React.MouseEvent<HTMLDivElement>, cardRef: HTMLDivElement) => {
    if (!cardRef) return;
    
    const rect = cardRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -10;
    const rotateY = (mouseX / (rect.width / 2)) * 10;
    
    cardRef.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetCardPosition = (cardRef: HTMLDivElement) => {
    if (!cardRef) return;
    cardRef.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section id="events" className="section-padding relative overflow-hidden">
      {/* Add 3D animated background */}
      <EventsBackground />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-black to-brand-darkgray -z-10"></div>
      
      {/* Floating particles container */}
      <div id="events-particles" className="absolute inset-0 overflow-hidden -z-10"></div>
      
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Events</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover our upcoming and past events where we bring together industry leaders,
            innovators, and professionals to share insights and create meaningful connections.
          </p>
        </div>
        
        {/* Events carousel with enhanced 3D effects */}
        <div className="relative glass-card overflow-hidden rounded-2xl">
          {/* Carousel navigation buttons */}
          <button 
            onClick={() => navigateCarousel('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300"
            aria-label="Previous event"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button 
            onClick={() => navigateCarousel('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300"
            aria-label="Next event"
          >
            <ArrowRight size={20} />
          </button>
          
          <div 
            ref={slidesContainerRef}
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className="flex">
              {events.map((event, index) => (
                <motion.div 
                  key={event.id} 
                  className="w-full flex-shrink-0 flex flex-col md:flex-row"
                  ref={(el) => {
                    if (el) productRefs.current[index] = el;
                  }}
                  onMouseMove={(e) => handleCardMovement(e, productRefs.current[index]!)}
                  onMouseLeave={() => resetCardPosition(productRefs.current[index]!)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Event image */}
                  <div className="md:w-1/2 h-60 md:h-auto relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                    
                    {/* Event type badge */}
                    <div className="absolute top-4 left-4 bg-brand-accent text-white text-sm font-bold py-1 px-3 rounded-full">
                      {event.type}
                    </div>
                  </div>
                  
                  {/* Event details */}
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{event.title}</h3>
                    
                    <div className="flex flex-col space-y-3 mb-4">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-5 h-5 mr-2 text-brand-accent" />
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-5 h-5 mr-2 text-brand-accent" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-5 h-5 mr-2 text-brand-accent" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{event.description}</p>
                    
                    <button className="cta-button self-start">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-brand-accent w-6' : 'bg-white/50'
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Timeline view with 3D effects */}
        <div className="mt-20">
          {/* Timeline header */}
          <h3 className="text-2xl font-bold text-center mb-10 text-white">Event Timeline</h3>
          
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand/30 transform -translate-x-1/2"></div>
            
            <div className="space-y-16">
              {events.map((event, index) => (
                <motion.div 
                  key={event.id}
                  className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand rounded-full z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                    <div className="glass-card p-6 hover-scale">
                      <div className="text-brand-accent font-bold mb-2">{event.date}</div>
                      <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
                      <p className="text-gray-300">{event.location}</p>
                    </div>
                  </div>
                  
                  {/* Spacer for the other side */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
