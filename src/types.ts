export interface Category {
  title: string;
  questions: Question[];
}

export interface Question {
  value: number;
  question: string;
  answer: string;
  media?: {
    type: 'image' | 'video' | 'audio' | 'youtube';
    url: string;
  };
  revealed: boolean;
}

export interface Team {
  name: string;
  score: number;
}

export interface GameState {
  categories: Category[];
  currentQuestion: {
    categoryIndex: number;
    questionIndex: number;
  } | null;
  showAnswer: boolean;
  teams: Team[];
}