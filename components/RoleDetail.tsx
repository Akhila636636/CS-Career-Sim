import React, { useState } from 'react';
import { Role } from '../types';
import { LinkIcon } from './icons/LinkIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { CollectionIcon } from './icons/CollectionIcon';

interface RoleDetailProps {
    role: Role;
    onStartChallenge: (challengePrompt: string) => void;
    onBack: () => void;
}

type RoleDetailTab = 'challenges' | 'skills' | 'resources';

const RoleDetail: React.FC<RoleDetailProps> = ({ role, onStartChallenge, onBack }) => {
    const [activeTab, setActiveTab] = useState<RoleDetailTab>('challenges');

    const TabButton: React.FC<{ tab: RoleDetailTab, icon: React.ReactNode, label: string }> = ({ tab, icon, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${
                activeTab === tab 
                ? 'text-accent border-accent' 
                : 'text-secondary-text border-transparent hover:text-primary-text hover:bg-base-bg/50'
            }`}
        >
            {icon}
            {label}
        </button>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'skills':
                return (
                    <div className="flex flex-wrap gap-2">
                        {role.skills.map(skill => (
                            <span key={skill} className="bg-base-bg/50 text-secondary-text text-sm font-medium px-3 py-1 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                );
            case 'resources':
                return (
                    <ul className="space-y-3">
                        {role.resources.map(resource => (
                             <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                key={resource.url} 
                                className="flex items-center bg-base-bg/50 p-3 rounded-lg group hover:bg-base-bg/80 transition-colors"
                            >
                                <div className="flex-grow">
                                    <p className="font-semibold text-primary-text group-hover:text-accent transition-colors">{resource.title}</p>
                                    <span className="text-xs font-medium uppercase tracking-wider text-secondary-text">{resource.type}</span>
                                </div>
                                <LinkIcon className="w-5 h-5 text-secondary-text ml-2 group-hover:text-accent transition-colors" />
                            </a>
                        ))}
                    </ul>
                );
            case 'challenges':
            default:
                return (
                    <div className="space-y-3">
                        {role.challenges.map(challenge => (
                            <button 
                                key={challenge.title}
                                onClick={() => onStartChallenge(challenge.prompt)}
                                className="w-full text-left bg-base-bg/50 p-4 rounded-lg group hover:border-accent border-l-4 border-transparent transition-all duration-300 transform hover:scale-[1.02]"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-primary-text">{challenge.title}</p>
                                    <ChevronRightIcon className="w-5 h-5 text-secondary-text opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                            </button>
                        ))}
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-4xl">
                 <button 
                    onClick={onBack}
                    className="flex items-center text-secondary-text hover:text-primary-text transition-colors mb-6 group"
                >
                    <ChevronRightIcon className="w-5 h-5 mr-1 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Back to all roles
                </button>
                <header className="text-center mb-10">
                    <role.icon className="w-16 h-16 mx-auto text-accent mb-4" />
                    <h1 className="text-4xl sm:text-5xl font-bold text-primary-text">{role.title}</h1>
                    <p className="text-secondary-text mt-3 text-lg max-w-2xl mx-auto">
                        {role.longDescription}
                    </p>
                </header>

                <div className="bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 rounded-2xl shadow-lg">
                    <div className="flex border-b border-secondary-text/50">
                        <TabButton tab="challenges" icon={<CollectionIcon className="w-5 h-5" />} label="Challenges" />
                        <TabButton tab="skills" icon={<SparklesIcon className="w-5 h-5" />} label="Core Skills" />
                        <TabButton tab="resources" icon={<BookOpenIcon className="w-5 h-5" />} label="Learning Resources" />
                    </div>
                    <div className="p-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleDetail;
