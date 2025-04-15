
import { useState } from "react";
import { 
  Megaphone, 
  Calendar, 
  ShoppingBag, 
  Users, 
  Lightbulb, 
  ChevronRight,
  Medal,
  BarChart,
  TrendingUp,
  Zap,
  Share2,
  Target
} from "lucide-react";

// Interface for service items
interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
}

export function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null);
  
  // Service data
  const services: ServiceItem[] = [
    {
      icon: <Megaphone size={40} />,
      title: "Digital Marketing Campaigns",
      description: "Strategic digital campaigns that deliver measurable results and drive growth.",
      details: [
        "Social media marketing and management",
        "SEO & content marketing strategies",
        "Paid advertising campaigns (PPC/SEM)",
        "Email marketing automation",
        "Analytics and performance tracking"
      ],
      color: "bg-brand shadow-neon"
    },
    {
      icon: <Calendar size={40} />,
      title: "Event Management",
      description: "End-to-end event planning and execution that creates unforgettable experiences.",
      details: [
        "Corporate event planning",
        "Product launch events",
        "Virtual & hybrid event solutions",
        "Conference & exhibition management",
        "Event marketing & promotion"
      ],
      color: "bg-brand-accent shadow-neon-orange"
    },
    {
      icon: <ShoppingBag size={40} />,
      title: "Product Advertisement",
      description: "Compelling product promotions that boost visibility and drive conversions.",
      details: [
        "Product photography & videography",
        "E-commerce optimization",
        "Conversion-focused ad campaigns",
        "Product placement strategies",
        "Retail marketing support"
      ],
      color: "bg-brand-blue shadow-neon-blue"
    },
    {
      icon: <Users size={40} />,
      title: "Modeling & Talent Showcasing",
      description: "Professional modeling services and talent management for various industries.",
      details: [
        "Fashion & commercial modeling",
        "Product & promotional modeling",
        "Runway & event models",
        "Talent management services",
        "Portfolio development"
      ],
      color: "bg-purple-600 shadow-neon"
    },
    {
      icon: <Lightbulb size={40} />,
      title: "Creative Strategy & Branding",
      description: "Innovative branding solutions that help businesses stand out and connect with audiences.",
      details: [
        "Brand identity development",
        "Visual & verbal brand strategy",
        "Creative direction & consultation",
        "Brand guidelines & asset creation",
        "Rebranding & brand evolution"
      ],
      color: "bg-amber-500 shadow-neon-orange"
    }
  ];

  // Additional service features
  const serviceFeatures = [
    { icon: <Medal size={24} />, title: "Industry Expertise" },
    { icon: <BarChart size={24} />, title: "Data-Driven Approach" },
    { icon: <TrendingUp size={24} />, title: "Growth Strategies" },
    { icon: <Zap size={24} />, title: "Fast Turnaround" },
    { icon: <Share2 size={24} />, title: "Seamless Integration" },
    { icon: <Target size={24} />, title: "Result Focused" },
  ];

  // Toggle active service card
  const toggleService = (index: number) => {
    if (activeService === index) {
      setActiveService(null);
    } else {
      setActiveService(index);
    }
  };

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-gradient-to-br from-brand-dark to-black/80">
      {/* Background visual elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/20 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Our Services</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We offer comprehensive digital marketing solutions tailored to elevate your brand, 
            drive engagement, and deliver exceptional results.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`glass-card p-8 transition-all duration-500 cursor-pointer overflow-hidden hover-scale
                ${activeService === index ? 'row-span-2 md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
              onClick={() => toggleService(index)}
            >
              <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 transition-transform duration-300 ${activeService === index ? 'scale-110' : ''}`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              
              {activeService === index && (
                <div className="mt-4 animate-fade-in">
                  <h4 className="text-lg font-semibold text-brand mb-3">What we offer:</h4>
                  <ul className="space-y-2">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-brand-accent shrink-0 mt-0.5 mr-2" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeService !== index && (
                <button className="text-brand-accent hover:text-brand-accent/80 font-medium mt-2 inline-flex items-center">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Additional features */}
        <div className="mt-20 glass-card p-8">
          <h3 className="text-2xl font-bold mb-8 text-center text-white">Why Choose Our Services</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {serviceFeatures.map((feature, index) => (
              <div key={index} className="text-center p-4 hover-scale">
                <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 flex items-center justify-center mb-3 text-brand-accent">
                  {feature.icon}
                </div>
                <h4 className="font-medium text-white">{feature.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
