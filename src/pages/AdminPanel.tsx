import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, Calendar, Image, MessageCircle, Settings, FileText, Upload, Pencil, Trash2, Instagram } from "lucide-react";

const AdminPanel = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
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
              
              <TabsTrigger value="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <span className="hidden md:inline">Instagram</span>
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
                  <CardTitle>Media Management</CardTitle>
                  <CardDescription>Upload and manage your media files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-dashed border-gray-400 rounded-lg text-center">
                      <input
                        type="file"
                        id="media-upload"
                        className="hidden"
                        accept="image/*,video/*"
                        multiple
                      />
                      <label
                        htmlFor="media-upload"
                        className="cursor-pointer block p-4 text-gray-400 hover:text-white transition-colors"
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p>Click to upload media files</p>
                        <p className="text-sm text-gray-500">Supports images and videos</p>
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* This would be populated with your media files */}
                      <div className="aspect-square bg-gray-800 rounded-lg"></div>
                      <div className="aspect-square bg-gray-800 rounded-lg"></div>
                      <div className="aspect-square bg-gray-800 rounded-lg"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blog">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Blog Management</CardTitle>
                  <CardDescription>Create and edit blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <button className="w-full p-4 bg-brand hover:bg-brand/90 rounded-lg text-white font-medium">
                      Create New Blog Post
                    </button>
                    
                    <div className="space-y-4">
                      {/* This would be populated with your blog posts */}
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Blog Post Title</h3>
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-700 rounded">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-700 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">Last edited: 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="instagram">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Instagram Feed Management</CardTitle>
                  <CardDescription>Manage your Instagram content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <button className="w-full p-4 bg-brand hover:bg-brand/90 rounded-lg text-white font-medium">
                      Add New Instagram Post
                    </button>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* This would be populated with your Instagram posts */}
                      <div className="aspect-square bg-gray-800 rounded-lg relative group">
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
