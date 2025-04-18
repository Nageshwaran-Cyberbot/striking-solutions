
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { EventsBackground } from "@/components/events/EventsBackground";
import { useBackground } from "@/contexts/BackgroundContext";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { ADMIN_USER, ADMIN_PASSWORD, DEFAULT_USERS, DEFAULT_USER_PASSWORD } from "@/models/User";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { backgroundSettings } = useBackground();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Success!",
        description: "You have been signed in.",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-white">
      <Navbar />
      <EventsBackground 
        type={backgroundSettings.type} 
        mediaUrl={backgroundSettings.mediaUrl} 
      />
      
      <main className="flex flex-grow items-center justify-center py-24 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gradient mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>
          
          <div className="glass-card p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand hover:text-brand-accent"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand to-brand-accent py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50 hover:opacity-90 transition-all"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-brand hover:text-brand-accent">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-2">Demo credentials:</p>
              <div className="space-y-2">
                <div className="bg-white/5 p-2 rounded text-sm">
                  <p><strong>Admin:</strong> {ADMIN_USER.email} / {ADMIN_PASSWORD}</p>
                </div>
                <div className="bg-white/5 p-2 rounded text-sm">
                  <p><strong>User:</strong> {DEFAULT_USERS[0].email} / {DEFAULT_USER_PASSWORD}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignInPage;
