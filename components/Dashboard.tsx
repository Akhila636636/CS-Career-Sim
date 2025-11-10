
import React from 'react';
import { Role } from '../types';
import { ROLES } from '../constants';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';

interface DashboardProps {
    onSelectRole: (role: Role) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectRole }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <header className="text-center mb-10">
                <BriefcaseIcon className="w-16 h-16 mx-auto text-accent mb-4" />
                <h1 className="text-4xl sm:text-5xl font-bold text-primary-text">CS Career Simulator</h1>
                <p className="text-secondary-text mt-2 text-lg max-w-2xl">
                    Try on a new career. Gain real-world experience and discover your path in the tech industry.
                </p>
            </header>
            
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-primary-text mb-6 text-center">Start a New Path</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ROLES.map(role => (
                        <button 
                            key={role.id} 
                            onClick={() => onSelectRole(role)}
                            className="group bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 p-6 rounded-2xl text-left hover:bg-card-bg/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <role.icon className="w-10 h-10 text-accent mb-4" />
                                    <h3 className="text-xl font-bold text-primary-text">{role.title}</h3>
                                    <p className="text-secondary-text mt-2 text-sm">{role.description}</p>
                                </div>
                                <ChevronRightIcon className="w-6 h-6 text-secondary-text mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
             <footer className="text-center mt-12 text-secondary-text text-sm">
                <p>&copy; 2024 Project Hub: CS Career Simulator. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Dashboard;