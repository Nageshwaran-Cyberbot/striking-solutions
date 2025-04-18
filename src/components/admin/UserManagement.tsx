
import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/models/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Users, UserPlus, Pencil, Trash2, UserCheck } from "lucide-react";

export function UserManagement() {
  const { users, addUser, updateUser, deleteUser, isAdmin } = useAuth();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    password: '',
    isAdmin: false
  });
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  const handleAddUser = async () => {
    try {
      if (!newUser.email || !newUser.password) {
        toast({
          title: "Validation Error",
          description: "Email and password are required",
          variant: "destructive",
        });
        return;
      }
      
      await addUser({
        email: newUser.email,
        name: newUser.name,
        isAdmin: newUser.isAdmin
      }, newUser.password);
      
      setNewUser({
        email: '',
        name: '',
        password: '',
        isAdmin: false
      });
      
      setIsAddUserOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add user",
        variant: "destructive",
      });
    }
  };
  
  const handleEditUser = async () => {
    try {
      if (!editingUser) return;
      
      await updateUser(editingUser.id, {
        name: editingUser.name,
        isAdmin: editingUser.isAdmin
      });
      
      setIsEditUserOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteUser = async () => {
    try {
      if (!userToDelete) return;
      
      await deleteUser(userToDelete.id);
      setIsDeleteUserOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete user",
        variant: "destructive",
      });
    }
  };
  
  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setIsEditUserOpen(true);
  };
  
  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setIsDeleteUserOpen(true);
  };
  
  if (!isAdmin) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Unauthorized Access</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You need administrator privileges to access this section.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage your platform users</p>
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="user@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  id="isAdmin"
                  checked={newUser.isAdmin}
                  onCheckedChange={(checked) => setNewUser({...newUser, isAdmin: checked})}
                />
                <Label htmlFor="isAdmin">Administrator</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            {users.length} user{users.length !== 1 ? 's' : ''} registered
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-brand/20 p-2">
                    <Users className="w-4 h-4 text-brand" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name || 'Unnamed User'}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {user.isAdmin && (
                        <span className="bg-brand/20 text-brand text-xs px-2 py-0.5 rounded-full">
                          Admin
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                      {user.lastLogin && (
                        <span className="text-xs text-gray-400">
                          Last login: {new Date(user.lastLogin).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openEditDialog(user)}
                    disabled={user.isAdmin && users.filter(u => u.isAdmin).length === 1}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openDeleteDialog(user)}
                    disabled={user.isAdmin}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {users.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <p>No users found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  value={editingUser.email}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input 
                  id="edit-name" 
                  value={editingUser.name || ''}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  id="edit-isAdmin"
                  checked={editingUser.isAdmin}
                  onCheckedChange={(checked) => setEditingUser({...editingUser, isAdmin: checked})}
                  disabled={editingUser.isAdmin && users.filter(u => u.isAdmin).length === 1}
                />
                <Label htmlFor="edit-isAdmin">Administrator</Label>
                {editingUser.isAdmin && users.filter(u => u.isAdmin).length === 1 && (
                  <span className="text-xs text-gray-400 ml-2">
                    (Cannot remove admin status: need at least one admin)
                  </span>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          {userToDelete && (
            <div className="py-4">
              <p>Are you sure you want to delete the user "{userToDelete.name || userToDelete.email}"?</p>
              <p className="text-sm text-gray-400 mt-2">This action cannot be undone.</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteUser}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
