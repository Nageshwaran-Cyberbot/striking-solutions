
# DigitalStrike Marketing Agency Website

## Admin Panel Guide

### Accessing the Admin Panel

1. Sign in with an admin account (any email containing "admin" will work for the demo)
2. Navigate to the `/admin` route 

### Managing Blog Content

The blog management section allows you to:
- Create new blog posts with titles, content, and featured images
- Edit existing blog posts
- Publish or unpublish posts to control visibility
- Delete unwanted posts

### Managing Instagram Feed

The Instagram feed management allows you to:
- Add new Instagram posts with images and captions
- Edit existing posts
- Delete posts from your feed
- View engagement metrics (demo only)

### Media Management

Upload and manage media assets:
- Upload images and videos
- Organize your media library
- Use uploaded media in your blog posts and Instagram feed
- Reference media files in your content

## Adding Custom Images and Videos

### Option 1: Using the Admin Panel

1. Go to the Admin Panel > Media tab
2. Use the upload form to add images and videos
3. Access uploaded files in the Media Library
4. Reference them in your content using the provided URLs

### Option 2: Adding Files Directly to the Project

1. Add your images and videos to the public folder
2. Reference them in your content using paths like `/your-image.jpg`

## Customization Points

### Adding Social Media Links

Edit the Footer component to add or modify social media links.

### Updating Contact Information

Edit the ContactSection component to update your business details.

### Modifying Services

Edit the ServicesSection component to change your service offerings.

## Technical Notes

- The website uses React with TypeScript
- Styling is implemented with Tailwind CSS
- UI components are from Shadcn UI library
- For demonstration purposes, data is stored locally (in a production environment, connect to a database)
