import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, ArrowRight, Sparkles, Moon, Heart } from 'lucide-react';
import { QuizQuestion } from '../types';
import { 
  TERRACE_MOMENT_IMAGE, 
  TERRACE_MOMENT_AUDIO, 
  FINAL_SURPRISE_IMAGE, 
  FINAL_SURPRISE_AUDIO 
} from '../constants';

// Simple Tooth Icon
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

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
  onMemoryStart: () => void;
  onMemoryEnd: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, onMemoryStart, onMemoryEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  
  // Special Memory States
  const [activeMemory, setActiveMemory] = useState<'terrace' | 'final' | null>(null);
  const specialAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Animation state for the "cleaning" effect
  const [cleanEffect, setCleanEffect] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle the special memory timer and audio
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (activeMemory) {
      // Only pause music and play special audio if it is NOT the terrace memory
      // Terrace memory is now visual-only
      if (activeMemory === 'final') {
          onMemoryStart();
          if (specialAudioRef.current) {
            specialAudioRef.current.currentTime = 0;
            specialAudioRef.current.volume = 1.0;
            specialAudioRef.current.play().catch(e => console.log("Audio play failed", e));
          }
      }

      // Duration: 10s for Terrace, 15s for Final
      const duration = activeMemory === 'terrace' ? 10000 : 15000;

      timer = setTimeout(() => {
        // Fade out audio slightly
        if (specialAudioRef.current) {
            specialAudioRef.current.pause();
        }
        
        const wasMemory = activeMemory;
        setActiveMemory(null);
        
        // Only resume BG music if we paused it (for final)
        if (wasMemory === 'final') {
             onMemoryEnd(); 
        }

        if (wasMemory === 'terrace') {
             // Move to next question after Terrace
             if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsCorrect(null);
             }
        } else if (wasMemory === 'final') {
             // Complete quiz after Final
             onComplete();
        }
        
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (specialAudioRef.current) specialAudioRef.current.pause();
    };
  }, [activeMemory, onMemoryStart, onMemoryEnd, onComplete, currentQuestionIndex, questions.length]);

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; 

    setSelectedOption(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    // Trigger sparkle/clean animation
    setCleanEffect(true);
    setTimeout(() => setCleanEffect(false), 1000);
    
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    // Check for "Where did we first meet?" (ID 4) -> Trigger Terrace Memory
    if (currentQuestion.id === 4) {
       setActiveMemory('terrace');
       return;
    }

    // Check if this is the Last Question (ID 6 - Anniversary) -> Trigger Final Memory
    if (currentQuestionIndex === questions.length - 1) {
       setActiveMemory('final');
       return;
    }

    // Normal flow
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      // Fallback
      onComplete();
    }
  };

  // --- MEMORY OVERLAY RENDER ---
  if (activeMemory) {
    const isTerrace = activeMemory === 'terrace';
    const imageSrc = isTerrace ? TERRACE_MOMENT_IMAGE : FINAL_SURPRISE_IMAGE;
    // Only set audio source for final, leaving terrace blank to avoid loading
    const audioSrc = isTerrace ? "" : FINAL_SURPRISE_AUDIO; 
    const title = isTerrace ? "It all started under the moon..." : "And our journey continues...";
    const subtitle = isTerrace ? "Just you, me, and the stars." : "Every moment with you is a gift.";
    const Icon = isTerrace ? Moon : Heart;
    const iconColor = isTerrace ? "text-yellow-200" : "text-valentine-500";
    const animDuration = isTerrace ? '12s' : '17s'; // Slightly longer than timeout to ensure coverage

    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden animate-in fade-in duration-1000">
        <audio ref={specialAudioRef} src={audioSrc} />
        
        {/* Background Image with Slow Zoom Animation */}
        <div className="absolute inset-0">
          <img 
            src={imageSrc} 
            alt="Special Memory" 
            className="w-full h-full object-cover opacity-80 animate-ken-burns"
            style={{ animation: `kenburns ${animDuration} linear forwards` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 text-center p-8 max-w-lg mx-auto">
          <div className="mb-6 animate-float">
             <Icon size={64} className={`${iconColor} mx-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`} />
          </div>
          <h2 className="text-4xl md:text-5xl font-script text-white mb-4 drop-shadow-lg animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-500 fill-mode-forwards opacity-0">
            {title}
          </h2>
          <p className="text-slate-200 text-lg italic animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-1000 fill-mode-forwards opacity-0">
            {subtitle}
          </p>
        </div>

        {/* Custom Keyframe for Ken Burns */}
        <style>{`
          @keyframes kenburns {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
          }
        `}</style>
      </div>
    );
  }

  // --- NORMAL QUIZ RENDER ---
  return (
    <div className="p-6 max-w-md mx-auto min-h-[60vh] flex flex-col justify-center relative">
      
      {/* Cleaning Sparkle Animation Overlay */}
      {cleanEffect && (
         <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
             <div className="animate-sparkle text-yellow-400 absolute top-1/4 left-1/4"><Sparkles size={32} /></div>
             <div className="animate-sparkle text-dental-400 absolute bottom-1/3 right-1/4" style={{ animationDelay: '0.1s' }}><Sparkles size={24} /></div>
             <div className="animate-sparkle text-white absolute top-1/2 right-10" style={{ animationDelay: '0.2s' }}><Sparkles size={40} /></div>
         </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-dental-600 text-sm font-bold tracking-widest uppercase">
            Question {currentQuestionIndex + 1} / {questions.length}
          </span>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <ToothIcon size={12} />
            <span>Score: {score}</span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-dental-400 to-dental-300 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mt-6 leading-tight">
          {currentQuestion.question}
        </h2>
      </div>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => {
          let optionClass = "w-full p-4 rounded-xl text-left font-medium transition-all duration-300 border-2 shadow-sm ";
          
          if (selectedOption === null) {
            optionClass += "bg-white border-white hover:border-dental-300 hover:bg-dental-50 text-slate-700";
          } else if (index === currentQuestion.correctAnswer) {
             optionClass += "bg-green-50 border-green-400 text-green-800";
          } else if (index === selectedOption && !isCorrect) {
             optionClass += "bg-red-50 border-red-400 text-red-800";
          } else {
             optionClass += "bg-slate-100 border-transparent opacity-50 text-slate-400";
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
              className={optionClass}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedOption !== null && index === currentQuestion.correctAnswer && <CheckCircle size={20} className="text-green-500 animate-bounce" />}
                {selectedOption === index && !isCorrect && <XCircle size={20} className="text-red-500" />}
              </div>
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className={`rounded-xl p-4 mb-4 border-l-4 shadow-sm ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
             <p className="text-slate-700 italic flex items-start gap-2">
               {isCorrect ? <Sparkles className="text-yellow-400 flex-shrink-0 mt-1" size={16}/> : null}
               <span>
                   <span className="font-bold not-italic mr-1 text-slate-900">{isCorrect ? "Spot on!" : "Needs scaling!"}</span> 
                   {currentQuestion.successMessage}
               </span>
             </p>
          </div>
          <button
            onClick={handleNext}
            className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish Checkup" : "Next Question"}
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;