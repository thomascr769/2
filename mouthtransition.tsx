import React from 'react';

interface MouthTransitionProps {
  isOpen: boolean;
}

const MouthTransition: React.FC<MouthTransitionProps> = ({ isOpen }) => {
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col h-screen w-screen overflow-hidden">
      {/* Top Jaw */}
      <div 
        className={`bg-valentine-300 w-full flex-1 flex items-end justify-center transition-transform duration-700 ease-in-out border-b-8 border-valentine-400 shadow-2xl ${isOpen ? '-translate-y-[120%]' : 'translate-y-0'}`}
      >
         {/* Top Teeth */}
         <div className="flex justify-center w-[120%] -mb-[1px]">
             {Array.from({ length: 20 }).map((_, i) => (
                 <div key={`top-${i}`} className="w-8 h-10 md:w-16 md:h-20 bg-slate-50 rounded-b-[1rem] border-x border-b border-slate-200 mx-0.5 shadow-inner flex-shrink-0" />
             ))}
         </div>
      </div>
      
      {/* Message when closed - Hidden when open */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500 delay-300 ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
          <div className="bg-white/90 p-4 rounded-full shadow-xl border-4 border-valentine-400 animate-pulse-slow">
             <h2 className="text-3xl md:text-5xl font-script text-valentine-600 font-bold whitespace-nowrap px-4">
                 Open Wide! 🦷
             </h2>
          </div>
      </div>

      {/* Bottom Jaw */}
      <div 
        className={`bg-valentine-300 w-full flex-1 flex items-start justify-center transition-transform duration-700 ease-in-out border-t-8 border-valentine-400 shadow-2xl ${isOpen ? 'translate-y-[120%]' : 'translate-y-0'}`}
      >
         {/* Bottom Teeth */}
         <div className="flex justify-center w-[120%] -mt-[1px]">
             {Array.from({ length: 20 }).map((_, i) => (
                 <div key={`bot-${i}`} className="w-8 h-10 md:w-16 md:h-20 bg-slate-50 rounded-t-[1rem] border-x border-t border-slate-200 mx-0.5 shadow-inner flex-shrink-0" />
             ))}
         </div>
      </div>
    </div>
  );
};

export default MouthTransition;