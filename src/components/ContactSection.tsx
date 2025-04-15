
import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Send, Check } from "lucide-react";

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      formRef.current?.reset();
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background gradient with particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-black -z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3,
              filter: 'blur(50px)',
              animation: `float ${Math.random() * 15 + 15}s linear infinite`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Contact Us</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Ready to transform your marketing strategy? Get in touch with our team
            and let's discuss how we can help you achieve your business goals.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact form */}
          <div className="lg:w-2/3">
            <div className="glass-card p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  
                  {/* Service field */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-white"
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="digital-marketing">Digital Marketing Campaigns</option>
                      <option value="event-management">Event Management</option>
                      <option value="product-advertisement">Product Advertisement</option>
                      <option value="modeling">Modeling & Talent Showcasing</option>
                      <option value="creative-strategy">Creative Strategy & Branding</option>
                    </select>
                  </div>
                </div>
                
                {/* Message field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-white"
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>
                
                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="cta-button w-full flex items-center justify-center py-3"
                  >
                    {formStatus === 'idle' && (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        <span>Send Message</span>
                      </>
                    )}
                    
                    {formStatus === 'submitting' && (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    )}
                    
                    {formStatus === 'success' && (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        <span>Message Sent!</span>
                      </>
                    )}
                    
                    {formStatus === 'error' && (
                      <span>Error! Please try again</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Contact information */}
          <div className="lg:w-1/3 space-y-8">
            {/* Location */}
            <div className="glass-card p-6 hover-scale">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center text-brand mr-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Visit Us</h4>
                  <p className="text-gray-300">
                    123 Marketing Avenue<br />
                    Creative District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
            
            {/* Phone */}
            <div className="glass-card p-6 hover-scale">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-accent/20 rounded-xl flex items-center justify-center text-brand-accent mr-4">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Call Us</h4>
                  <p className="text-gray-300">
                    Main Office: (555) 123-4567<br />
                    Support: (555) 765-4321
                  </p>
                </div>
              </div>
            </div>
            
            {/* Email */}
            <div className="glass-card p-6 hover-scale">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue mr-4">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Email Us</h4>
                  <p className="text-gray-300">
                    info@digitalstrike.com<br />
                    support@digitalstrike.com
                  </p>
                </div>
              </div>
            </div>
            
            {/* Business hours */}
            <div className="glass-card p-6">
              <h4 className="text-xl font-bold text-white mb-4">Business Hours</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Map embed */}
        <div className="mt-16 glass-card overflow-hidden rounded-2xl h-[400px] relative">
          {/* Placeholder for an actual map integration */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/50 to-black/50 flex items-center justify-center">
            <p className="text-white text-xl">Interactive Map Placeholder</p>
          </div>
          
          {/* Comment out and replace with actual map implementation */}
          {/* <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1612345678901!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Office Location"
          ></iframe> */}
        </div>
      </div>
    </section>
  );
}
