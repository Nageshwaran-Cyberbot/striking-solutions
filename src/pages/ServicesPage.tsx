
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Megaphone, 
  Calendar, 
  ShoppingBag, 
  Users, 
  Lightbulb,
  ChevronRight,
  Video,
  Monitor,
  Smartphone,
  Globe,
  Share2,
  BarChart3
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServicesPage = () => {
  const [currentTab, setCurrentTab] = useState("digital");
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Reference to services section for animation
  const servicesSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optional: Initialize animation or video playback
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
    }
    
    // Optional: Add scroll animation observers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.service-card').forEach(card => {
      observer.observe(card);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Digital Marketing features
  const digitalFeatures: ServiceFeature[] = [
    {
      icon: <Monitor className="w-10 h-10 text-brand" />,
      title: "Web Campaigns",
      description: "Strategic digital campaigns that deliver measurable results across websites and landing pages."
    },
    {
      icon: <Globe className="w-10 h-10 text-brand-accent" />,
      title: "SEO Optimization",
      description: "Boost your search rankings and drive organic traffic with our expert SEO strategies."
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-blue-500" />,
      title: "Analytics & Reporting",
      description: "Comprehensive tracking and reporting of your marketing metrics for data-driven decisions."
    },
    {
      icon: <Smartphone className="w-10 h-10 text-purple-500" />,
      title: "Mobile Marketing",
      description: "Reach customers on-the-go with mobile-optimized campaigns and strategies."
    },
    {
      icon: <Share2 className="w-10 h-10 text-green-500" />,
      title: "Social Media",
      description: "Build your brand presence across all major social platforms with targeted content."
    },
    {
      icon: <Video className="w-10 h-10 text-red-500" />,
      title: "Video Marketing",
      description: "Create engaging video content that captures attention and drives conversions."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/20 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">Our Services</h1>
            <p className="text-xl text-gray-300 mb-10">
              We deliver comprehensive marketing solutions to elevate your brand and drive measurable results.
            </p>
            
            {/* Video Showcase Placeholder */}
            <div className="relative rounded-xl overflow-hidden shadow-neon mb-10 max-w-3xl mx-auto">
              <video 
                ref={videoRef}
                className="w-full aspect-video object-cover"
                poster="/placeholder.svg"
                muted
                loop
                playsInline
              >
                {/* Video source placeholder - replace with your actual video */}
                <source src="YOUR_SERVICE_SHOWCASE_VIDEO.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/10 backdrop-blur-sm rounded-full p-4 text-white hover:bg-brand transition-all duration-300">
                  <Video className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Tabs Section */}
      <section ref={servicesSectionRef} className="py-20 bg-gradient-to-b from-transparent to-black/40">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs 
            defaultValue="digital" 
            className="w-full"
            value={currentTab}
            onValueChange={setCurrentTab}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl mb-10">
              <TabsTrigger value="digital" className="data-[state=active]:text-brand data-[state=active]:bg-white/5">
                <Megaphone className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Digital Marketing</span>
                <span className="md:hidden">Digital</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:text-brand-accent data-[state=active]:bg-white/5">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Event Management</span>
                <span className="md:hidden">Events</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:text-blue-500 data-[state=active]:bg-white/5">
                <ShoppingBag className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Product Advertisement</span>
                <span className="md:hidden">Products</span>
              </TabsTrigger>
              <TabsTrigger value="models" className="data-[state=active]:text-purple-500 data-[state=active]:bg-white/5">
                <Users className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Modeling & Talent</span>
                <span className="md:hidden">Modeling</span>
              </TabsTrigger>
              <TabsTrigger value="creative" className="data-[state=active]:text-amber-500 data-[state=active]:bg-white/5">
                <Lightbulb className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Creative Strategy</span>
                <span className="md:hidden">Creative</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Digital Marketing Content */}
            <TabsContent value="digital" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gradient">Digital Marketing Campaigns</h2>
                  <p className="text-gray-300 mb-6">
                    Our digital marketing experts craft strategic campaigns that connect with your audience
                    and drive measurable results across all digital channels.
                  </p>
                  <ul className="space-y-3">
                    {["Social Media Marketing", "Search Engine Optimization", "Email Campaigns", "Content Marketing", "PPC & Paid Advertising"].map(item => (
                      <li key={item} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-brand shrink-0 mt-0.5 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-black/30">
                    {/* 3D model or video placeholder */}
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="/placeholder.svg" 
                        alt="Digital Marketing Visualization" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Our Approach</h3>
                  <p className="text-gray-300">
                    We combine data-driven insights with creative excellence to develop campaigns
                    that not only reach your target audience but also inspire them to take action.
                  </p>
                </div>
              </div>
              
              {/* Digital Marketing Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {digitalFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="service-card glass-card p-6 rounded-xl border border-white/5 hover-scale opacity-0"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Event Management Content */}
            <TabsContent value="events">
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-4 text-gradient">Event Management</h2>
                <p className="text-gray-300 mb-6">
                  From corporate functions to product launches, we deliver unforgettable event experiences
                  that align with your brand and business objectives.
                </p>
                
                {/* Event management content would go here */}
                <div className="aspect-video bg-gray-800 rounded-lg mb-6">
                  {/* Placeholder for event showcase video or 3D model */}
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">Event showcase video would appear here</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Product Advertisement Content */}
            <TabsContent value="products">
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-4 text-gradient">Product Advertisement</h2>
                <p className="text-gray-300 mb-6">
                  We create compelling product promotions that boost visibility and drive conversions
                  across all marketing channels.
                </p>
                
                {/* Product advertisement content would go here */}
                <div className="aspect-video bg-gray-800 rounded-lg mb-6">
                  {/* Placeholder for product advertisement showcase */}
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">Product advertising showcase would appear here</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Modeling & Talent Content */}
            <TabsContent value="models">
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-4 text-gradient">Modeling & Talent</h2>
                <p className="text-gray-300 mb-6">
                  Our professional modeling services and talent management solutions elevate your brand
                  with the perfect representation for your campaigns.
                </p>
                
                {/* Modeling & talent content would go here */}
                <div className="aspect-video bg-gray-800 rounded-lg mb-6">
                  {/* Placeholder for modeling showcase */}
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">Modeling portfolio showcase would appear here</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Creative Strategy Content */}
            <TabsContent value="creative">
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-4 text-gradient">Creative Strategy</h2>
                <p className="text-gray-300 mb-6">
                  Our creative team develops innovative branding solutions that help your business
                  stand out and connect with audiences on a deeper level.
                </p>
                
                {/* Creative strategy content would go here */}
                <div className="aspect-video bg-gray-800 rounded-lg mb-6">
                  {/* Placeholder for creative strategy showcase */}
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">Creative strategy showcase would appear here</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
