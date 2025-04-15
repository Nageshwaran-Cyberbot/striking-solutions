
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Share2, ExternalLink, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  videoUrl?: string;
  clientName: string;
  clientLogo: string;
}

export function ProductsSection() {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample product showcase data
  const products: Product[] = [
    {
      id: 1,
      name: "UltraBoost Running Shoes",
      category: "Athletic Footwear",
      description: "Premium performance running shoes with responsive cushioning and breathable design for maximum comfort.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      clientName: "SportElite Brand",
      clientLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "LuminaX Smart Watch",
      category: "Wearable Technology",
      description: "Advanced smartwatch featuring health monitoring, activity tracking, and seamless smartphone integration.",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      clientName: "TechVision",
      clientLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Organic Skincare Collection",
      category: "Beauty & Personal Care",
      description: "All-natural skincare line featuring sustainably sourced ingredients and eco-friendly packaging.",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      clientName: "Pure Essentials",
      clientLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      name: "AirFlow Pro Headphones",
      category: "Audio Equipment",
      description: "Premium wireless headphones with active noise cancellation and immersive sound quality.",
      image: "https://images.unsplash.com/photo-1546435770-a3e429dcf253?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      clientName: "SoundWave Audio",
      clientLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 5,
      name: "Artisan Coffee Brewer",
      category: "Home & Kitchen",
      description: "Handcrafted coffee brewing system that combines elegant design with precision brewing technology.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      clientName: "BrewMaster",
      clientLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 6,
      name: "Eco-Friendly Backpack",
      category: "Fashion Accessories",
      description: "Sustainable backpack made from recycled materials, featuring ergonomic design and smart organization.",
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      clientName: "GreenTrail",
      clientLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  // Handle 3D rotation effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      productRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const scrollPosition = window.scrollY;
          const scrollSpeed = 0.03;
          const newRotation = scrollPosition * scrollSpeed;
          
          if (ref && ref.style) {
            ref.style.transform = `rotateY(${newRotation}deg)`;
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle product rotation manually
  const toggleRotation = (index: number) => {
    setIsRotating(!isRotating);
    
    if (!isRotating) {
      let degree = 0;
      const rotationInterval = setInterval(() => {
        degree += 5;
        setRotationDegree(degree);
        
        const productEl = productRefs.current[index];
        if (productEl) {
          productEl.style.transform = `rotateY(${degree}deg)`;
        }
        
        if (degree >= 360) {
          clearInterval(rotationInterval);
          setIsRotating(false);
          setRotationDegree(0);
        }
      }, 30);
    }
  };

  // Handle detailed view
  const openProductDetail = (index: number) => {
    setActiveProduct(index);
  };
  
  const closeProductDetail = () => {
    setActiveProduct(null);
  };

  return (
    <section id="products" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-brand-dark/70 to-black -z-10"></div>
      
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Product Showcases</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of successful product advertisements and campaigns.
            We bring products to life with creative concepts and compelling visuals.
          </p>
        </div>
        
        {/* Product grid with 3D rotation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="glass-card overflow-hidden transform-gpu transition-transform duration-300 hover:shadow-neon"
            >
              {/* Product image with rotation effect */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-b from-black/20 to-black/60">
                <div
                  ref={el => productRefs.current[index] = el}
                  className="w-full h-full transform-gpu transition-transform duration-300 preserve-3d"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    onClick={() => toggleRotation(index)}
                    className="bg-black/50 hover:bg-brand/80 p-2 rounded-full text-white transition-colors"
                    aria-label="Rotate product"
                  >
                    <Share2 size={16} />
                  </button>
                  
                  <button 
                    onClick={() => openProductDetail(index)}
                    className="bg-black/50 hover:bg-brand-accent/80 p-2 rounded-full text-white transition-colors"
                    aria-label="View product details"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
                
                {/* Client logo */}
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm p-1 rounded">
                  <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{product.clientName.substring(0, 2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Product info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    <p className="text-brand-accent text-sm">{product.category}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Client: {product.clientName}</span>
                  <button 
                    onClick={() => openProductDetail(index)}
                    className="text-brand hover:text-brand-accent text-sm font-medium flex items-center"
                  >
                    View Case Study <ExternalLink size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Detailed product modal */}
        {activeProduct !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="neo-blur max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl">
              <div className="relative">
                <img 
                  src={products[activeProduct].image} 
                  alt={products[activeProduct].name} 
                  className="w-full h-64 md:h-80 object-cover object-center"
                />
                
                <button 
                  onClick={closeProductDetail}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-brand/80 p-2 rounded-full text-white transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                  {products[activeProduct].name}
                </h2>
                <p className="text-brand-accent text-sm mb-6">{products[activeProduct].category}</p>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-white">About the Product</h3>
                  <p className="text-gray-300 mb-4">
                    {products[activeProduct].description}
                  </p>
                  <p className="text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus 
                    urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis 
                    porta. Sed nec diam eu diam mattis viverra.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-white">Campaign Highlights</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Increased product visibility by 78% across digital channels</li>
                    <li>Achieved 45% higher conversion rate compared to previous campaigns</li>
                    <li>Established strong brand recognition in the target demographic</li>
                    <li>Created viral social media content with over 2M impressions</li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-white">
                        {products[activeProduct].clientName.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{products[activeProduct].clientName}</p>
                      <p className="text-xs text-gray-400">Client</p>
                    </div>
                  </div>
                  
                  <button className="cta-button-secondary">
                    View Full Case Study
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Call to action */}
        <div className="mt-20 text-center">
          <Link to="/contact" className="cta-button inline-block px-10 py-4 text-lg">
            Promote Your Product
          </Link>
        </div>
      </div>
    </section>
  );
}
