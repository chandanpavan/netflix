import React, { useState, useEffect, useRef } from 'react';
import { Play, Info, Bell, Search, User, Zap, Terminal as TerminalIcon } from 'lucide-react';
import { MOCK_MOVIES, CORRUPTED_MOVIES } from './constants';
import { Movie, AppMode } from './types';
import { ShowCard } from './components/ShowCard';
import { GlitchOverlay, CRTButton } from './components/GlitchOverlay';
import { Terminal } from './components/Terminal';
import { generateGlitchTitle } from './services/geminiService';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.NORMAL);
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [heroTitle, setHeroTitle] = useState("Stranger Echoes");
  const [scrolled, setScrolled] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to handle Glitch Mode
  useEffect(() => {
    if (mode === AppMode.INTERFERENCE) {
      const interval = setInterval(() => {
        // Randomly "glitch" the movie list
        const shouldCorrupt = Math.random() > 0.7;
        if (shouldCorrupt) {
           // Swap a random movie for a corrupted one temporarily
           setMovies(prev => {
             const newMovies = [...prev];
             const idx = Math.floor(Math.random() * newMovies.length);
             newMovies[idx] = CORRUPTED_MOVIES[Math.floor(Math.random() * CORRUPTED_MOVIES.length)];
             return newMovies;
           });
        } else {
            // Restore sometimes
            setMovies(MOCK_MOVIES);
        }
      }, 2000);
      
      return () => clearInterval(interval);
    } else {
      setMovies(MOCK_MOVIES);
    }
  }, [mode]);

  const toggleInterference = async () => {
    if (mode === AppMode.NORMAL) {
      setMode(AppMode.INTERFERENCE);
      // Generate a new creepy title for the hero section using Gemini
      const newTitle = await generateGlitchTitle();
      setHeroTitle(newTitle);
    } else {
      setMode(AppMode.NORMAL);
      setHeroTitle("Stranger Echoes");
    }
  };

  const isGlitch = mode === AppMode.INTERFERENCE;

  return (
    <div className={`min-h-screen bg-[#141414] text-white font-sans selection:bg-red-600 selection:text-white ${isGlitch ? 'overflow-hidden' : ''}`}>
      {/* Optional Glitch Effects */}
      {isGlitch && <GlitchOverlay />}
      
      {/* Terminal Modal */}
      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 px-4 md:px-12 py-4 flex items-center justify-between ${scrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="flex items-center gap-8">
          <div className="text-red-600 font-bold text-2xl md:text-3xl tracking-tighter cursor-pointer relative group">
             {isGlitch ? (
               <span className="glitch-effect font-mono" data-text="ERROR_FLIX">ERROR_FLIX</span>
             ) : (
               "STREAMFLIX"
             )}
          </div>
          <ul className="hidden md:flex gap-4 text-sm text-gray-200">
            <li className="hover:text-gray-400 cursor-pointer font-medium">Home</li>
            <li className="hover:text-gray-400 cursor-pointer">TV Shows</li>
            <li className="hover:text-gray-400 cursor-pointer">Movies</li>
            <li className="hover:text-gray-400 cursor-pointer">New & Popular</li>
          </ul>
        </div>

        <div className="flex items-center gap-4 text-white">
          <CRTButton 
            onClick={toggleInterference} 
            active={isGlitch}
            className="hidden md:block"
          >
            {isGlitch ? "STABILIZE" : "INTERFERENCE"}
          </CRTButton>

          {isGlitch && (
             <button 
               onClick={() => setShowTerminal(true)}
               className="text-red-500 hover:text-white animate-pulse"
             >
                <TerminalIcon />
             </button>
          )}

          <Search className="cursor-pointer hover:text-gray-300" size={20} />
          <Bell className="cursor-pointer hover:text-gray-300" size={20} />
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center cursor-pointer">
            <User size={16} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={isGlitch ? "https://picsum.photos/seed/nightmare/1920/1080" : "https://picsum.photos/seed/stranger/1920/1080"} 
            className={`w-full h-full object-cover ${isGlitch ? 'grayscale contrast-125 brightness-50' : 'brightness-75'}`}
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="absolute top-[30%] left-4 md:left-12 max-w-xl z-10">
          <div className={`text-5xl md:text-7xl font-black mb-4 tracking-tight ${isGlitch ? 'text-red-600 font-mono glitch-effect' : 'text-white'}`} data-text={heroTitle}>
            {heroTitle}
          </div>
          
          <div className="flex items-center gap-4 mb-6 text-sm md:text-base font-semibold">
            <span className="text-green-400">98% Match</span>
            <span className="text-gray-300">2024</span>
            <span className="border border-gray-400 px-2 rounded text-xs py-0.5 text-gray-300">TV-MA</span>
            <span className="text-gray-300">Season 4</span>
          </div>

          <p className={`text-lg md:text-xl text-gray-200 mb-8 leading-relaxed drop-shadow-lg ${isGlitch ? 'font-mono text-red-200' : ''}`}>
             {isGlitch 
               ? "THE_SIGNAL_IS_DECAYING. WE_ARE_WATCHING_YOU. DO_NOT_ADJUST_YOUR_DEVICE. THE_ENTITY_HAS_ARRIVED." 
               : "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl."}
          </p>

          <div className="flex gap-4">
            <button className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded flex items-center gap-2 font-bold hover:bg-opacity-80 transition">
              <Play size={24} fill="currentColor" />
              <span>Play</span>
            </button>
            <button className="bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded flex items-center gap-2 font-bold hover:bg-opacity-50 transition backdrop-blur-sm">
              <Info size={24} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="relative z-10 -mt-32 pb-20 px-4 md:px-12 space-y-12">
        <section>
          <h2 className={`text-xl md:text-2xl font-bold mb-4 ${isGlitch ? 'text-red-500 font-mono tracking-widest' : 'text-white'}`}>
             {isGlitch ? "CORRUPTED_FILES" : "Trending Now"}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {movies.map((movie) => (
              <ShowCard key={movie.id} movie={movie} glitched={isGlitch} />
            ))}
          </div>
        </section>

        <section>
          <h2 className={`text-xl md:text-2xl font-bold mb-4 ${isGlitch ? 'text-red-500 font-mono tracking-widest' : 'text-white'}`}>
             {isGlitch ? "SYSTEM_FAILURE" : "Watch It Again"}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
             {[...MOCK_MOVIES].reverse().map((movie) => (
               <ShowCard key={`rev-${movie.id}`} movie={movie} glitched={isGlitch} />
             ))}
          </div>
        </section>

        {isGlitch && (
          <div className="my-20 border border-red-900 bg-red-950/20 p-8 text-center rounded-lg animate-pulse">
             <h3 className="text-3xl font-mono text-red-500 mb-4">CRITICAL SYSTEM ERROR</h3>
             <p className="text-red-300 font-mono mb-6">Unauthorized access detected in sector 7G.</p>
             <button 
               onClick={() => setShowTerminal(true)}
               className="bg-red-600 hover:bg-red-700 text-white font-mono px-6 py-3 rounded uppercase tracking-wider"
             >
               Initiate Debug Protocol
             </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="px-4 md:px-12 py-16 text-gray-500 text-sm bg-black/50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <ul className="space-y-3">
            <li className="hover:underline cursor-pointer">Audio and Subtitles</li>
            <li className="hover:underline cursor-pointer">Media Center</li>
            <li className="hover:underline cursor-pointer">Privacy</li>
          </ul>
          <ul className="space-y-3">
             <li className="hover:underline cursor-pointer">Help Center</li>
             <li className="hover:underline cursor-pointer">Jobs</li>
             <li className="hover:underline cursor-pointer">Cookie Preferences</li>
          </ul>
          <ul className="space-y-3">
             <li className="hover:underline cursor-pointer">Gift Cards</li>
             <li className="hover:underline cursor-pointer">Terms of Use</li>
             <li className="hover:underline cursor-pointer">Corporate Information</li>
          </ul>
          <div className="col-span-2 md:col-span-1">
             <button className="border border-gray-500 px-4 py-2 hover:text-white mb-4">
               Service Code
             </button>
             <p>&copy; 2024 StreamFlix, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
