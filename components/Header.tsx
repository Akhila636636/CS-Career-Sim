import React from 'react';
import { View } from '../types';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { HomeIcon } from './icons/HomeIcon';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
    onNavigate: (view: View) => void;
    onLogout: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onLogout, theme, onToggleTheme }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-card-bg/30 backdrop-blur-sm border-b border-secondary-text/20 h-16 flex items-center justify-between px-4 sm:px-6 md:px-8">
            <div 
                className="flex items-center cursor-pointer group"
                onClick={() => onNavigate('dashboard')}
            >
                <BriefcaseIcon className="w-8 h-8 text-accent group-hover:animate-pulse" />
                <span className="hidden sm:block ml-3 text-xl font-bold text-primary-text group-hover:text-accent transition-colors">
                    CS Career Sim
                </span>
            </div>
            <nav className="flex items-center gap-1 sm:gap-2">
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
