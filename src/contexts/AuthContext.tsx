
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // This would normally connect to Supabase or another auth provider
  // For now, we'll use localStorage to simulate authentication
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // This would normally be a call to Supabase or another auth provider
      // For demonstration, we'll create a mock user
      if (email && password) {
        // Check if it's an admin account (for demo purposes)
        const isAdmin = email.includes("admin");
        const user: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          isAdmin
        };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      // This would normally be a call to Supabase or another auth provider
      // For demonstration, we'll create a mock user
      if (email && password) {
        const user: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          isAdmin: false // New users are not admins by default
        };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        signup,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
