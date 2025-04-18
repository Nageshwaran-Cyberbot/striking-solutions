
export interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin?: string;
}

// Initial admin user
export const ADMIN_USER: User = {
  id: "admin-123",
  email: "admin@example.com",
  name: "Admin User",
  isAdmin: true,
  createdAt: new Date().toISOString(),
};

// Default password for admin (in a real app, this would never be hardcoded)
export const ADMIN_PASSWORD = "admin123";

// Initial regular users
export const DEFAULT_USERS: User[] = [
  {
    id: "user-123",
    email: "user@example.com",
    name: "Regular User",
    isAdmin: false,
    createdAt: new Date().toISOString(),
  }
];

// Default password for default user (in a real app, this would never be hardcoded)
export const DEFAULT_USER_PASSWORD = "user123";
