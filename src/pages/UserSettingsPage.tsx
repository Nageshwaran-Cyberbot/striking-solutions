
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventsBackground } from "@/components/events/EventsBackground";
import { useBackground } from "@/contexts/BackgroundContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { User } from "lucide-react";

const UserSettingsPage = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { backgroundSettings } = useBackground();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  
  if (!isAuthenticated || !user) {
    navigate("/signin");
    return null;
  }
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateUser(user.id, { name });
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
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
            <h1 className="text-4xl font-bold text-gradient mb-2">Account Settings</h1>
            <p className="text-gray-400">Manage your profile and preferences</p>
          </div>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="bg-white/5"
                  />
                  <p className="text-xs text-gray-400">Email address cannot be changed</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-white/5"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="text-gray-400">
                      Account type: <span className={user.isAdmin ? "text-brand" : "text-white"}>{user.isAdmin ? "Administrator" : "Regular User"}</span>
                    </p>
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-brand/20 p-3">
                    <User className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-medium">{user.name || user.email}</h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Member Since</p>
                    <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Last Login</p>
                    <p className="font-medium">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserSettingsPage;
