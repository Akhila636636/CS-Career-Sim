
import React from 'react';
import { Scenario, Role } from '../types';
import { ClipboardListIcon } from './icons/ClipboardListIcon';

interface BriefingProps {
    scenario: Scenario;
    role: Role;
    onStart: () => void;
    onBack: () => void;
}

const Briefing: React.FC<BriefingProps> = ({ scenario, role, onStart, onBack }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-3xl bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 rounded-2xl shadow-2xl p-8">
                <header className="text-center border-b border-secondary-text/50 pb-6 mb-6">
                    <p className="text-accent font-semibold tracking-wider">{role.title} Simulation</p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-text mt-2">Your Challenge Briefing</h1>
                </header>
                
                <div className="space-y-6 text-primary-text">
                    <div>
                        <h2 className="text-xl font-semibold text-accent mb-2">Company</h2>
                        <p className="text-secondary-text bg-base-bg/50 p-3 rounded-lg">{scenario.companyName}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-accent mb-2">Scenario</h2>
                        <p className="text-primary-text leading-relaxed">{scenario.scenario}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-accent mb-2">Your Task</h2>
                        <p className="text-primary-text leading-relaxed font-medium">{scenario.task}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-accent mb-2">Deliverables</h2>
                        <ul className="list-disc list-inside text-primary-text space-y-1 pl-2">
                           {scenario.deliverables.map((item, index) => (
                               <li key={index}>{item}</li>
                           ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 text-center flex flex-col gap-4">
                     <button 
                        onClick={onStart} 
                        className="w-full sm:w-auto px-10 py-3 bg-accent text-primary-text font-bold rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105"
                    >
                        Enter Simulated Workspace
                    </button>
                    <button 
                        onClick={onBack}
                        className="text-secondary-text text-sm hover:text-primary-text transition-colors"
                    >
                        &larr; Back to Challenges
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Briefing;
