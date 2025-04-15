
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = "primary", 
    size = "md", 
    isLoading = false, 
    icon,
    ...props 
  }, ref) => {
    // Base classes shared by all variants
    const baseClasses = "relative font-medium transition-all duration-300 rounded-xl inline-flex items-center justify-center";
    
    // Classes for different sizes
    const sizeClasses = {
      sm: "py-2 px-3 text-sm",
      md: "py-3 px-6",
      lg: "py-4 px-8 text-lg",
      icon: "p-2 aspect-square"
    };
    
    // Classes for different variants
    const variantClasses = {
      primary: "bg-brand hover:bg-brand/90 text-white shadow-md hover:shadow-neon transform hover:-translate-y-1",
      secondary: "bg-brand-accent hover:bg-brand-accent/90 text-white shadow-md hover:shadow-neon-orange transform hover:-translate-y-1",
      outline: "bg-transparent hover:bg-brand/10 text-brand border border-brand hover:shadow-neon",
      ghost: "bg-transparent hover:bg-brand/10 text-brand",
      link: "bg-transparent text-brand hover:underline p-0 shadow-none"
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          isLoading && "opacity-70 cursor-not-allowed",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"/>
          </span>
        )}
        <span className={cn(isLoading && "opacity-0")}>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

// Additional button style for 3D hover effects
export const Button3D = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative overflow-hidden font-medium rounded-xl perspective-800 transform-style-3d transition-transform duration-300 hover:scale-105",
          size === "sm" ? "py-2 px-3 text-sm" : 
          size === "md" ? "py-3 px-6" : 
          size === "lg" ? "py-4 px-8 text-lg" : 
          size === "icon" ? "p-2 aspect-square" : "",
          variant === "primary" ? "bg-brand text-white shadow-lg hover:shadow-neon" :
          variant === "secondary" ? "bg-brand-accent text-white shadow-lg hover:shadow-neon-orange" : 
          "bg-transparent text-brand border border-brand",
          className
        )}
        {...props}
      >
        <span className="block relative z-10 transform transition-transform duration-300">
          {children}
        </span>
        <span className="absolute inset-0 bg-black/10 transform -translate-z-10 translate-y-8 rotate-x-70 scale-y-50 origin-bottom blur-md"></span>
      </button>
    );
  }
);

Button3D.displayName = "Button3D";

// Glass button with blur effect
export const GlassButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl font-medium py-3 px-6",
          "shadow-md hover:shadow-neon transition-all duration-300 hover:-translate-y-1 text-white",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";

// Animated pulse button for CTA
export const PulseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative bg-brand text-white font-medium py-3 px-6 rounded-xl",
          "shadow-md transition-all duration-300 hover:-translate-y-1",
          "overflow-hidden",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <span className="absolute inset-0 rounded-xl bg-white/20 animate-pulse-glow"></span>
      </button>
    );
  }
);

PulseButton.displayName = "PulseButton";
