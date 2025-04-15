
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, Calendar, Image, MessageCircle, Settings, FileText } from "lucide-react";

const AdminPanel = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if user is not authenticated or not an admin
    if (!isAuthenticated || !isAdmin) {
      navigate("/signin");
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your digital marketing platform</p>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden md:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden md:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden md:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden md:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                <span className="hidden md:inline">Media</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden md:inline">Blog</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden md:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Users</CardTitle>
                    <CardDescription>Active users on your platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,234</div>
                    <p className="text-green-500 text-sm">+12% from last month</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Revenue</CardTitle>
                    <CardDescription>Total earnings this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$8,456</div>
                    <p className="text-green-500 text-sm">+5% from last month</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Products</CardTitle>
                    <CardDescription>Total active products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">32</div>
                    <p className="text-gray-400 text-sm">3 pending approval</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Events</CardTitle>
                    <CardDescription>Upcoming events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">8</div>
                    <p className="text-gray-400 text-sm">Next event in 3 days</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions on your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-4 pb-4 border-b border-gray-700">
                        <div className="rounded-full bg-brand/20 p-2">
                          <Users className="w-4 h-4 text-brand" />
                        </div>
                        <div>
                          <p className="font-medium">New user registered</p>
                          <p className="text-sm text-gray-400">user@example.com</p>
                        </div>
                        <div className="ml-auto text-sm text-gray-400">
                          {i} hour{i !== 1 ? 's' : ''} ago
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Users Management</CardTitle>
                  <CardDescription>Manage your platform users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">User management interface would be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="products">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Products Management</CardTitle>
                  <CardDescription>Manage your product offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Product management interface would be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Events Management</CardTitle>
                  <CardDescription>Manage your events calendar</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Events management interface would be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="media">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Media Library</CardTitle>
                  <CardDescription>Manage your media assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Media management interface would be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blog">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Blog Management</CardTitle>
                  <CardDescription>Manage your blog content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Blog management interface would be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Settings interface would be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
