import React, { useState } from 'react';
import { Scenario } from '../types';
import { InboxIcon } from './icons/InboxIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface SimulationProps {
    scenario: Scenario;
    onSubmit: (submission: string) => void;
}

const Simulation: React.FC<SimulationProps> = ({ scenario, onSubmit }) => {
    const [submissionText, setSubmissionText] = useState('');
    const [activeTab, setActiveTab] = useState<'inbox' | 'workspace' | number>('inbox'); // number is asset index

    const renderCenterPanelContent = () => {
        if (activeTab === 'inbox') {
            return (
                <div className="text-primary-text p-2 overflow-y-auto flex-grow">
                    <div className="mb-4">
                        <span className="text-secondary-text text-sm">From: </span>
                        <span className="font-semibold">{scenario.mockEmail.from}</span>
                    </div>
                    <div className="mb-4">
                        <span className="text-secondary-text text-sm">Subject: </span>
                        <span className="font-semibold">{scenario.mockEmail.subject}</span>
                    </div>
                    <hr className="border-secondary-text/50 my-4"/>
                    <div className="whitespace-pre-wrap leading-relaxed text-sm">
                        {scenario.mockEmail.body}
                    </div>
                </div>
            );
        }
        if (activeTab === 'workspace') {
            return (
                <textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Enter your analysis, design document, or code here..."
                    className="flex-grow w-full bg-base-bg/30 backdrop-blur-sm p-4 rounded-2xl border border-secondary-text/20 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors text-primary-text placeholder:text-secondary-text"
                    aria-label="Submission text area"
                />
            );
        }
        if (typeof activeTab === 'number') {
            const asset = scenario.mockAssets[activeTab];
            return (
                 <div className="text-primary-text p-2 overflow-y-auto flex-grow">
                    <h3 className="text-lg font-bold text-accent mb-4">{asset.name}</h3>
                    <div className="whitespace-pre-wrap leading-relaxed text-sm bg-base-bg/50 p-4 rounded-lg">
                        {asset.content}
                    </div>
                </div>
            )
        }
        return null;
    }

    return (
        <div className="min-h-screen p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Panel: Inbox */}
            <div className="lg:col-span-3 bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 rounded-2xl p-4 flex flex-col">
                <h2 className="text-lg font-bold text-primary-text flex items-center mb-4">
                    <InboxIcon className="w-5 h-5 mr-2 text-accent" />
                    Inbox (1)
                </h2>
                <button 
                    onClick={() => setActiveTab('inbox')}
                    className={`w-full text-left bg-base-bg/50 p-3 rounded-lg cursor-pointer border-l-4 transition-colors ${activeTab === 'inbox' ? 'border-accent' : 'border-transparent hover:border-secondary-text/50'}`}
                    aria-pressed={activeTab === 'inbox'}
                >
                    <p className="font-semibold text-primary-text truncate">{scenario.mockEmail.from}</p>
                    <p className="text-sm text-primary-text font-medium truncate">{scenario.mockEmail.subject}</p>
                    <p className="text-xs text-secondary-text truncate mt-1">{scenario.mockEmail.body.substring(0, 50)}...</p>
                </button>
                 <div className="mt-auto text-xs text-secondary-text p-2 text-center">End of messages.</div>
            </div>

            {/* Center Panel: Workspace */}
            <div className="lg:col-span-6 bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 rounded-2xl p-4 flex flex-col">
                 <div className="flex border-b border-secondary-text/50 mb-4">
                    <button onClick={() => setActiveTab('inbox')} className={`px-4 py-2 text-sm font-medium flex items-center transition-colors ${activeTab === 'inbox' ? 'text-accent border-b-2 border-accent' : 'text-secondary-text hover:text-primary-text'}`}>
                        <InboxIcon className="w-5 h-5 mr-1.5" />
                        Email
                    </button>
                    <button onClick={() => setActiveTab('workspace')} className={`px-4 py-2 text-sm font-medium flex items-center transition-colors ${activeTab === 'workspace' ? 'text-accent border-b-2 border-accent' : 'text-secondary-text hover:text-primary-text'}`}>
                        <SparklesIcon className="w-5 h-5 mr-1.5" />
                        Your Workspace
                    </button>
                    {typeof activeTab === 'number' && (
                        <button className={`px-4 py-2 text-sm font-medium flex items-center transition-colors text-accent border-b-2 border-accent`}>
                            <ClipboardListIcon className="w-5 h-5 mr-1.5" />
                            {scenario.mockAssets[activeTab].name}
                        </button>
                    )}
                </div>
                {renderCenterPanelContent()}
            </div>

            {/* Right Panel: Assets & Submit */}
            <div className="lg:col-span-3 bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-bold text-primary-text flex items-center mb-4">
                        <ClipboardListIcon className="w-5 h-5 mr-2 text-accent" />
                        Project Assets
                    </h2>
                    <ul className="space-y-2">
                        {scenario.mockAssets.map((asset, index) => (
                           <li key={index}> 
                                <button
                                    onClick={() => setActiveTab(index)}
                                    className={`w-full text-left text-sm text-primary-text bg-base-bg/50 p-3 rounded-lg hover:bg-opacity-80 transition-colors border-l-4 ${activeTab === index ? 'border-accent' : 'border-transparent'}`}
                                >
                                    {asset.name}
                                </button>
                           </li> 
                        ))}
                    </ul>
                </div>
                <button
                    onClick={() => {
                        if (!submissionText.trim()) {
                            setActiveTab('workspace');
                        } else {
                            onSubmit(submissionText);
                        }
                    }}
                    disabled={!submissionText.trim()}
                    className="w-full mt-4 px-6 py-3 bg-accent text-primary-text font-bold rounded-lg hover:bg-opacity-80 disabled:bg-secondary-text disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                    Submit Analysis
                </button>
            </div>
        </div>
    );
};

export default Simulation;