
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventsBackground } from "@/components/events/EventsBackground";
import { useState, useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Video, Image as ImageIcon, Box, ArrowLeft, ArrowRight } from "lucide-react";

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState("3d");
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  
  // Gallery items
  const galleryItems = {
    '3d': [
      { id: '1', title: '3D Product Showcase', thumbnail: '/placeholder.svg', type: '3d' },
      { id: '2', title: '3D Brand Animation', thumbnail: '/placeholder.svg', type: '3d' },
      { id: '3', title: '3D Event Setup', thumbnail: '/placeholder.svg', type: '3d' },
      { id: '4', title: '3D Marketing Visual', thumbnail: '/placeholder.svg', type: '3d' },
    ],
    'videos': [
      { id: '5', title: 'Brand Campaign Video', thumbnail: '/placeholder.svg', type: 'video' },
      { id: '6', title: 'Event Highlights', thumbnail: '/placeholder.svg', type: 'video' },
      { id: '7', title: 'Product Launch', thumbnail: '/placeholder.svg', type: 'video' },
      { id: '8', title: 'Customer Testimonial', thumbnail: '/placeholder.svg', type: 'video' },
    ],
    'images': [
      { id: '9', title: 'Campaign Photography', thumbnail: '/placeholder.svg', type: 'image' },
      { id: '10', title: 'Product Photoshoot', thumbnail: '/placeholder.svg', type: 'image' },
      { id: '11', title: 'Event Photography', thumbnail: '/placeholder.svg', type: 'image' },
      { id: '12', title: 'Team Portraits', thumbnail: '/placeholder.svg', type: 'image' },
    ]
  };
  
  // Current items based on active tab
  const currentItems = galleryItems[activeTab as keyof typeof galleryItems];
  
  // Handle slider navigation
  const goToSlide = (index: number) => {
    if (slidesRef.current) {
      setCurrentSlide(index);
      slidesRef.current.scrollTo({
        left: index * slidesRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };
  
  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % currentItems.length;
    goToSlide(newIndex);
  };
  
  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + currentItems.length) % currentItems.length;
    goToSlide(newIndex);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-white">
      <Navbar />
      <EventsBackground />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">3D & Media Gallery</h1>
            <p className="text-xl text-gray-300 mb-10">
              Explore our collection of 3D models, videos, and images showcasing our creative work.
            </p>
            
            {/* Gallery Type Tabs */}
            <Tabs 
              defaultValue="3d" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full max-w-md mx-auto"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="3d" className="flex items-center gap-2">
                  <Box className="w-4 h-4" />
                  <span>3D Models</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  <span>Videos</span>
                </TabsTrigger>
                <TabsTrigger value="images" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Images</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Gallery Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4 md:px-6">
          {/* Featured Item Slider */}
          <div className="relative mb-16">
            <div 
              ref={slidesRef}
              className="overflow-hidden"
            >
              <div className="flex transition-transform duration-500" style={{ width: `${currentItems.length * 100}%` }}>
                {currentItems.map((item, index) => (
                  <div key={item.id} className="relative w-full" style={{ width: `${100 / currentItems.length}%` }}>
                    <div className="glass-card m-4 rounded-xl overflow-hidden aspect-video relative">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Play button for videos */}
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-white/10 backdrop-blur-sm rounded-full p-4 text-white hover:bg-brand transition-all duration-300">
                            <Video className="w-8 h-8" />
                          </button>
                        </div>
                      )}
                      
                      {/* 3D Viewer button for 3D models */}
                      {item.type === '3d' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-white/10 backdrop-blur-sm rounded-full p-4 text-white hover:bg-brand transition-all duration-300">
                            <Box className="w-8 h-8" />
                          </button>
                        </div>
                      )}
                      
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-300">Click to view full {item.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
              aria-label="Next slide"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-4">
              {currentItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`mx-1 w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-brand' : 'bg-white/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <div 
                key={item.id}
                className="glass-card rounded-xl overflow-hidden hover-scale transition-transform duration-300"
              >
                <div className="aspect-square relative">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Type indicator */}
                  <div className="absolute top-3 right-3">
                    {item.type === 'video' && (
                      <div className="bg-red-500 rounded-full p-2">
                        <Video className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {item.type === '3d' && (
                      <div className="bg-blue-500 rounded-full p-2">
                        <Box className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {item.type === 'image' && (
                      <div className="bg-green-500 rounded-full p-2">
                        <ImageIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* Upload your own content CTA */}
          <div className="mt-16 text-center">
            <div className="glass-card max-w-2xl mx-auto p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Have your own content?</h2>
              <p className="text-gray-300 mb-6">
                We can help you create professional 3D models, videos, and images for your brand.
                Or upload your existing content and let us enhance it.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-brand hover:bg-brand/90 rounded-full text-white font-medium transition-colors"
              >
                Contact Us About Content Creation
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default GalleryPage;
