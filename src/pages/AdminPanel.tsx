
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBackground } from "@/contexts/BackgroundContext";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventsBackground } from "@/components/events/EventsBackground";
import { UserManagement } from "@/components/admin/UserManagement";
import { BackgroundSettings } from "@/components/admin/BackgroundSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { 
  Users, ShoppingBag, Calendar, Image, MessageCircle, Settings, 
  FileText, Upload, Pencil, Trash2, Instagram, Plus, Save, X, Video, 
  PlusCircle, FileImage, Youtube
} from "lucide-react";

const AdminPanel = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { backgroundSettings } = useBackground();
  const navigate = useNavigate();
  
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: "Getting Started with Digital Marketing", content: "Digital marketing is crucial for businesses today...", image: "/placeholder.svg", published: true },
    { id: 2, title: "Social Media Strategies for 2025", content: "As social media evolves, businesses need to adapt...", image: "/placeholder.svg", published: false },
  ]);
  const [editingBlogPost, setEditingBlogPost] = useState<any>(null);
  const [newBlogPost, setNewBlogPost] = useState({ title: "", content: "", image: "" });
  
  const [instagramPosts, setInstagramPosts] = useState([
    { id: 1, caption: "Our latest campaign launch!", image: "/placeholder.svg", likes: 124 },
    { id: 2, caption: "Behind the scenes at our studio", image: "/placeholder.svg", likes: 98 },
  ]);
  const [editingInstaPost, setEditingInstaPost] = useState<any>(null);
  const [newInstaPost, setNewInstaPost] = useState({ caption: "", image: "" });
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    
    if (!isAdmin) {
      toast({
        title: "Access denied",
        description: "You need administrator privileges to access this page",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    setUploadedFiles(["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]);
  }, [isAuthenticated, isAdmin, navigate]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setMediaFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      const newUploadedUrls = mediaFiles.map(file => URL.createObjectURL(file));
      setUploadedFiles(prev => [...prev, ...newUploadedUrls]);
      setMediaFiles([]);
      setUploading(false);
      toast({
        title: "Upload successful",
        description: `${mediaFiles.length} files uploaded successfully.`,
      });
    }, 1500);
  };
  
  const removeMediaFile = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const createBlogPost = () => {
    if (!newBlogPost.title || !newBlogPost.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }
    
    const newPost = {
      id: Date.now(),
      ...newBlogPost,
      image: newBlogPost.image || "/placeholder.svg",
      published: false,
    };
    
    setBlogPosts(prev => [...prev, newPost]);
    setNewBlogPost({ title: "", content: "", image: "" });
    
    toast({
      title: "Blog post created",
      description: "Your draft has been saved",
    });
  };
  
  const updateBlogPost = () => {
    if (!editingBlogPost) return;
    
    setBlogPosts(prev => 
      prev.map(post => 
        post.id === editingBlogPost.id ? editingBlogPost : post
      )
    );
    
    setEditingBlogPost(null);
    
    toast({
      title: "Blog post updated",
      description: "Changes saved successfully",
    });
  };
  
  const deleteBlogPost = (id: number) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
    
    toast({
      title: "Blog post deleted",
      description: "The post has been removed",
    });
  };
  
  const togglePublishBlog = (id: number, currentStatus: boolean) => {
    setBlogPosts(prev => 
      prev.map(post => 
        post.id === id ? {...post, published: !currentStatus} : post
      )
    );
    
    toast({
      title: currentStatus ? "Post unpublished" : "Post published",
      description: currentStatus 
        ? "The post is now in drafts" 
        : "The post is now live on your blog",
    });
  };
  
  const createInstaPost = () => {
    if (!newInstaPost.caption || !newInstaPost.image) {
      toast({
        title: "Error",
        description: "Caption and image are required",
        variant: "destructive",
      });
      return;
    }
    
    const newPost = {
      id: Date.now(),
      ...newInstaPost,
      likes: 0,
    };
    
    setInstagramPosts(prev => [...prev, newPost]);
    setNewInstaPost({ caption: "", image: "" });
    
    toast({
      title: "Instagram post created",
      description: "Your post has been saved",
    });
  };
  
  const updateInstaPost = () => {
    if (!editingInstaPost) return;
    
    setInstagramPosts(prev => 
      prev.map(post => 
        post.id === editingInstaPost.id ? editingInstaPost : post
      )
    );
    
    setEditingInstaPost(null);
    
    toast({
      title: "Instagram post updated",
      description: "Changes saved successfully",
    });
  };
  
  const deleteInstaPost = (id: number) => {
    setInstagramPosts(prev => prev.filter(post => post.id !== id));
    
    toast({
      title: "Instagram post deleted",
      description: "The post has been removed",
    });
  };
  
  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-white">
      <Navbar />
      <EventsBackground 
        type={backgroundSettings.type} 
        mediaUrl={backgroundSettings.mediaUrl} 
      />
      
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
              <UserManagement />
            </TabsContent>
            
            <TabsContent value="settings">
              <BackgroundSettings />
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Upload Media</CardTitle>
                    <CardDescription>Add images and videos to your library</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="media-upload">Media Files</Label>
                      <div className="p-4 border border-dashed border-gray-400 rounded-lg text-center">
                        <input
                          type="file"
                          id="media-upload"
                          className="hidden"
                          accept="image/*,video/*"
                          multiple
                          onChange={handleFileChange}
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
                    </div>
                    
                    {mediaFiles.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Selected Files ({mediaFiles.length})</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {mediaFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-md">
                              <div className="flex items-center gap-2">
                                {file.type.includes('image') ? (
                                  <FileImage className="w-4 h-4" />
                                ) : (
                                  <Video className="w-4 h-4" />
                                )}
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => removeMediaFile(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {mediaFiles.length > 0 && (
                      <Button 
                        className="w-full" 
                        onClick={handleUpload}
                        disabled={uploading}
                      >
                        {uploading ? "Uploading..." : "Upload Files"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Media Library</CardTitle>
                    <CardDescription>Manage your uploaded media</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="aspect-square bg-gray-800 rounded-lg relative group overflow-hidden">
                          <img 
                            src={file} 
                            alt={`Media ${index}`}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button variant="ghost" size="icon" className="bg-white/10 rounded-full hover:bg-white/20">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="bg-white/10 rounded-full hover:bg-white/20">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="aspect-square bg-gray-800 rounded-lg relative group overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Youtube className="w-8 h-8 text-gray-600" />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button variant="ghost" size="icon" className="bg-white/10 rounded-full hover:bg-white/20">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="bg-white/10 rounded-full hover:bg-white/20">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-gray-400">
                      Media files are stored in public/assets/media.
                      Custom media can be added by uploading to that folder.
                    </p>
                  </CardFooter>
                </Card>
              </div>
              
              <BackgroundSettings />
            </TabsContent>
            
            <TabsContent value="blog">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>
                      {editingBlogPost ? "Edit Blog Post" : "Create New Blog Post"}
                    </CardTitle>
                    <CardDescription>
                      {editingBlogPost ? "Make changes to your blog post" : "Write a new blog post"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="blog-title">Post Title</Label>
                      <Input 
                        id="blog-title" 
                        placeholder="Enter post title" 
                        value={editingBlogPost ? editingBlogPost.title : newBlogPost.title}
                        onChange={(e) => {
                          if (editingBlogPost) {
                            setEditingBlogPost({...editingBlogPost, title: e.target.value});
                          } else {
                            setNewBlogPost({...newBlogPost, title: e.target.value});
                          }
                        }}
                        className="bg-white/5"
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="blog-content">Content</Label>
                      <Textarea 
                        id="blog-content" 
                        placeholder="Write your blog post content" 
                        rows={8}
                        value={editingBlogPost ? editingBlogPost.content : newBlogPost.content}
                        onChange={(e) => {
                          if (editingBlogPost) {
                            setEditingBlogPost({...editingBlogPost, content: e.target.value});
                          } else {
                            setNewBlogPost({...newBlogPost, content: e.target.value});
                          }
                        }}
                        className="bg-white/5"
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="blog-image">Featured Image URL</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="blog-image" 
                          placeholder="/path/to/image.jpg or select from media library" 
                          value={editingBlogPost ? editingBlogPost.image : newBlogPost.image}
                          onChange={(e) => {
                            if (editingBlogPost) {
                              setEditingBlogPost({...editingBlogPost, image: e.target.value});
                            } else {
                              setNewBlogPost({...newBlogPost, image: e.target.value});
                            }
                          }}
                          className="bg-white/5 flex-1"
                        />
                        <Button variant="outline" className="shrink-0">
                          <Image className="w-4 h-4 mr-2" />
                          Media
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      {editingBlogPost ? (
                        <>
                          <Button variant="outline" onClick={() => setEditingBlogPost(null)}>
                            Cancel
                          </Button>
                          <Button onClick={updateBlogPost}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        <Button onClick={createBlogPost}>
                          <Plus className="w-4 h-4 mr-2" />
                          Create Post
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>Manage your existing blog posts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {blogPosts.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <FileText className="w-8 h-8 mx-auto mb-2" />
                        <p>No blog posts yet</p>
                        <p className="text-sm">Create your first post to get started</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {blogPosts.map((post) => (
                          <div key={post.id} className="flex flex-col p-4 bg-gray-800/50 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-medium text-white">{post.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2">{post.content}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => setEditingBlogPost(post)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => deleteBlogPost(post.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm mt-2">
                              <div className="flex items-center gap-2">
                                <div className={`px-2 py-0.5 rounded text-xs ${post.published ? 'bg-green-800 text-green-200' : 'bg-gray-700 text-gray-300'}`}>
                                  {post.published ? 'Published' : 'Draft'}
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => togglePublishBlog(post.id, post.published)}
                              >
                                {post.published ? 'Unpublish' : 'Publish'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="instagram">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>
                      {editingInstaPost ? "Edit Instagram Post" : "Create Instagram Post"}
                    </CardTitle>
                    <CardDescription>
                      {editingInstaPost ? "Update your Instagram content" : "Add new content to your Instagram feed"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="insta-image">Image URL</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="insta-image" 
                          placeholder="/path/to/image.jpg or select from media library" 
                          value={editingInstaPost ? editingInstaPost.image : newInstaPost.image}
                          onChange={(e) => {
                            if (editingInstaPost) {
                              setEditingInstaPost({...editingInstaPost, image: e.target.value});
                            } else {
                              setNewInstaPost({...newInstaPost, image: e.target.value});
                            }
                          }}
                          className="bg-white/5 flex-1"
                        />
                        <Button variant="outline" className="shrink-0">
                          <Image className="w-4 h-4 mr-2" />
                          Media
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="insta-caption">Caption</Label>
                      <Textarea 
                        id="insta-caption" 
                        placeholder="Write your Instagram caption" 
                        rows={4}
                        value={editingInstaPost ? editingInstaPost.caption : newInstaPost.caption}
                        onChange={(e) => {
                          if (editingInstaPost) {
                            setEditingInstaPost({...editingInstaPost, caption: e.target.value});
                          } else {
                            setNewInstaPost({...newInstaPost, caption: e.target.value});
                          }
                        }}
                        className="bg-white/5"
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      {editingInstaPost ? (
                        <>
                          <Button variant="outline" onClick={() => setEditingInstaPost(null)}>
                            Cancel
                          </Button>
                          <Button onClick={updateInstaPost}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        <Button onClick={createInstaPost}>
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Create Post
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Instagram Feed</CardTitle>
                    <CardDescription>Manage your Instagram content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {instagramPosts.length === 0 ? (
                        <div className="col-span-3 text-center py-8 text-gray-400">
                          <Instagram className="w-8 h-8 mx-auto mb-2" />
                          <p>No Instagram posts yet</p>
                          <p className="text-sm">Create your first post to get started</p>
                        </div>
                      ) : (
                        instagramPosts.map((post) => (
                          <div key={post.id} className="aspect-square bg-gray-800 rounded-lg relative group overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.caption}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                              <p className="text-xs text-white truncate">{post.caption}</p>
                              <div className="flex items-center text-xs text-gray-300 mt-1">
                                <span>❤️ {post.likes}</span>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="bg-white/10 rounded-full hover:bg-white/20"
                                onClick={() => setEditingInstaPost(post)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="bg-white/10 rounded-full hover:bg-white/20"
                                onClick={() => deleteInstaPost(post.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-gray-400">
                      These posts are displayed on your Instagram page. 
                      Changes made here will be reflected on your website.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
