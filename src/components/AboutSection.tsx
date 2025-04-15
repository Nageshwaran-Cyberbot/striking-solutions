
import { useRef, useEffect } from "react";

// Array of team members
const teamMembers = [
  {
    name: "Alex Morgan",
    position: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bio: "With over 15 years of experience in digital marketing and branding, Alex leads our team with vision and innovation."
  },
  {
    name: "Sarah Chen",
    position: "Creative Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bio: "Sarah brings creative excellence to every project, with expertise in visual design and brand strategy."
  },
  {
    name: "Marcus Johnson",
    position: "Head of Digital Campaigns",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bio: "Marcus specializes in data-driven marketing campaigns that deliver measurable results and exceed expectations."
  },
  {
    name: "Emma Rodriguez",
    position: "Events Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bio: "Emma's expertise in event planning and execution has created unforgettable experiences for our clients."
  }
];

// Array of milestones for the timeline
const milestones = [
  {
    year: "2015",
    title: "Company Founded",
    description: "DigitalStrike was established with a mission to provide innovative digital marketing solutions."
  },
  {
    year: "2017",
    title: "Service Expansion",
    description: "Added event management and product advertisement to our growing service portfolio."
  },
  {
    year: "2019",
    title: "Industry Recognition",
    description: "Received multiple awards for creative excellence and campaign effectiveness."
  },
  {
    year: "2021",
    title: "Global Reach",
    description: "Expanded operations to serve international clients across three continents."
  },
  {
    year: "2023",
    title: "Innovation Leader",
    description: "Pioneered new approaches in digital marketing using AI and immersive technologies."
  },
  {
    year: "2025",
    title: "Looking Forward",
    description: "Continuing to innovate and lead the industry with cutting-edge marketing solutions."
  }
];

export function AboutSection() {
  // Refs for elements that will have scroll animations
  const timelineRef = useRef<HTMLDivElement>(null);

  // Handle parallax effect for timeline
  useEffect(() => {
    const handleScroll = () => {
      const timelineElement = timelineRef.current;
      if (!timelineElement) return;

      const scrollPosition = window.scrollY;
      const timelinePosition = timelineElement.offsetTop;
      const windowHeight = window.innerHeight;

      // Check if timeline is in view
      if (scrollPosition + windowHeight > timelinePosition) {
        const distance = scrollPosition + windowHeight - timelinePosition;
        const parallaxValue = Math.min(distance * 0.1, 100); // Limit the parallax effect
        
        // Apply the parallax effect to timeline items with different rates
        const items = timelineElement.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
          const evenItem = index % 2 === 0;
          const direction = evenItem ? 1 : -1;
          const element = item as HTMLElement;
          element.style.transform = `translateY(${parallaxValue * 0.3 * direction}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-black -z-10"></div>
      
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">About Us</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We are a dynamic team of digital marketing experts dedicated to helping brands 
            thrive in today's competitive landscape. Our innovative approaches and strategic 
            thinking drive exceptional results for our clients.
          </p>
        </div>

        {/* Core values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {['Innovation', 'Excellence', 'Collaboration'].map((value, index) => (
            <div key={index} className="glass-card p-8 text-center hover-scale">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">{index + 1}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{value}</h3>
              <p className="text-gray-300">
                {index === 0 && "We push boundaries and embrace new technologies to keep our clients ahead of the curve."}
                {index === 1 && "We deliver exceptional quality in everything we do, from strategy to execution."}
                {index === 2 && "We work closely with our clients, building partnerships that drive success and growth."}
              </p>
            </div>
          ))}
        </div>

        {/* Team section with hover effects */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Meet Our Team</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="glass-card overflow-hidden group transition-all duration-300"
              >
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  
                  {/* Member info that moves up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-brand-accent font-medium">{member.position}</p>
                    
                    {/* Bio that appears on hover */}
                    <p className="mt-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline section with parallax effect */}
        <div ref={timelineRef} className="relative">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Our Journey</h3>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-accent/50 transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`timeline-item relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} transition-transform duration-700`}
                >
                  {/* Content box */}
                  <div className={`glass-card p-6 max-w-md ${index % 2 === 0 ? 'mr-12' : 'ml-12'}`}>
                    <div className="bg-brand-accent text-white font-bold py-1 px-3 rounded-lg inline-block mb-3">
                      {milestone.year}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{milestone.title}</h4>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                  
                  {/* Timeline node */}
                  <div className="absolute left-1/2 top-8 w-6 h-6 bg-brand-accent rounded-full transform -translate-x-1/2 border-4 border-brand-dark"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
