import { Photo, QuizQuestion, Song } from './types';

export const PARTNER_NAME = "My Favorite Future Dentist";

// --- CUSTOMIZE IMAGES HERE ---

export const PROFILE_PICTURE = "https://picsum.photos/400/400?random=1"; 

// Replace this with your specific teeth image if you have one locally
// e.g., "/assets/teeth_photo.jpg"
export const TEETH_IMAGE_SRC = "https://img.freepik.com/free-vector/human-mouth-with-teeth_1308-44445.jpg?w=800";

export const BACKGROUND_MUSIC: Song = {
  title: "Can't Help Falling in Love",
  artist: "Elvis Presley",
  url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Clair_de_lune_%28Debussy%29_Suite_bergamasque.ogg", // Placeholder
  coverUrl: "https://picsum.photos/100/100?grayscale"
};

// New Song for the Cleaning/Letter section
export const ROMANTIC_LETTER_MUSIC: Song = {
  title: "A Thousand Years",
  artist: "Christina Perri",
  // Placeholder URL
  url: "https://cdn.pixabay.com/download/audio/2022/02/07/audio_142759d5b4.mp3?filename=piano-moment-11143.mp3",
  coverUrl: "https://picsum.photos/100/100?blur=5"
};

// Deprecated GALLERY_MUSIC as per request, but keeping structure if needed later
export const GALLERY_MUSIC: Song = {
  title: "Perfect",
  artist: "Ed Sheeran", 
  url: "",
  coverUrl: ""
};

// Special Memory Constants
// 1. Terrace Moment (10 Seconds) - Visual Only now
export const TERRACE_MOMENT_IMAGE = "./terrace_memory.png"; 
export const TERRACE_MOMENT_AUDIO = ""; // Audio removed for 4th question

// 2. Final Surprise Moment (15 Seconds)
export const FINAL_SURPRISE_IMAGE = "https://picsum.photos/600/800?random=99"; // Change this to your 15s image
export const FINAL_SURPRISE_AUDIO = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=music-for-videos-piano-moment-11143.mp3"; // Change this to your specific audio

// UPDATED: Album covers are now local paths as requested
export const PHOTOS: Photo[] = [
  { 
    id: 1, 
    url: "./assets/cover1.jpg", // Replace with your local photo
    caption: "The brightest smile",
    albumImages: [
      "https://picsum.photos/600/800?random=101",
      "https://picsum.photos/600/800?random=102",
      "https://picsum.photos/600/800?random=103",
    ]
  },
  { 
    id: 2, 
    url: "./assets/cover2.jpg", // Replace with your local photo
    caption: "Our sweet memories",
    albumImages: [
      "https://picsum.photos/600/800?random=201",
      "https://picsum.photos/600/800?random=202",
      "https://picsum.photos/600/800?random=203",
    ]
  },
  { 
    id: 3, 
    url: "./assets/cover3.jpg", // Replace with your local photo
    caption: "Studying hard",
    albumImages: [
      "https://picsum.photos/600/800?random=301",
      "https://picsum.photos/600/800?random=302",
      "https://picsum.photos/600/800?random=303",
    ]
  },
  { 
    id: 4, 
    url: "./assets/cover4.jpg", // Replace with your local photo
    caption: "Date night",
    albumImages: [
      "https://picsum.photos/600/800?random=401",
      "https://picsum.photos/600/800?random=402",
      "https://picsum.photos/600/800?random=403",
    ]
  },
  { 
    id: 5, 
    url: "./assets/cover5.jpg", // Replace with your local photo
    caption: "Adventures together",
    albumImages: [
      "https://picsum.photos/600/800?random=501",
      "https://picsum.photos/600/800?random=502",
      "https://picsum.photos/600/800?random=503",
    ]
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of these is sweet, but 100% cavity-free?",
    options: ["Chocolate", "Ice Cream", "My love for you", "Soda"],
    correctAnswer: 2,
    successMessage: "Sugar-free and pure love!"
  },
  {
    id: 2,
    question: "What's the 'Root' cause of my happiness?",
    options: ["Video Games", "You", "Pizza", "Sleep"],
    correctAnswer: 1,
    successMessage: "You are the crown jewel of my life."
  },
  {
    id: 3,
    question: "If our love was a procedure, what would it be?",
    options: ["A simple cleaning", "A root canal", "An implant (forever)", "A checkup"],
    correctAnswer: 2,
    successMessage: "Because I want you in my life permanently!"
  },
  {
    id: 4,
    question: "Where did we first meet?",
    options: ["At the Dental Clinic", "My terrace", "Coffee Shop", "College Library"],
    correctAnswer: 1,
    successMessage: "The view was nice, but looking at you was better!"
  },
  // Swapped Order: Anniversary first, then Song
  {
    id: 5,
    question: "When is our anniversary?",
    options: ["14/02/2023", "11/6/2023", "25/12/2023", "11/07/2023"],
    correctAnswer: 1,
    successMessage: "Best day ever!"
  },
  {
    id: 6,
    question: "What was the first song I sang for you?",
    options: ["Choo Lo", "Pehli Nazar Mein", "Tum Hi Ho", "Agar Tum Sath Ho"],
    correctAnswer: 1,
    successMessage: "Baby I love you..."
  }
];