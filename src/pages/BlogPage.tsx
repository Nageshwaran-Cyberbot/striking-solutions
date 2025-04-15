
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventsBackground } from "@/components/events/EventsBackground";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, Tag, Search } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Demo blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "10 Digital Marketing Trends You Need to Know in 2025",
      excerpt: "Stay ahead of the curve with these emerging digital marketing trends that will shape the industry in the coming year.",
      date: "April 15, 2025",
      image: "/placeholder.svg",
      category: "Marketing",
      readTime: "5 min read"
    },
    {
      id: "2",
      title: "How to Create an Effective Social Media Strategy",
      excerpt: "Learn the key components of a successful social media strategy that drives engagement and converts followers into customers.",
      date: "April 12, 2025",
      image: "/placeholder.svg",
      category: "Social Media",
      readTime: "7 min read"
    },
    {
      id: "3",
      title: "The Benefits of 3D Modeling in Digital Marketing",
      excerpt: "Discover how 3D modeling can enhance your digital marketing efforts and create immersive experiences for your audience.",
      date: "April 9, 2025",
      image: "/placeholder.svg",
      category: "3D Design",
      readTime: "6 min read"
    },
    {
      id: "4",
      title: "Event Marketing: From Planning to Execution",
      excerpt: "A comprehensive guide to planning, promoting, and executing successful marketing events that generate leads and build brand awareness.",
      date: "April 6, 2025",
      image: "/placeholder.svg",
      category: "Events",
      readTime: "8 min read"
    },
    {
      id: "5",
      title: "How to Measure the ROI of Your Digital Marketing Campaigns",
      excerpt: "Learn how to track and measure the return on investment of your digital marketing efforts to optimize future campaigns.",
      date: "April 3, 2025",
      image: "/placeholder.svg",
      category: "Analytics",
      readTime: "10 min read"
    },
    {
      id: "6",
      title: "The Psychology of Color in Marketing",
      excerpt: "Understand how color choices influence consumer perception and behavior, and how to leverage color psychology in your marketing.",
      date: "March 30, 2025",
      image: "/placeholder.svg",
      category: "Design",
      readTime: "5 min read"
    }
  ];
  
  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-white">
      <Navbar />
      <EventsBackground />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Digital Marketing Blog</h1>
            <p className="text-xl text-gray-300 mb-8">
              Insights, strategies, and trends in digital marketing, 3D design, events, and more.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="md:w-3/4">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map(post => (
                    <article key={post.id} className="glass-card rounded-xl overflow-hidden hover-scale transition-transform duration-300">
                      <div className="aspect-video relative">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-4 right-4 bg-brand/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-400 mb-3">
                          <div className="flex items-center mr-4">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                        <p className="text-gray-300 mb-4">{post.excerpt}</p>
                        <Link to={`/blog/${post.id}`} className="text-brand hover:text-brand-accent font-medium">
                          Read More →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No articles found</h3>
                  <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="sticky top-24">
                <div className="glass-card rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === null ? 'bg-brand text-white' : 'hover:bg-white/10'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category ? 'bg-brand text-white' : 'hover:bg-white/10'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Subscribe</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Get the latest articles and resources sent to your inbox weekly.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    />
                    <button type="submit" className="w-full bg-brand hover:bg-brand/90 transition-colors text-white px-4 py-2 rounded-lg font-medium">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
