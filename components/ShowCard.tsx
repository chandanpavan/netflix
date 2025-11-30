import React from 'react';
import { Movie } from '../types';
import { Play, Plus, ThumbsUp } from 'lucide-react';

interface ShowCardProps {
  movie: Movie;
  glitched?: boolean;
}

export const ShowCard: React.FC<ShowCardProps> = ({ movie, glitched }) => {
  return (
    <div className={`
      group relative flex-none w-[200px] md:w-[280px] aspect-video bg-zinc-800 rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20
      ${glitched ? 'hover:skew-x-2 grayscale hover:grayscale-0' : ''}
    `}>
      <img 
        src={movie.thumbnail} 
        alt={movie.title}
        className={`w-full h-full object-cover transition-opacity duration-300 ${glitched ? 'opacity-50 group-hover:opacity-100' : ''}`}
      />
      
      {/* Hover Info */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
        <div>
          <h3 className={`font-bold text-sm ${glitched ? 'font-mono text-red-500 glitch-effect' : 'text-white'}`} data-text={movie.title}>
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs text-green-400 font-semibold">
            <span>{movie.match}% Match</span>
            <span className="text-gray-400 border border-gray-600 px-1 rounded text-[10px]">HD</span>
            <span className="text-gray-400">{movie.year}</span>
          </div>
          <div className="mt-2 flex gap-2 text-xs text-white">
             {glitched ? <span className="text-red-400">{movie.genre}</span> : <span>{movie.genre}</span>}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button className="bg-white text-black rounded-full p-1.5 hover:bg-gray-200 transition">
            <Play size={12} fill="currentColor" />
          </button>
          <button className="border border-gray-400 text-white rounded-full p-1.5 hover:border-white transition">
            <Plus size={12} />
          </button>
          <button className="border border-gray-400 text-white rounded-full p-1.5 hover:border-white transition">
            <ThumbsUp size={12} />
          </button>
        </div>
      </div>

      {glitched && (
        <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge bg-red-900/20 opacity-0 group-hover:opacity-100 animate-pulse"></div>
      )}
    </div>
  );
};
