
import React from 'react';
import { Feedback, LearningResource } from '../types';
import { LinkIcon } from './icons/LinkIcon';
import { RetryIcon } from './icons/RetryIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-secondary-text'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

interface DebriefProps {
    feedback: Feedback;
    onRetry: () => void;
    onDashboard: () => void;
    onSaveResource: (resource: LearningResource) => void;
    savedResources: LearningResource[];
}

const Debrief: React.FC<DebriefProps> = ({ feedback, onRetry, onDashboard, onSaveResource, savedResources }) => {
    const isSaved = (resource: LearningResource) => {
        return savedResources.some(r => r.url === resource.url);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-4xl bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 rounded-2xl shadow-2xl p-8">
                <header className="text-center border-b border-secondary-text/50 pb-6 mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-text">Challenge Debrief</h1>
                    <p className="text-secondary-text mt-2">Here's a breakdown of your performance.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Review & Skills */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-accent mb-3">Performance Review</h2>
                            <p className="text-primary-text leading-relaxed bg-base-bg/50 p-4 rounded-lg">{feedback.performanceReview}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-accent mb-3">Skill Breakdown</h2>
                            <div className="space-y-4">
                                {feedback.skillBreakdown.map(skill => (
                                    <div key={skill.skill} className="bg-base-bg/50 p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-semibold text-primary-text">{skill.skill}</h3>
                                            <StarRating rating={skill.rating} />
                                        </div>
                                        <p className="text-secondary-text text-sm">{skill.feedback}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Learning Kit */}
                    <div>
                        <h2 className="text-xl font-bold text-accent mb-3">Free Learning Kit</h2>
                        <div className="space-y-3">
                            {feedback.learningKit.map(resource => (
                                <div key={resource.url} className="flex items-center bg-base-bg/50 p-3 rounded-lg group">
                                     <button 
                                        onClick={() => onSaveResource(resource)}
                                        className="mr-3 p-1 rounded-full hover:bg-opacity-20 hover:bg-accent transition-colors"
                                        aria-label={isSaved(resource) ? 'Unsave resource' : 'Save resource'}
                                     >
                                        <BookmarkIcon className={`w-5 h-5 transition-colors ${isSaved(resource) ? 'text-accent' : 'text-secondary-text group-hover:text-accent'}`} filled={isSaved(resource)} />
                                    </button>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex-grow">
                                        <p className="font-semibold text-primary-text group-hover:text-accent transition-colors">{resource.title}</p>
                                        <span className="text-xs font-medium uppercase tracking-wider text-secondary-text">{resource.type}</span>
                                    </a>
                                    <LinkIcon className="w-5 h-5 text-secondary-text ml-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-secondary-text/50 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={onRetry} className="flex items-center justify-center w-full sm:w-auto px-6 py-2 bg-transparent border border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-primary-text transition-colors">
                        <RetryIcon className="w-5 h-5 mr-2" />
                        Try Another Challenge
                    </button>
                    <button onClick={onDashboard} className="w-full sm:w-auto px-6 py-2 bg-accent text-primary-text font-semibold rounded-lg hover:bg-opacity-80 transition-colors">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Debrief;