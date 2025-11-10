
import React, { useState } from 'react';
import { ChallengeHistoryItem, LearningResource, SkillBreakdown } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { LinkIcon } from './icons/LinkIcon';

type ProfileTab = 'history' | 'skills' | 'resources';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-secondary-text'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

const Profile: React.FC<{ challengeHistory: ChallengeHistoryItem[], savedResources: LearningResource[] }> = ({ challengeHistory, savedResources }) => {
    const [activeTab, setActiveTab] = useState<ProfileTab>('history');

    const allSkills: (SkillBreakdown & { role: string })[] = challengeHistory.flatMap(item => 
        item.feedback.skillBreakdown.map(skill => ({...skill, role: item.role.title}))
    );

    const renderContent = () => {
        if (challengeHistory.length === 0 && activeTab !== 'resources') {
             return (
                <div className="text-center py-16">
                    <h3 className="text-xl font-semibold text-primary-text">No History Yet</h3>
                    <p className="text-secondary-text mt-2">Complete your first challenge to see your progress here.</p>
                </div>
            );
        }

        switch (activeTab) {
            case 'history':
                return (
                    <div className="space-y-4">
                        {challengeHistory.map((item, index) => (
                            <div key={index} className="bg-base-bg/50 p-4 rounded-lg">
                                <h3 className="text-lg font-bold text-accent">{item.role.title} Challenge</h3>
                                <p className="text-sm text-secondary-text mt-2 border-l-2 border-secondary-text/50 pl-3">{item.feedback.performanceReview.substring(0, 150)}...</p>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                 return (
                    <div className="space-y-4">
                        {allSkills.map((skill, index) => (
                             <div key={index} className="bg-base-bg/50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-semibold text-primary-text">{skill.skill} <span className="text-xs text-secondary-text">({skill.role})</span></h3>
                                    <StarRating rating={skill.rating} />
                                </div>
                                <p className="text-secondary-text text-sm">{skill.feedback}</p>
                            </div>
                        ))}
                    </div>
                 );
            case 'resources':
                if (savedResources.length === 0) {
                    return (
                        <div className="text-center py-16">
                            <h3 className="text-xl font-semibold text-primary-text">No Saved Resources</h3>
                            <p className="text-secondary-text mt-2">Save resources from your debrief to find them here.</p>
                        </div>
                    );
                }
                return (
                    <div className="space-y-3">
                        {savedResources.map(resource => (
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" key={resource.url} className="block bg-base-bg/50 p-4 rounded-lg hover:border-accent border border-transparent transition-colors group">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-primary-text group-hover:text-accent transition-colors">{resource.title}</p>
                                        <span className="text-xs font-medium uppercase tracking-wider text-secondary-text">{resource.type}</span>
                                    </div>
                                    <LinkIcon className="w-5 h-5 text-secondary-text group-hover:text-accent transition-colors" />
                                </div>
                            </a>
                        ))}
                    </div>
                );
        }
    };
    
    const TabButton: React.FC<{ tab: ProfileTab, icon: React.ReactNode, label: string }> = ({ tab, icon, label }) => (
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

    return (
        <div className="min-h-[calc(100vh-4rem)] flex justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-3xl">
                 <header className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-text">Your Profile</h1>
                    <p className="text-secondary-text mt-2">Track your progress and review your achievements.</p>
                </header>
                <div className="bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 rounded-2xl shadow-2xl p-4 sm:p-6">
                    <div className="flex border-b border-secondary-text/50 mb-6">
                        <TabButton tab="history" icon={<ClockIcon className="w-5 h-5" />} label="History" />
                        <TabButton tab="skills" icon={<ChartBarIcon className="w-5 h-5" />} label="Skills" />
                        <TabButton tab="resources" icon={<BookmarkIcon className="w-5 h-5" />} label="Saved" />
                    </div>
                    <div>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;