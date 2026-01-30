
import React from 'react';
import { UserProfile } from '../types';


interface UserStatsProps {
  profile: UserProfile;
  onClick?: () => void;
}

export const UserStats: React.FC<UserStatsProps> = ({ profile, onClick }) => {
  const xpForNextLevel = 1000; // This mimics the simple logic in original code
  const progress = (profile.xp % xpForNextLevel) / xpForNextLevel * 100;

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 md:gap-4 bg-slate-900 hover:bg-slate-800 p-1.5 md:p-2 rounded-lg border border-slate-800 hover:border-aws-orange/50 shadow-sm hover:shadow-aws-orange/20 transition-all duration-300 cursor-pointer"
    >
      {/* Mobile: Hidden, Desktop: Visible details */}
      <div className="hidden md:flex flex-col items-end">
        <div className="text-xs text-slate-400 group-hover:text-slate-300 font-semibold uppercase transition-colors">Level {profile.level}</div>
        <div className="font-bold text-white text-sm group-hover:text-aws-orange transition-colors">Apprentice</div>
      </div>

      {/* Hexagon Level Badge */}
      <div className="relative">
        <div className="absolute inset-0 bg-aws-orange blur opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full"></div>
        <div className="relative w-8 h-8 md:w-10 md:h-10 bg-aws-orange text-slate-900 font-bold flex items-center justify-center rounded hexagon clip-path-polygon text-sm md:text-base shadow-inner transform group-hover:scale-110 transition-transform duration-300">
          {profile.level}
        </div>
      </div>

      {/* XP Bar: Compact on mobile */}
      <div className="flex flex-col w-20 md:w-32 text-left">
        <div className="flex justify-between text-[8px] md:text-[10px] text-slate-400 mb-1">
          <span className="font-bold group-hover:text-white transition-colors">XP</span>
          <span className="group-hover:text-white transition-colors">{profile.xp} / {profile.level * 1000}</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden border border-transparent group-hover:border-slate-700 transition-colors">
          <div className="h-full bg-aws-orange group-hover:bg-gradient-to-r group-hover:from-aws-orange group-hover:to-orange-400 transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Streak: Compact with Icon */}
      <div className="pl-2 md:pl-4 border-l border-slate-800 flex items-center justify-center">
        <div className="text-center group-hover:animate-pulse">
          <div className="text-sm md:text-lg leading-none transform group-hover:scale-125 transition-transform duration-300">🔥</div>
          <div className="text-[9px] md:text-[10px] text-slate-400 font-mono mt-0.5">{profile.streak}<span className="hidden md:inline"> DAYS</span></div>
        </div>
      </div>
    </button>
  );
};
