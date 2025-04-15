
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { EventsSection } from "@/components/EventsSection";
import { ModelingSection } from "@/components/ModelingSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-white">
      <Navbar />
      <main>
        <div id="hero"><HeroSection /></div>
        <div id="about"><AboutSection /></div>
        <div id="services"><ServicesSection /></div>
        <div id="events"><EventsSection /></div>
        <div id="modeling"><ModelingSection /></div>
        <div id="products"><ProductsSection /></div>
        <div id="contact"><ContactSection /></div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
