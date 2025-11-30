import { Movie } from "./types";

export const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Stranger Echoes",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.",
    thumbnail: "https://picsum.photos/seed/stranger/400/225",
    match: 98,
    year: 2024,
    genre: "Sci-Fi Horror"
  },
  {
    id: 2,
    title: "The Crowned",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
    thumbnail: "https://picsum.photos/seed/crown/400/225",
    match: 95,
    year: 2023,
    genre: "Drama"
  },
  {
    id: 3,
    title: "Cyberpunk: Edgerunners",
    description: "In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become a mercenary outlaw.",
    thumbnail: "https://picsum.photos/seed/cyber/400/225",
    match: 99,
    year: 2022,
    genre: "Anime"
  },
  {
    id: 4,
    title: "Dark Mirror",
    description: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
    thumbnail: "https://picsum.photos/seed/mirror/400/225",
    match: 97,
    year: 2021,
    genre: "Sci-Fi"
  },
  {
    id: 5,
    title: "Wednesday's Child",
    description: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and enemies.",
    thumbnail: "https://picsum.photos/seed/wed/400/225",
    match: 96,
    year: 2022,
    genre: "Fantasy"
  }
];

export const CORRUPTED_MOVIES: Movie[] = [
  {
    id: 101,
    title: "NULL_PTR_EXCEPTION",
    description: "The system is bleeding. Can you hear the data screaming? 01010101",
    thumbnail: "https://picsum.photos/seed/glitch1/400/225",
    match: 0,
    year: 1970,
    genre: "FATAL ERROR",
    isCorrupted: true
  },
  {
    id: 102,
    title: "D E A D  S I G N A L",
    description: "They are watching you through the screen. Don't blink. Don't breathe.",
    thumbnail: "https://picsum.photos/seed/glitch2/400/225",
    match: 66,
    year: 666,
    genre: "HORROR",
    isCorrupted: true
  },
  {
    id: 103,
    title: "SYSTEM_PURGE",
    description: "Initiating global reset. Humanity.exe has stopped working.",
    thumbnail: "https://picsum.photos/seed/glitch3/400/225",
    match: 100,
    year: 9999,
    genre: "REALITY",
    isCorrupted: true
  }
];
