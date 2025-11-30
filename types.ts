export interface Movie {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  match: number;
  year: number;
  genre: string;
  isCorrupted?: boolean;
}

export enum AppMode {
  NORMAL = 'NORMAL',
  INTERFERENCE = 'INTERFERENCE',
  TERMINAL = 'TERMINAL'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
