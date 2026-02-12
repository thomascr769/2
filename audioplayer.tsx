import React, { useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Song } from '../types';

interface AudioPlayerProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ song, isPlaying, onTogglePlay }) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle Play/Pause side effects based on props
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song.url]); // Re-run if playing state or song URL changes

  // Handle Song Change - Auto play if it was already playing
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.load(); // Reload audio element when url changes
        if (isPlaying) {
            audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
        }
    }
  }, [song.url]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 transition-all duration-500">
      <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-3 shadow-xl flex items-center gap-3 ring-1 ring-slate-100">
        {/* Cover Art */}
        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 border-valentine-300 flex-shrink-0 shadow-sm ${isPlaying ? 'animate-spin-slow' : ''}`}>
           <img src={song.coverUrl} alt="Album Art" className="w-full h-full object-cover" />
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-800 font-bold text-sm truncate">{song.title}</h3>
          <p className="text-slate-500 text-xs truncate">{song.artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
           <button 
            onClick={toggleMute}
            className="p-2 text-slate-400 hover:text-dental-600 transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button 
            onClick={onTogglePlay}
            className="w-10 h-10 bg-valentine-400 hover:bg-valentine-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-valentine-200 transition-transform active:scale-95"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
          </button>
        </div>
      </div>
      
      <audio ref={audioRef} src={song.url} loop />
      
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;