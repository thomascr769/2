import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TEETH_IMAGE_SRC } from '../constants';

interface TeethCleaningProps {
  onComplete: () => void;
}

const TeethCleaning: React.FC<TeethCleaningProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isCleaned, setIsCleaned] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isScrubbing, setIsScrubbing] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const updateSize = () => {
      // Set canvas resolution to match display size
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Redraw the "Plaque" layer
      drawPlaque(ctx, width, height);
    };

    // Delay slightly to ensure image layout is stable
    setTimeout(updateSize, 100);
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Helper to draw the yellow plaque layer
  const drawPlaque = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    ctx.save();
    
    // 1. Base "Plaque" Tint
    ctx.fillStyle = 'rgba(253, 224, 71, 0.6)'; // Yellow-300 with transparency
    ctx.fillRect(0, 0, width, height);
    
    // 2. Add grime/texture for more realism
    // Random dirty spots
    ctx.fillStyle = 'rgba(234, 179, 8, 0.4)'; // Darker yellow/brown
    for(let i=0; i<80; i++) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        const r = 20 + Math.random() * 40;
        ctx.beginPath();
        ctx.arc(rx, ry, r, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
  };

  const handleInteraction = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isCleaned) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setCursorPos({ x, y });
    setShowCursor(true);
    setIsScrubbing(true);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Erase plaque
    // BRUSH SIZE: Smaller size (15) means it takes longer to clean
    const brushSize = 20; 

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalCompositeOperation = 'source-over';
    
    // Check progress periodically (not every frame to save perf)
    if (Math.random() > 0.5) {
       checkProgress(ctx, canvas.width, canvas.height);
    }
    
    // Stop scrubbing animation after a short delay of inactivity
    if ((window as any).scrubTimeout) clearTimeout((window as any).scrubTimeout);
    (window as any).scrubTimeout = setTimeout(() => setIsScrubbing(false), 100);
  };

  const checkProgress = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Sample the center area mostly, as corners might be missed
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let nonTransparentCount = 0;
    
    // Count pixel alpha
    for (let i = 3; i < data.length; i += 16) { // Sample every 4th pixel for speed
      if (data[i] > 20) { // Threshold for "dirty"
        nonTransparentCount++;
      }
    }

    // Threshold calculation:
    // With brush size 20, covering ~300x200 area takes time.
    // Let's assume initially there are roughly (width*height)/sample_rate dirty pixels.
    // We want ~95% clean.
    
    const totalPixels = data.length / 16;
    // Initial fill is full, so approx all pixels have alpha.
    
    // We require the dirty pixel count to be very low.
    // Experimentally, < 2% of total pixels remaining dirty.
    if (nonTransparentCount < (totalPixels * 0.02) && !isCleaned) {
      setProgress(100);
      setIsCleaned(true);
      setShowCursor(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-lg mx-auto p-4 relative">
      <h2 className="text-3xl font-script text-dental-600 mb-2 text-center animate-in fade-in slide-in-from-top-4">
        Time to Brush!
      </h2>
      <p className="text-slate-500 mb-8 text-center text-sm animate-in fade-in slide-in-from-top-4 delay-100">
        Scrub thoroughly! <br/>
        <span className="text-dental-500 font-bold">Remove all the plaque to reveal the smile.</span>
      </p>

      {/* Game Area */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-video bg-white rounded-3xl shadow-xl border-4 border-slate-100 overflow-hidden cursor-none touch-none"
        onMouseMove={(e) => handleInteraction(e.clientX, e.clientY)}
        onTouchMove={(e) => {
            const touch = e.touches[0];
            handleInteraction(touch.clientX, touch.clientY);
        }}
        onMouseLeave={() => setShowCursor(false)}
        style={{ touchAction: 'none' }}
      >
        {/* Background Clean Image */}
        <div className="absolute inset-0 pointer-events-none select-none">
           <img 
             src={TEETH_IMAGE_SRC} 
             alt="Teeth" 
             className="w-full h-full object-cover"
           />
        </div>

        {/* Foreground Plaque Layer (Canvas) */}
        <canvas 
          ref={canvasRef}
          className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isCleaned ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* Custom Toothbrush Cursor */}
        {showCursor && !isCleaned && (
            <div 
                className={`fixed z-50 pointer-events-none text-5xl -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl transition-transform duration-100 ${isScrubbing ? 'animate-scrub' : ''}`}
                style={{ 
                    left: cursorPos.x + (containerRef.current?.getBoundingClientRect().left || 0), 
                    top: cursorPos.y + (containerRef.current?.getBoundingClientRect().top || 0) 
                }}
            >
                🪥
            </div>
        )}

        {/* Sparkles when clean */}
        {isCleaned && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white/20">
                <Sparkles className="text-yellow-400 absolute top-1/4 left-1/4 animate-sparkle" size={48} />
                <Sparkles className="text-dental-400 absolute bottom-1/3 right-1/3 animate-sparkle delay-100" size={56} />
                <Sparkles className="text-white absolute top-1/2 right-1/4 animate-sparkle delay-200" size={32} />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-50 animate-pulse"></div>
            </div>
        )}
      </div>

      {/* Success Message & Next Button */}
      <div className={`mt-8 text-center transition-all duration-700 transform ${isCleaned ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <p className="text-dental-600 font-bold text-2xl mb-4 flex items-center justify-center gap-2 drop-shadow-sm">
              <Sparkles size={24} className="text-yellow-400" /> 
              <span>Pearl White!</span>
          </p>
          <button
            onClick={onComplete}
            className="px-10 py-4 bg-gradient-to-r from-valentine-500 to-valentine-600 text-white rounded-full font-bold shadow-xl shadow-valentine-200 hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
          >
            <span className="text-lg">Read My Letter</span>
            <ArrowRight size={24} />
          </button>
      </div>

      <style>{`
        @keyframes scrub {
            0% { transform: translate(-50%, -50%) rotate(-15deg); }
            50% { transform: translate(-50%, -50%) rotate(15deg); }
            100% { transform: translate(-50%, -50%) rotate(-15deg); }
        }
        .animate-scrub {
            animation: scrub 0.2s infinite linear;
        }
      `}</style>
      
    </div>
  );
};

export default TeethCleaning;