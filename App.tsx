import React, { useState, useCallback, useEffect } from 'react';
import { View, Role, Scenario, Feedback, LearningResource, ChallengeHistoryItem } from './types';
import { generateScenario, generateFeedback } from './services/geminiService';
import Dashboard from './components/Dashboard';
import RoleDetail from './components/RoleDetail';
import Briefing from './components/Briefing';
import Simulation from './components/Simulation';
import Debrief from './components/Debrief';
import Profile from './components/Profile';
import Header from './components/Header';
import Auth from './components/Auth';
import { LoadingSpinner } from './components/icons/LoadingSpinner';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [view, setView] = useState<View>('dashboard');
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [scenario, setScenario] = useState<Scenario | null>(null);
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [challengeHistory, setChallengeHistory] = useState<ChallengeHistoryItem[]>([]);
    const [savedResources, setSavedResources] = useState<LearningResource[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              return 'dark';
            }
        }
        return 'light';
    });
    
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const handleToggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }, []);

    const handleLogin = useCallback(() => {
        setIsAuthenticated(true);
        setView('dashboard');
    }, []);

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        // Reset all state on logout for a clean slate
        setView('dashboard');
        setSelectedRole(null);
        setScenario(null);
        setFeedback(null);
        setChallengeHistory([]);
        setSavedResources([]);
        setError(null);
    }, []);

    const handleSelectRole = useCallback((role: Role) => {
        setSelectedRole(role);
        setView('roleDetail');
    }, []);

    const handleStartChallenge = useCallback(async (challengePrompt: string) => {
        if (!selectedRole) return;
        setLoading(true);
        setLoadingMessage('Generating a custom scenario for you...');
        setError(null);
        try {
            const generatedScenario = await generateScenario(selectedRole, challengePrompt);
            setScenario(generatedScenario);
            setView('briefing');
        } catch (e) {
            console.error(e);
            setError('Failed to generate a scenario. Please try again.');
            setView('roleDetail');
        } finally {
            setLoading(false);
        }
    }, [selectedRole]);

    const handleSubmitSimulation = useCallback(async (submission: string) => {
        if (!selectedRole || !scenario) return;
        setLoading(true);
        setLoadingMessage('Our experts are reviewing your submission...');
        setError(null);
        try {
            const generatedFeedback = await generateFeedback(selectedRole, scenario, submission);
            setFeedback(generatedFeedback);
            setChallengeHistory(prev => [...prev, { role: selectedRole, feedback: generatedFeedback }]);
            setView('debrief');
        } catch (e) {
            console.error(e);
            setError('Failed to generate feedback. Please try again.');
            setView('simulation');
        } finally {
            setLoading(false);
        }
    }, [selectedRole, scenario]);

    const handleSaveResource = useCallback((resource: LearningResource) => {
        setSavedResources(prev => {
            if (prev.find(r => r.url === resource.url)) {
                return prev.filter(r => r.url !== resource.url);
            }
            return [...prev, resource];
        });
    }, []);

    const handleReset = () => {
        setView('dashboard');
        setSelectedRole(null);
        setScenario(null);
        setFeedback(null);
        setError(null);
    };

    const handleNavigate = (newView: View) => {
        setError(null);
        if (newView === 'dashboard') {
            setSelectedRole(null);
        }
        setView(newView);
    };
    
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center h-screen text-primary-text">
                    <LoadingSpinner className="w-16 h-16 mb-4" />
                    <h2 className="text-2xl font-semibold">{loadingMessage}</h2>
                </div>
            );
        }

        if (error) {
           return (
             <div className="flex flex-col items-center justify-center h-screen text-primary-text p-4">
               <h2 className="text-3xl font-bold text-error mb-4">An Error Occurred</h2>
               <p className="text-center mb-6">{error}</p>
               <button onClick={handleReset} className="px-6 py-2 bg-accent/80 backdrop-blur-sm border border-accent text-primary-text font-semibold rounded-lg hover:bg-accent transition-all">
                 Back to Dashboard
               </button>
             </div>
           );
        }

        switch (view) {
            case 'roleDetail':
                return <RoleDetail role={selectedRole!} onStartChallenge={handleStartChallenge} onBack={() => handleNavigate('dashboard')} />;
            case 'briefing':
                return <Briefing scenario={scenario!} onStart={() => setView('simulation')} role={selectedRole!} onBack={() => setView('roleDetail')} />;
            case 'simulation':
                return <Simulation scenario={scenario!} onSubmit={handleSubmitSimulation} />;
            case 'debrief':
                return <Debrief 
                            feedback={feedback!} 
                            onRetry={() => handleNavigate('roleDetail')} 
                            onDashboard={handleReset}
                            onSaveResource={handleSaveResource}
                            savedResources={savedResources} 
                        />;
            case 'profile':
                return <Profile challengeHistory={challengeHistory} savedResources={savedResources} />;
            case 'dashboard':
            default:
                return <Dashboard onSelectRole={handleSelectRole} />;
        }
    };
    
    if (!isAuthenticated) {
        return <Auth onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen text-primary-text">
            <Header onNavigate={handleNavigate} onLogout={handleLogout} theme={theme} onToggleTheme={handleToggleTheme} />
            <main className="pt-16">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
