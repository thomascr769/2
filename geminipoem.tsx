import React, { useState } from 'react';
import { Sparkles, Send, PenTool } from 'lucide-react';
import { generateLovePoem } from '../services/geminiService';

interface GeminiPoemProps {
  partnerName: string;
}

const GeminiPoem: React.FC<GeminiPoemProps> = ({ partnerName }) => {
  const [memory, setMemory] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!memory.trim()) return;
    
    setLoading(true);
    const result = await generateLovePoem(memory, partnerName);
    setPoem(result);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto my-12 relative">
       {/* Background "Card" effect */}
      <div className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-dental-100 transform rotate-1"></div>
      
      <div className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-dental-600 border-b border-dental-100 pb-2">
          <Sparkles size={20} />
          <h2 className="text-lg font-bold uppercase tracking-wider">Love Prescription</h2>
        </div>
        
        {!poem ? (
          <div className="space-y-4">
            <p className="text-slate-500 text-sm">
              Patient Name: <span className="font-semibold text-slate-800">{partnerName}</span> <br/>
              Diagnosis: <span className="font-semibold text-slate-800">Acute Lovitis</span> <br/>
              Treatment: <span className="text-slate-500">Enter a memory below to generate a therapeutic poem.</span>
            </p>
            <textarea
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
              placeholder="Rx: That time we..."
              className="w-full p-4 bg-dental-50 rounded-xl text-slate-800 border border-dental-200 focus:border-dental-500 focus:ring-1 focus:ring-dental-500 outline-none resize-none h-32 placeholder-slate-400"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !memory}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                loading || !memory 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-dental-500 to-dental-600 text-white hover:shadow-lg transform active:scale-95'
              }`}
            >
              {loading ? (
                <span className="animate-pulse">Synthesizing...</span>
              ) : (
                <>
                  <Send size={18} />
                  <span>Prescribe Poem</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="animate-float">
            <div className="bg-dental-50 p-6 rounded-xl border border-dental-100 relative">
              <div className="absolute -top-3 -left-2 text-4xl text-dental-200">❝</div>
              <p className="font-script text-xl leading-relaxed text-slate-800 whitespace-pre-line text-center">
                {poem}
              </p>
              <div className="absolute -bottom-6 -right-2 text-4xl rotate-180 text-dental-200">❝</div>
              <div className="mt-4 pt-4 border-t border-dental-200 flex justify-end">
                  <div className="text-xs text-dental-500 font-script text-right">
                      Dr. Love <br/> (AI Assistant)
                  </div>
              </div>
            </div>
            <button 
              onClick={() => setPoem('')}
              className="mt-6 text-sm text-dental-500 underline w-full text-center hover:text-dental-700 flex items-center justify-center gap-1"
            >
              <PenTool size={12}/> Write another prescription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiPoem;