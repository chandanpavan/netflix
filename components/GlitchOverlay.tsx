import React from 'react';

export const GlitchOverlay: React.FC = () => {
  return (
    <>
      <div className="scanlines pointer-events-none fixed inset-0 z-50"></div>
      <div className="crt-flicker pointer-events-none fixed inset-0 z-40"></div>
      <div className="fixed inset-0 pointer-events-none z-30 opacity-10 mix-blend-overlay bg-noise"></div>
    </>
  );
};

export const CRTButton: React.FC<{ 
  onClick: () => void; 
  children: React.ReactNode; 
  className?: string;
  active?: boolean;
}> = ({ onClick, children, className = '', active = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-2 uppercase font-mono tracking-widest text-sm
        transition-all duration-200 border
        ${active 
          ? 'border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
          : 'border-white/20 text-gray-400 hover:text-white hover:border-white'
        }
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
      )}
    </button>
  );
};
