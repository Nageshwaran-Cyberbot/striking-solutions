
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Image } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  published: boolean;
  createdAt: string;
}

export const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleCreatePost = () => {
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      image: imageUrl || "/placeholder.svg",
      published: false,
      createdAt: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
    setImageUrl("");

    toast({
      title: "Success",
      description: "Blog post created successfully",
    });
  };

  const handleUpdatePost = (post: BlogPost) => {
    setPosts(posts.map(p => p.id === post.id ? post : p));
    setEditingPost(null);
    toast({
      title: "Success",
      description: "Blog post updated successfully",
    });
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Blog post deleted successfully",
    });
  };

  const togglePublish = (post: BlogPost) => {
    const updatedPost = { ...post, published: !post.published };
    handleUpdatePost(updatedPost);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>
            {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
          </CardTitle>
          <CardDescription>
            {editingPost ? "Make changes to your blog post" : "Write a new blog post"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Post Title"
              value={editingPost ? editingPost.title : title}
              onChange={(e) => editingPost ? 
                setEditingPost({...editingPost, title: e.target.value}) : 
                setTitle(e.target.value)}
              className="bg-white/5"
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Write your blog post content"
              value={editingPost ? editingPost.content : content}
              onChange={(e) => editingPost ? 
                setEditingPost({...editingPost, content: e.target.value}) : 
                setContent(e.target.value)}
              rows={8}
              className="bg-white/5"
            />
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="/path/to/image.jpg"
                value={editingPost ? editingPost.image : imageUrl}
                onChange={(e) => editingPost ? 
                  setEditingPost({...editingPost, image: e.target.value}) : 
                  setImageUrl(e.target.value)}
                className="bg-white/5 flex-1"
              />
              <Button variant="outline" className="shrink-0">
                <Image className="w-4 h-4 mr-2" />
                Media
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {editingPost ? (
              <>
                <Button variant="outline" onClick={() => setEditingPost(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdatePost(editingPost)}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={handleCreatePost}>
                Create Post
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-center text-gray-400 py-4">No blog posts yet</p>
            ) : (
              posts.map(post => (
                <div key={post.id} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{post.content}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setEditingPost(post)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      post.published ? 'bg-green-800 text-green-200' : 'bg-gray-700 text-gray-300'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublish(post)}
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
