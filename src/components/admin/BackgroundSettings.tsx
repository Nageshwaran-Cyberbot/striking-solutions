
import React, { useState } from 'react';
import { useBackground } from "@/contexts/BackgroundContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Image, Video, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export function BackgroundSettings() {
  const { backgroundSettings, changeBackground } = useBackground();
  const [settings, setSettings] = useState({
    type: backgroundSettings.type,
    mediaUrl: backgroundSettings.mediaUrl || ''
  });
  
  const handleSave = () => {
    const newSettings = {
      type: settings.type,
      mediaUrl: settings.type !== 'particles' ? settings.mediaUrl : undefined
    };
    
    changeBackground(newSettings);
    
    toast({
      title: "Background updated",
      description: "Your background settings have been saved.",
    });
  };
  
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Background Settings</CardTitle>
        <CardDescription>Customize the site background</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Background Type</Label>
            <RadioGroup
              value={settings.type}
              onValueChange={(value) => setSettings({ ...settings, type: value as 'particles' | 'image' | 'video' })}
              className="grid grid-cols-3 gap-4"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-card/50 p-4 rounded-lg flex items-center justify-center hover:bg-card/70 cursor-pointer">
                  <RadioGroupItem value="particles" id="particles" className="sr-only" />
                  <Label htmlFor="particles" className="cursor-pointer flex flex-col items-center gap-2">
                    <Sparkles className="h-10 w-10" />
                    <span>Particles</span>
                  </Label>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-card/50 p-4 rounded-lg flex items-center justify-center hover:bg-card/70 cursor-pointer">
                  <RadioGroupItem value="image" id="image" className="sr-only" />
                  <Label htmlFor="image" className="cursor-pointer flex flex-col items-center gap-2">
                    <Image className="h-10 w-10" />
                    <span>Image</span>
                  </Label>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-card/50 p-4 rounded-lg flex items-center justify-center hover:bg-card/70 cursor-pointer">
                  <RadioGroupItem value="video" id="video" className="sr-only" />
                  <Label htmlFor="video" className="cursor-pointer flex flex-col items-center gap-2">
                    <Video className="h-10 w-10" />
                    <span>Video</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {settings.type !== 'particles' && (
            <div className="space-y-2">
              <Label htmlFor="mediaUrl">{settings.type === 'image' ? 'Image URL' : 'Video URL'}</Label>
              <div className="flex gap-2">
                <Input
                  id="mediaUrl"
                  value={settings.mediaUrl}
                  onChange={(e) => setSettings({ ...settings, mediaUrl: e.target.value })}
                  placeholder={settings.type === 'image' 
                    ? '/background.jpg or https://example.com/image.jpg'
                    : '/background.mp4 or https://example.com/video.mp4'
                  }
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-gray-400">
                {settings.type === 'image' 
                  ? 'Provide a URL to an image file. For local images, upload them to the public folder and use /imagename.jpg'
                  : 'Provide a URL to a video file. For local videos, upload them to the public folder and use /videoname.mp4'
                }
              </p>
              {settings.mediaUrl && (
                <div className="mt-4 p-2 bg-gray-800/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  {settings.type === 'image' ? (
                    <img 
                      src={settings.mediaUrl} 
                      alt="Background preview"
                      className="h-40 object-cover rounded border border-gray-600 w-full"
                      onError={() => toast({
                        title: "Error loading image",
                        description: "The image URL may be invalid.",
                        variant: "destructive",
                      })}
                    />
                  ) : (
                    <video 
                      src={settings.mediaUrl}
                      className="h-40 object-cover rounded border border-gray-600 w-full"
                      onError={() => toast({
                        title: "Error loading video",
                        description: "The video URL may be invalid.",
                        variant: "destructive",
                      })}
                      controls
                    />
                  )}
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              Save Background Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
