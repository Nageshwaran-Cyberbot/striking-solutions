
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, ADMIN_USER, DEFAULT_USERS, ADMIN_PASSWORD, DEFAULT_USER_PASSWORD } from "../models/User";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  addUser: (user: Omit<User, 'id' | 'createdAt'>, password: string) => Promise<User>;
  updateUser: (id: string, userData: Partial<User>) => Promise<User | null>;
  deleteUser: (id: string) => Promise<boolean>;
  getUser: (id: string) => User | null;
  getAllUsers: () => User[];
}

// Map to store passwords - in a real app, you would use a secure authentication system
const passwordsMap = new Map<string, string>();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize users and passwords on first load
  useEffect(() => {
    // Try to load users from localStorage
    const storedUsers = localStorage.getItem("users");
    const storedPasswords = localStorage.getItem("passwords");
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Set default users if none exist
      const initialUsers = [ADMIN_USER, ...DEFAULT_USERS];
      setUsers(initialUsers);
      localStorage.setItem("users", JSON.stringify(initialUsers));
    }

    if (storedPasswords) {
      const passwordEntries = JSON.parse(storedPasswords) as [string, string][];
      passwordEntries.forEach(([id, password]) => {
        passwordsMap.set(id, password);
      });
    } else {
      // Set default passwords
      passwordsMap.set(ADMIN_USER.id, ADMIN_PASSWORD);
      DEFAULT_USERS.forEach(user => {
        passwordsMap.set(user.id, DEFAULT_USER_PASSWORD);
      });
      savePasswords();
    }

    // Try to restore logged-in user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  // Save passwords to localStorage
  const savePasswords = () => {
    const passwordEntries = Array.from(passwordsMap.entries());
    localStorage.setItem("passwords", JSON.stringify(passwordEntries));
  };

  // Save users to localStorage
  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Find user by email
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        throw new Error("User not found");
      }
      
      // Check password
      const storedPassword = passwordsMap.get(foundUser.id);
      if (storedPassword !== password) {
        throw new Error("Invalid password");
      }
      
      // Update last login time
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      };
      
      // Update user in users array
      const updatedUsers = users.map(u => 
        u.id === updatedUser.id ? updatedUser : u
      );
      
      saveUsers(updatedUsers);
      
      // Set current user
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${updatedUser.name || updatedUser.email}!`,
      });
      
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      // Check if email already exists
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("Email already in use");
      }
      
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        email,
        name,
        isAdmin: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      // Add user to users array
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
      
      // Store password
      passwordsMap.set(newUser.id, password);
      savePasswords();
      
      // Set current user
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      
      toast({
        title: "Signup successful",
        description: `Welcome, ${newUser.name || newUser.email}!`,
      });
      
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // CRUD operations for users
  const addUser = async (userData: Omit<User, 'id' | 'createdAt'>, password: string): Promise<User> => {
    if (!user?.isAdmin) {
      throw new Error("Unauthorized: Only admins can add users");
    }
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error("Email already in use");
    }
    
    // Create new user
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    
    // Add user to users array
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    
    // Store password
    passwordsMap.set(newUser.id, password);
    savePasswords();
    
    toast({
      title: "User added",
      description: `${newUser.name || newUser.email} has been added successfully.`,
    });
    
    return newUser;
  };

  const updateUser = async (id: string, userData: Partial<User>): Promise<User | null> => {
    // Check if current user is admin or updating their own profile
    if (!user?.isAdmin && user?.id !== id) {
      throw new Error("Unauthorized: You can only update your own profile");
    }
    
    // Find user
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return null;
    }
    
    // Make sure non-admins can't make themselves admin
    if (!isAdmin && userData.isAdmin) {
      delete userData.isAdmin;
    }
    
    // Update user
    const updatedUser = { ...users[userIndex], ...userData };
    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;
    
    saveUsers(updatedUsers);
    
    // If updating current user, update in state and localStorage
    if (user?.id === id) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    
    toast({
      title: "User updated",
      description: `${updatedUser.name || updatedUser.email}'s profile has been updated.`,
    });
    
    return updatedUser;
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    if (!user?.isAdmin) {
      throw new Error("Unauthorized: Only admins can delete users");
    }
    
    // Prevent deleting admin user
    const userToDelete = users.find(u => u.id === id);
    if (!userToDelete) {
      return false;
    }
    
    if (userToDelete.isAdmin) {
      throw new Error("Cannot delete admin user");
    }
    
    // Remove user from users array
    const updatedUsers = users.filter(u => u.id !== id);
    saveUsers(updatedUsers);
    
    // Remove password
    passwordsMap.delete(id);
    savePasswords();
    
    toast({
      title: "User deleted",
      description: `${userToDelete.name || userToDelete.email} has been deleted.`,
    });
    
    return true;
  };

  const getUser = (id: string): User | null => {
    return users.find(u => u.id === id) || null;
  };

  const getAllUsers = (): User[] => {
    return user?.isAdmin ? [...users] : [];
  };

  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated: !!user,
        isAdmin,
        login,
        signup,
        logout,
        loading,
        addUser,
        updateUser,
        deleteUser,
        getUser,
        getAllUsers
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
