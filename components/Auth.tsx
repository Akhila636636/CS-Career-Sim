import React, { useState } from 'react';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { GoogleIcon } from './icons/GoogleIcon';

interface AuthProps {
    onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Mock authentication: simply log the user in.
        onLogin();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <header className="text-center mb-8">
                    <BriefcaseIcon className="w-12 h-12 mx-auto text-accent mb-4" />
                    <h1 className="text-3xl font-bold text-primary-text">CS Career Simulator</h1>
                    <p className="text-secondary-text mt-2">
                        {isLoginMode ? 'Welcome back! Please sign in.' : 'Create an account to begin.'}
                    </p>
                </header>

                <div className="bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 rounded-2xl shadow-2xl p-8">
                    <button
                        type="button"
                        onClick={onLogin}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-primary-text/90 text-gray-800 font-semibold rounded-lg hover:bg-primary-text transition-colors"
                    >
                        <GoogleIcon className="w-5 h-5" />
                        Sign in with Google
                    </button>
                    
                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-secondary-text/30"></div>
                        <span className="flex-shrink mx-4 text-xs text-secondary-text uppercase">Or continue with</span>
                        <div className="flex-grow border-t border-secondary-text/30"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-secondary-text mb-2">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="you@example.com"
                                className="w-full bg-base-bg/50 text-primary-text placeholder-secondary-text/70 px-4 py-2 border border-secondary-text/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-secondary-text mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                minLength={6}
                                placeholder="••••••••"
                                className="w-full bg-base-bg/50 text-primary-text placeholder-secondary-text/70 px-4 py-2 border border-secondary-text/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-4 px-6 py-3 bg-accent text-primary-text font-bold rounded-lg hover:bg-opacity-80 disabled:bg-secondary-text disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoginMode ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <button
                            onClick={() => setIsLoginMode(!isLoginMode)}
                            className="text-sm text-secondary-text hover:text-primary-text transition-colors"
                        >
                            {isLoginMode ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;