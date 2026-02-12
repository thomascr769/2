import React from 'react';
import { Heart, Guitar } from 'lucide-react';
import { PROFILE_PICTURE } from '../constants';

// Custom Tooth Icon Component
const ToothIcon: React.FC<{ className?: string, size?: number }> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 2C6 2.5 4 5 4 9C4 14 6 16 6 16C6 16 6 18 8 20C9.5 21.5 11 20 12 18C13 20 14.5 21.5 16 20C18 18 18 16 18 16C18 16 20 14 20 9C20 5 18 2.5 16 2C14.5 1.5 13 3 12 5C11 3 9.5 1.5 8 2Z" />
  </svg>
);

interface HeroProps {
  onStart: () => void;
  partnerName?: string;
}

const Hero: React.FC<HeroProps> = ({ onStart, partnerName = "My Love" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 relative overflow-hidden">
      {/* Background decoration - Hearts */}
      <div className="absolute top-10 left-10 text-valentine-300 opacity-60 animate-float">
        <Heart size={48} fill="currentColor" />
      </div>
      <div className="absolute bottom-20 right-10 text-valentine-200 opacity-60 animate-float" style={{ animationDelay: '2s' }}>
        <Heart size={32} fill="currentColor" />
      </div>
      
      {/* Background decoration - Teeth */}
      <div className="absolute top-20 right-20 text-dental-300 opacity-40 animate-float" style={{ animationDelay: '1s' }}>
        <ToothIcon size={56} />
      </div>
      <div className="absolute bottom-40 left-12 text-dental-400 opacity-40 animate-float" style={{ animationDelay: '3s' }}>
        <ToothIcon size={40} />
      </div>

      {/* Profile Image Placeholder */}
      <div className="relative mb-8 group cursor-pointer">
        <div className="absolute -inset-1 bg-gradient-to-r from-dental-300 to-valentine-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
          <img 
            src={PROFILE_PICTURE} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 border-2 border-dental-300 shadow-md">
           <ToothIcon className="text-dental-500" size={24} />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-script text-slate-800 mb-2 drop-shadow-sm">
        Hey there, <span className="text-valentine-500">{partnerName}</span>
      </h1>
      
      <p className="text-slate-600 max-w-xs mb-10 leading-relaxed font-medium">
        You've filled the cavity in my heart. <br/>
        Before we extract some memories, let's take an X-ray of our relationship!
      </p>

      <button
        onClick={onStart}
        className="px-8 py-3 bg-gradient-to-r from-dental-400 to-dental-500 hover:from-dental-500 hover:to-dental-600 text-white rounded-full font-bold shadow-lg shadow-dental-200 transition-all transform hover:scale-105 flex items-center gap-2 relative z-10"
      >
        <ToothIcon size={20} />
        <span>Start The Checkup</span>
      </button>

      {/* Animated Guitar Graphic */}
      <div className="mt-8 text-slate-400 animate-bounce hover:text-valentine-400 transition-colors duration-500">
         <Guitar size={48} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default Hero;