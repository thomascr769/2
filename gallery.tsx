import React, { useState } from 'react';
import { Photo } from '../types';
import { ChevronLeft, Maximize2, X, ArrowRight } from 'lucide-react';

interface GalleryProps {
  photos: Photo[];
  onNext: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ photos, onNext }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<Photo | null>(null);

  const openAlbum = (photo: Photo) => {
    setSelectedAlbum(photo);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <>
      <div className="p-4 py-8 max-w-md mx-auto mb-16">
        <h2 className="text-3xl font-script text-dental-600 mb-2 text-center">Our Memories</h2>
        <p className="text-center text-slate-400 text-sm mb-6">Tap an album to see more</p>
        
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <button 
              key={photo.id} 
              onClick={() => openAlbum(photo)}
              className={`relative rounded-xl overflow-hidden shadow-lg group bg-slate-100 cursor-pointer text-left transition-transform duration-300 hover:scale-[1.02] ${index % 3 === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
            >
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              
              {/* Icon */}
              <div className="absolute top-2 right-2 bg-white/30 backdrop-blur-sm p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                 <Maximize2 size={16} />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                <p className="text-white font-bold drop-shadow-md text-sm">{photo.caption}</p>
                <p className="text-white/80 text-xs">{photo.albumImages.length} photos</p>
              </div>
            </button>
          ))}
        </div>

        {/* Next Button Section */}
        <div className="mt-12 flex justify-center">
            <button
                onClick={onNext}
                className="group relative px-8 py-4 bg-gradient-to-r from-dental-500 to-dental-600 text-white rounded-full font-bold shadow-xl shadow-dental-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
                <span>Continue</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>

      {/* Full Screen Album Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-[60] bg-black/95 animate-in fade-in duration-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
            <button 
              onClick={closeAlbum}
              className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h3 className="text-white font-bold text-lg drop-shadow-md">{selectedAlbum.caption}</h3>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar snap-y snap-mandatory pt-20 pb-20">
             <div className="max-w-md mx-auto px-4 space-y-4">
                 {/* Cover Image */}
                 <div className="snap-center rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
                     <img src={selectedAlbum.url} alt="Cover" className="w-full h-auto" />
                 </div>
                 
                 {/* Album Images */}
                 {selectedAlbum.albumImages.map((img, idx) => (
                    <div key={idx} className="snap-center rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
                       <img src={img} alt={`Memory ${idx + 1}`} className="w-full h-auto" />
                    </div>
                 ))}
             </div>
             
             <div className="text-center mt-8 mb-8 text-white/50 text-sm">
                 End of album
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;