
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface BackgroundProps {
  type?: 'particles' | 'image' | 'video';
  mediaUrl?: string;
}

export const EventsBackground = ({ type = 'particles', mediaUrl }: BackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  useEffect(() => {
    // If using image or video background, don't setup three.js
    if (type === 'image' || type === 'video') return;
    
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add particles with updated properties
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2500; // Increased particle count
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60; // Increased spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.007, // Slightly larger particles
      color: '#a594f9', // Lighter purple color
      transparent: true,
      opacity: 0.9, // Increased opacity
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Camera position
    camera.position.z = 30;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.0002; // Slower rotation
      particlesMesh.rotation.y += 0.0002;

      // Gentle mouse following
      particlesMesh.rotation.x += mouseY * 0.01;
      particlesMesh.rotation.y += mouseX * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [type]);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {type === 'image' && mediaUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: `url(${mediaUrl})`,
            opacity: 0.6
          }}
        />
      )}
      
      {type === 'video' && mediaUrl && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={handleVideoLoaded}
          style={{ opacity: isVideoLoaded ? 0.6 : 0 }}
        >
          <source src={mediaUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
