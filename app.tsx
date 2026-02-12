import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Hero from './components/hero';
import Gallery from './components/gallery';
import AudioPlayer from './components/audioplayer';
import Quiz from './components/quiz';
import TeethCleaning from './components/teethcleaning';
import MouthTransition from './components/mouthtransition';
import { BACKGROUND_MUSIC, ROMANTIC_LETTER_MUSIC, PHOTOS, QUIZ_QUESTIONS, PARTNER_NAME } from './constants';
import { AppSection } from './types';

// Simple Tooth for Background
const ToothBg: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 2C6 2.5 4 5 4 9C4 14 6 16 6 16C6 16 6 18 8 20C9.5 21.5 11 20 12 18C13 20 14.5 21.5 16 20C18 18 18 16 18 16C18 16 20 14 20 9C20 5 18 2.5 16 2C14.5 1.5 13 3 12 5C11 3 9.5 1.5 8 2Z" />
  </svg>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HERO);
  const [isMouthOpen, setIsMouthOpen] = useState(true);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(BACKGROUND_MUSIC);

  const startExperience = () => {
    // Start music on first interaction
    setIsPlaying(true);
    
    // 1. Close the mouth
    setIsMouthOpen(false);

    // 2. Wait for close animation (700ms), then switch content
    setTimeout(() => {
        setActiveSection(AppSection.QUIZ);
        window.scrollTo({ top: 0, behavior: 'auto' }); // Instant scroll while hidden
        
        // 3. Wait a little moment while closed, then open
        setTimeout(() => {
            setIsMouthOpen(true);
        }, 500);
    }, 750);
  };

  const handleQuizComplete = () => {
    // Keep first song playing for Gallery (as requested)
    // Removed: setCurrentSong(GALLERY_MUSIC);
    setIsPlaying(true);

    setActiveSection(AppSection.GALLERY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCleaning = () => {
    // Change song after Gallery continue button is clicked
    setCurrentSong(ROMANTIC_LETTER_MUSIC);
    setIsPlaying(true);
    
    setActiveSection(AppSection.CLEANING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCleaningComplete = () => {
     setActiveSection(AppSection.LETTER);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback to pause background music when special memory plays in Quiz
  const handleMemoryStart = () => {
    setIsPlaying(false);
  };

  // Callback to resume background music when special memory ends
  const handleMemoryEnd = () => {
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24 font-sans selection:bg-dental-200 selection:text-dental-900 overflow-hidden transition-colors duration-500">
      
      {/* Dental Transition Overlay */}
      <MouthTransition isOpen={isMouthOpen} />

      {/* Background Ambience - Light Theme Pastels */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Minty fresh blob */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-dental-200/40 rounded-full blur-[80px]"></div>
        {/* Soft pink blob */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-valentine-200/40 rounded-full blur-[80px]"></div>
        
        {/* Floating Teeth Background - Subtle */}
        <ToothBg className="absolute top-[20%] right-[10%] w-16 h-16 text-dental-300 opacity-20 animate-float" style={{ animationDuration: '8s' }} />
        <ToothBg className="absolute bottom-[30%] left-[5%] w-24 h-24 text-valentine-300 opacity-20 animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }} />
        <ToothBg className="absolute top-[60%] right-[20%] w-12 h-12 text-slate-300 opacity-20 animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col">
        
        {activeSection === AppSection.HERO && (
          <Hero onStart={startExperience} partnerName={PARTNER_NAME} />
        )}

        {activeSection === AppSection.QUIZ && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <Quiz 
               questions={QUIZ_QUESTIONS} 
               onComplete={handleQuizComplete} 
               onMemoryStart={handleMemoryStart}
               onMemoryEnd={handleMemoryEnd}
             />
          </div>
        )}

        {activeSection === AppSection.GALLERY && (
           <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
             {/* Header when inside the main content */}
             <div className="p-6 text-center border-b border-slate-200 bg-white/60 backdrop-blur-md sticky top-0 z-40 shadow-sm">
               <h1 className="font-script text-3xl text-valentine-500 drop-shadow-sm">Smiles We Share</h1>
             </div>

             <div className="flex flex-col gap-4">
                <Gallery photos={PHOTOS} onNext={handleGoToCleaning} />
             </div>
           </div>
        )}

        {activeSection === AppSection.CLEANING && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 flex-1 flex flex-col justify-center">
                 <TeethCleaning onComplete={handleCleaningComplete} />
            </div>
        )}

        {activeSection === AppSection.LETTER && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 p-6 flex flex-col items-center justify-center min-h-[80vh]">
                <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-valentine-100 relative max-w-sm w-full transform rotate-1">
                   {/* Decorative Tape */}
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-dental-200/50 rotate-[-2deg] block"></div>

                   <h2 className="font-script text-4xl text-valentine-600 mb-6 text-center">My Dearest...</h2>
                   
                   <div className="text-slate-700 leading-relaxed font-medium text-sm md:text-base space-y-4 mb-8 overflow-y-auto max-h-[60vh]">
                       <p>
                           From the moment we met, you became the reason my world is brighter. 
                           Like a perfectly polished smile, you light up every room you enter, and I find myself lucky just to be in your orbit.
                       </p>
                       <p>
                           I admire your dedication, your kindness, and the way you care for others. 
                           You are my cavity-free sweetness in a sometimes bitter world, my permanent implant that I never want to lose.
                       </p>
                       <p>
                           Thank you for every laugh, every song, and every memory we've built. 
                           I promise to always keep our love fresh, strong, and plaque-free.
                           You are not just my Valentine, but my best friend and my future.
                       </p>
                       <p>
                           I love you more than words (or dental puns) could ever say.
                       </p>
                   </div>

                   <p className="font-script text-3xl text-right text-dental-600">
                       Happy Valentine's Day! ❤️
                   </p>
                   
                   <div className="absolute -bottom-4 -right-4 text-valentine-300 animate-bounce">
                       <Heart size={48} fill="currentColor" />
                   </div>
                </div>
                
                <p className="mt-12 text-sm text-slate-400">Forever & Always</p>
            </div>
        )}

      </div>

      {/* Persistent Audio Player */}
      <AudioPlayer 
        song={currentSong} 
        isPlaying={isPlaying} 
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      />
    </div>
  );
};

export default App;