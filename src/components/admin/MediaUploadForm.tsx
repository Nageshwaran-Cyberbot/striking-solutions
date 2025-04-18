
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { X, Upload, FileImage, Video } from "lucide-react";

interface MediaUploadFormProps {
  onUploadComplete?: (urls: string[]) => void;
}

const MediaUploadForm = ({ onUploadComplete }: MediaUploadFormProps) => {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setMediaFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeMediaFile = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleUpload = () => {
    if (mediaFiles.length === 0) return;
    
    setUploading(true);
    // Simulate upload process
    setTimeout(() => {
      // In a real application, you would upload to your server or storage service
      const uploadedUrls = mediaFiles.map(file => URL.createObjectURL(file));
      
      setUploading(false);
      setMediaFiles([]);
      
      toast({
        title: "Upload successful",
        description: `${mediaFiles.length} files uploaded successfully.`,
      });
      
      if (onUploadComplete) {
        onUploadComplete(uploadedUrls);
      }
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
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
          
          <Button 
            className="w-full" 
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      )}
      
      <div className="text-sm text-gray-400 mt-4">
        <p>Need to add custom images or videos?</p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Upload them using this form or directly to your project</li>
          <li>Access uploaded files in the Media Library</li>
          <li>Reference them using their URLs in your content</li>
        </ol>
      </div>
    </div>
  );
};

export default MediaUploadForm;
