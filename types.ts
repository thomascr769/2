export interface Song {
  title: string;
  artist: string;
  url: string; // URL to mp3
  coverUrl: string;
}

export interface Photo {
  id: number;
  url: string;
  caption: string;
  albumImages: string[]; // Array of 3 images for the album view
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  successMessage: string;
}

export enum AppSection {
  HERO = 'HERO',
  GALLERY = 'GALLERY',
  QUIZ = 'QUIZ',
  CLEANING = 'CLEANING',
  LETTER = 'LETTER'
}