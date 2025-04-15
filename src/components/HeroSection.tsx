
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Custom hook for typing animation
const useTypingEffect = (
  text: string,
  typingSpeed: number = 150,
  startDelay: number = 1000
) => {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;
    
    // Start the typing animation after a delay
    const startTimer = setTimeout(() => {
      timer = setInterval(() => {
        if (charIndex <= text.length) {
          el.textContent = text.slice(0, charIndex);
          charIndex++;
        } else {
          clearInterval(timer);
          // Add a blinking cursor at the end
          el.classList.add("after:content-['|']", "after:animate-pulse");
        }
      }, typingSpeed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
    };
  }, [text, typingSpeed, startDelay]);

  return elRef;
};

export function HeroSection() {
  const typingTextRef = useTypingEffect("Digital Marketing Excellence", 80, 1000);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Video background placeholder - can be replaced with user's video */}
      <div className="absolute inset-0 -z-10 bg-black/70">
        {/* Uncomment and update src for production */}
        {/* <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video> */}
        
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-black to-brand/20"></div>
        
        {/* Animated floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 15 + 5}px`,
                height: `${Math.random() * 15 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `float ${Math.random() * 10 + 15}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="hero-text mb-6 text-gradient">
            Transforming Brands with <br />
            <span ref={typingTextRef} className="inline-block min-h-[1.5em]"></span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We elevate businesses through powerful digital marketing campaigns, 
            strategic event management, impactful product advertisements, professional 
            modeling services, and innovative creative strategy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="cta-button text-lg px-8 py-4">
                Get a Quote
              </button>
            </Link>
            <Link to="/services">
              <button className="cta-button-secondary text-lg px-8 py-4">
                View Services
              </button>
            </Link>
          </div>
          
          <div className="mt-16 flex justify-center">
            <div className="glass-card py-6 px-10 animate-float">
              <p className="text-xl font-medium text-white">
                Trusted by <span className="text-brand-accent font-bold">200+</span> companies worldwide
              </p>
              <div className="flex flex-wrap justify-center gap-10 mt-8">
                {/* Placeholder for client logos */}
                {["Company 1", "Company 2", "Company 3", "Company 4"].map((company, i) => (
                  <div key={i} className="h-12 w-32 bg-white/5 backdrop-blur rounded-lg flex items-center justify-center">
                    <span className="text-white/50">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" className="text-white/80 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
