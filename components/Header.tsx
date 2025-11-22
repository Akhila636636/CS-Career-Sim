
import React from 'react';
import { View } from '../types';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { HomeIcon } from './icons/HomeIcon';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { GameControllerIcon } from './icons/GameControllerIcon';

interface HeaderProps {
    onNavigate: (view: View) => void;
    onLogout: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    isGamified: boolean;
    onToggleGamified: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onLogout, theme, onToggleTheme, isGamified, onToggleGamified }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-card-bg/30 backdrop-blur-sm border-b border-secondary-text/20 h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 transition-all duration-300">
            <div 
                className="flex items-center cursor-pointer group"
                onClick={() => onNavigate('dashboard')}
            >
                <BriefcaseIcon className="w-8 h-8 text-accent group-hover:animate-pulse" />
                <span className="hidden sm:block ml-3 text-xl font-bold text-primary-text group-hover:text-accent transition-colors">
                    {isGamified ? 'CS Quest' : 'CS Career Sim'}
                </span>
            </div>
            <nav className="flex items-center gap-1 sm:gap-2">
                <button
                    onClick={onToggleGamified}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isGamified ? 'bg-accent text-primary-text shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-2 border-primary-text' : 'text-primary-text hover:bg-card-bg/50 hover:text-accent'}`}
                    aria-label="Toggle Gamified Mode"
                    title={isGamified ? "Switch to Professional Mode" : "Switch to Gamified Mode"}
                >
                    <GameControllerIcon className="w-5 h-5" />
                    <span className="hidden md:block text-sm font-semibold">{isGamified ? 'Lv.1' : 'Gamify'}</span>
                </button>

                <div className="w-px h-6 bg-secondary-text/20 mx-1"></div>

                <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-primary-text hover:bg-card-bg/50 hover:text-accent transition-colors"
                    aria-label="Go to dashboard"
                >
                    <HomeIcon className="w-5 h-5" />
                    <span className="hidden sm:block text-sm font-semibold">Dashboard</span>
                </button>
                <button
                    onClick={() => onNavigate('profile')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-primary-text hover:bg-card-bg/50 hover:text-accent transition-colors"
                    aria-label="Go to profile"
                >
                    <UserIcon className="w-5 h-5" />
                     <span className="hidden sm:block text-sm font-semibold">Profile</span>
                </button>
                 <button
                    onClick={onToggleTheme}
                    className="p-2 rounded-lg text-primary-text hover:bg-card-bg/50 hover:text-accent transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </button>
                <div className="w-px h-6 bg-secondary-text/20 mx-1"></div>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-primary-text hover:bg-card-bg/50 hover:text-error transition-colors"
                    aria-label="Logout"
                >
                    <LogoutIcon className="w-5 h-5" />
                    <span className="hidden sm:block text-sm font-semibold">Logout</span>
                </button>
            </nav>
        </header>
    );
};

export default Header;
