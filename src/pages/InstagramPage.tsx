
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react";

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  url: string;
}

const InstagramPage = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would normally be an API call to fetch Instagram posts
    // For demo purposes, we're using placeholder data
    const fetchPosts = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock Instagram posts
      const mockPosts: InstagramPost[] = [
        {
          id: '1',
          image: '/placeholder.svg',
          caption: 'Exciting new digital marketing campaign launch! #marketing #digital',
          likes: 156,
          comments: 23,
          url: 'https://instagram.com/p/sample1'
        },
        {
          id: '2',
          image: '/placeholder.svg',
          caption: 'Behind the scenes at our latest photoshoot #behindthescenes #modeling',
          likes: 204,
          comments: 31,
          url: 'https://instagram.com/p/sample2'
        },
        {
          id: '3',
          image: '/placeholder.svg',
          caption: 'Product showcase event coming up next week! #products #event',
          likes: 178,
          comments: 19,
          url: 'https://instagram.com/p/sample3'
        },
        {
          id: '4',
          image: '/placeholder.svg',
          caption: 'Our creative team brainstorming session #creativity #strategy',
          likes: 132,
          comments: 15,
          url: 'https://instagram.com/p/sample4'
        },
        {
          id: '5',
          image: '/placeholder.svg',
          caption: 'New partnership announcement #collaboration #marketing',
          likes: 221,
          comments: 42,
          url: 'https://instagram.com/p/sample5'
        },
        {
          id: '6',
          image: '/placeholder.svg',
          caption: 'Digital marketing tips and tricks #tips #digitalmarketing',
          likes: 189,
          comments: 27,
          url: 'https://instagram.com/p/sample6'
        },
        {
          id: '7',
          image: '/placeholder.svg',
          caption: 'Check out our latest blog post on SEO strategies! #seo #blog',
          likes: 145,
          comments: 18,
          url: 'https://instagram.com/p/sample7'
        },
        {
          id: '8',
          image: '/placeholder.svg',
          caption: 'Meet our team of professionals #team #agency',
          likes: 167,
          comments: 21,
          url: 'https://instagram.com/p/sample8'
        }
      ];
      
      setPosts(mockPosts);
      setLoading(false);
    };
    
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/20 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-brand to-brand-accent rounded-full mb-6">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Instagram Feed</h1>
            <p className="text-xl text-gray-300 mb-8">
              Follow our latest updates, behind-the-scenes content, and marketing insights on Instagram.
            </p>
            <a 
              href="https://instagram.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FCAF45] rounded-full text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow Us on Instagram
            </a>
          </div>
        </div>
      </section>
      
      {/* Instagram Feed Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-800 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {posts.map(post => (
                <div 
                  key={post.id} 
                  className="group relative rounded-lg overflow-hidden hover-scale"
                >
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block aspect-square"
                  >
                    <img 
                      src={post.image} 
                      alt={post.caption} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-4 mb-4">
                        <div className="flex items-center">
                          <Heart className="w-5 h-5 text-white mr-1" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-5 h-5 text-white mr-1" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <p className="text-sm text-center line-clamp-3 px-4">
                        {post.caption}
                      </p>
                      <div className="absolute bottom-3 right-3">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Want to collaborate with us on Instagram? We offer Instagram promotions, 
              content creation, and influencer partnerships.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-colors"
            >
              Contact Us for Instagram Collaborations
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default InstagramPage;
