
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

// Define model types
type ModelCategory = "all" | "female" | "male" | "kids";

interface Model {
  id: number;
  name: string;
  category: ModelCategory;
  specialty: string[];
  image: string;
  height: string;
  location: string;
}

export function ModelingSection() {
  const [activeCategory, setActiveCategory] = useState<ModelCategory>("all");
  const [visibleModels, setVisibleModels] = useState<Model[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sample models data
  const models: Model[] = [
    {
      id: 1,
      name: "Sophia Reynolds",
      category: "female",
      specialty: ["Fashion", "Commercial", "Runway"],
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      height: "5'10\"",
      location: "New York"
    },
    {
      id: 2,
      name: "James Wilson",
      category: "male",
      specialty: ["Editorial", "Fitness", "Commercial"],
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      height: "6'1\"",
      location: "Los Angeles"
    },
    {
      id: 3,
      name: "Emma Zhang",
      category: "female",
      specialty: ["Beauty", "Fashion", "Lifestyle"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      height: "5'9\"",
      location: "Miami"
    },
    {
      id: 4,
      name: "Michael Brooks",
      category: "male",
      specialty: ["Commercial", "Acting", "Print"],
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      height: "6'0\"",
      location: "Chicago"
    },
    {
      id: 5,
      name: "Lily Chen",
      category: "female",
      specialty: ["Runway", "Editorial", "Swimwear"],
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      height: "5'11\"",
      location: "Paris"
    },
    {
      id: 6,
      name: "Sarah Johnson",
      category: "female",
      specialty: ["Commercial", "Lifestyle", "Catalog"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      height: "5'8\"",
      location: "Toronto"
    },
    {
      id: 7,
      name: "Ethan Park",
      category: "male",
      specialty: ["Fashion", "Print", "Runway"],
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      height: "6'2\"",
      location: "Seoul"
    },
    {
      id: 8,
      name: "Oliver Smith",
      category: "male",
      specialty: ["Commercial", "Fitness", "Print"],
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      height: "5'11\"",
      location: "London"
    },
    {
      id: 9,
      name: "Mia Thompson",
      category: "kids",
      specialty: ["Commercial", "Print", "Acting"],
      image: "https://images.unsplash.com/photo-1595744043037-68de3376ed59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      height: "4'5\"",
      location: "Los Angeles"
    },
    {
      id: 10,
      name: "Lucas Garcia",
      category: "kids",
      specialty: ["Catalog", "Commercial", "Print"],
      image: "https://images.unsplash.com/photo-1574364849394-7cafe09482e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      height: "4'8\"",
      location: "Barcelona"
    }
  ];

  // Filter models based on active category
  useEffect(() => {
    if (activeCategory === "all") {
      setVisibleModels(models);
    } else {
      setVisibleModels(models.filter(model => model.category === activeCategory));
    }
    setCurrentIndex(0);
  }, [activeCategory]);

  // Handle 3D flipbook effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const rotateY = ((mouseX / rect.width) - 0.5) * 20; // -10 to 10 degrees
    const rotateX = ((mouseY / rect.height) - 0.5) * -20; // 10 to -10 degrees
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  // Reset card transform on mouse leave
  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };

  // Carousel navigation
  const navigateCarousel = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex(Math.max(0, currentIndex - 3));
    } else {
      setCurrentIndex(Math.min(visibleModels.length - 3, currentIndex + 3));
    }
  };

  return (
    <section id="models" className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-black to-brand-dark/80 -z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-accent/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Modeling Portfolio</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover our diverse roster of professional models available for fashion shoots,
            commercial campaigns, runway shows, and promotional events.
          </p>
        </div>
        
        {/* Category filter */}
        <div className="flex justify-center mb-10">
          <div className="glass-card p-2 inline-flex items-center space-x-1 rounded-full">
            <Filter className="w-5 h-5 text-gray-400 ml-3 mr-1" />
            
            {(["all", "female", "male", "kids"] as ModelCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-brand text-white"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Models showcase with 3D effect */}
        <div className="relative">
          {/* Carousel navigation buttons */}
          {visibleModels.length > 3 && (
            <>
              <button
                onClick={() => navigateCarousel('prev')}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 ${
                  currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Previous models"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={() => navigateCarousel('next')}
                disabled={currentIndex >= visibleModels.length - 3}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 ${
                  currentIndex >= visibleModels.length - 3 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Next models"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          
          {/* Carousel container */}
          <div 
            ref={containerRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {visibleModels.map((model, index) => (
                <div 
                  key={model.id}
                  className="w-full sm:w-1/2 lg:w-1/3 p-4 flex-shrink-0"
                >
                  <div 
                    ref={el => cardRefs.current[index] = el}
                    className="glass-card overflow-hidden h-full transition-transform duration-200 transform-gpu"
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    {/* Model image */}
                    <div className="relative h-80 overflow-hidden">
                      <img 
                        src={model.image} 
                        alt={model.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                      />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 right-4 bg-brand text-white text-xs uppercase tracking-wider py-1 px-2 rounded">
                        {model.category}
                      </div>
                    </div>
                    
                    {/* Model info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                      <p className="text-brand-accent">{model.location} · {model.height}</p>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-400 mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {model.specialty.map((spec, i) => (
                            <span key={i} className="bg-white/5 text-white text-xs py-1 px-2 rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button className="mt-6 text-brand hover:text-brand-accent transition-colors">
                        View Portfolio
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className="mt-20 text-center">
          <div className="glass-card max-w-3xl mx-auto p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Looking for the Perfect Model?
            </h3>
            <p className="text-gray-300 mb-8">
              Our diverse roster of professional models can help bring your vision to life.
              Contact us to discuss your specific needs and find the perfect match for your project.
            </p>
            <button className="cta-button text-lg px-8 py-4">
              Book a Model
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
