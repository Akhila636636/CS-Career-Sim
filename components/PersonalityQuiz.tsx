
import React, { useState } from 'react';
import { Role } from '../types';
import { ROLES } from '../constants';
import { PuzzleIcon } from './icons/PuzzleIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface Question {
    id: number;
    text: string;
    options: {
        text: string;
        scores: { [key: string]: number };
    }[];
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "When you look at a popular app, what is the first thing that catches your attention?",
        options: [
            { text: "The layout, colors, and how easy it is to navigate.", scores: { 'ux-designer': 3, 'frontend-developer': 2 } },
            { text: "The features it offers and how it solves my problems.", scores: { 'product-manager': 3, 'backend-developer': 1 } },
            { text: "How fast it loads and how secure my data feels.", scores: { 'backend-developer': 3, 'cybersecurity-analyst': 2 } },
            { text: "How it seems to know exactly what I want to see next.", scores: { 'data-scientist': 3, 'product-manager': 1 } }
        ]
    },
    {
        id: 2,
        text: "In a group project, which role do you naturally gravitate towards?",
        options: [
            { text: "Organizing the team, setting deadlines, and keeping everyone on track.", scores: { 'product-manager': 3 } },
            { text: "Making the presentation look amazing and ensuring the visuals are perfect.", scores: { 'ux-designer': 2, 'frontend-developer': 2 } },
            { text: "Figuring out the complex logic or calculations behind the scenes.", scores: { 'backend-developer': 2, 'data-scientist': 2 } },
            { text: "Double-checking everything for errors and potential risks.", scores: { 'cybersecurity-analyst': 3, 'backend-developer': 1 } }
        ]
    },
    {
        id: 3,
        text: "If you were building a house, which part would you want to be responsible for?",
        options: [
            { text: "The foundation, wiring, and plumbing hidden behind the walls.", scores: { 'backend-developer': 3, 'cybersecurity-analyst': 1 } },
            { text: "The interior design, paint colors, and how the rooms flow.", scores: { 'ux-designer': 3, 'frontend-developer': 2 } },
            { text: "The security system, locks, and safety protocols.", scores: { 'cybersecurity-analyst': 3 } },
            { text: "The overall blueprints, budget, and coordinating the construction crew.", scores: { 'product-manager': 3 } },
            { text: "Analyzing the energy efficiency and structural integrity data.", scores: { 'data-scientist': 3 } }
        ]
    },
    {
        id: 4,
        text: "Which type of puzzle or game do you enjoy the most?",
        options: [
            { text: "Jigsaw puzzles or visual design games.", scores: { 'ux-designer': 3, 'frontend-developer': 2 } },
            { text: "Logic riddles, strategy games, or chess.", scores: { 'backend-developer': 2, 'data-scientist': 1, 'product-manager': 1 } },
            { text: "Sudoku, finding patterns in numbers, or statistics.", scores: { 'data-scientist': 3 } },
            { text: "Escape rooms, finding hidden clues, or solving mysteries.", scores: { 'cybersecurity-analyst': 3 } }
        ]
    },
    {
        id: 5,
        text: "How do you usually approach a complex problem?",
        options: [
            { text: "I break it down into smaller, logical steps and write a script to solve it.", scores: { 'backend-developer': 2, 'data-scientist': 2 } },
            { text: "I visualize the end result and work backwards from the user experience.", scores: { 'ux-designer': 3, 'frontend-developer': 2 } },
            { text: "I look for patterns in the information available to find a solution.", scores: { 'data-scientist': 3, 'cybersecurity-analyst': 1 } },
            { text: "I talk to the people involved to understand the root cause and priorities.", scores: { 'product-manager': 3 } }
        ]
    },
    {
        id: 6,
        text: "What sounds like the most satisfying outcome of your work?",
        options: [
            { text: "Watching a user smile because the interface is so intuitive.", scores: { 'ux-designer': 3, 'frontend-developer': 2 } },
            { text: "Building a robust system that runs 10x faster than before.", scores: { 'backend-developer': 3 } },
            { text: "Predicting a major trend before it happens using data.", scores: { 'data-scientist': 3 } },
            { text: "Stopping a hacker from breaching a secure system.", scores: { 'cybersecurity-analyst': 3 } },
            { text: "Launching a successful product that millions of people use.", scores: { 'product-manager': 3 } }
        ]
    },
    {
        id: 7,
        text: "Which subject did you (or would you) enjoy most in school?",
        options: [
            { text: "Psychology or Art.", scores: { 'ux-designer': 3 } },
            { text: "Statistics or Calculus.", scores: { 'data-scientist': 3, 'backend-developer': 1 } },
            { text: "Computer Science or Logic.", scores: { 'backend-developer': 3, 'cybersecurity-analyst': 2, 'frontend-developer': 2 } },
            { text: "Business, Economics, or Debate.", scores: { 'product-manager': 3 } }
        ]
    },
    {
        id: 8,
        text: "Pick the set of tools that appeals to you most:",
        options: [
            { text: "Sketchbook, Figma, Color Palettes.", scores: { 'ux-designer': 3 } },
            { text: "Code Editor (VS Code), Browser DevTools.", scores: { 'frontend-developer': 3, 'backend-developer': 1 } },
            { text: "Terminal, Servers, Databases.", scores: { 'backend-developer': 3, 'cybersecurity-analyst': 1 } },
            { text: "Spreadsheets, Graphs, Python Notebooks.", scores: { 'data-scientist': 3 } },
            { text: "Roadmaps, Whiteboards, User Feedback.", scores: { 'product-manager': 3 } }
        ]
    }
];

interface PersonalityQuizProps {
    onComplete: (role: Role) => void;
    onClose: () => void;
}

const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({ onComplete, onClose }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState<{ [key: string]: number }>({});
    const [showResult, setShowResult] = useState(false);
    const [recommendedRole, setRecommendedRole] = useState<Role | null>(null);

    const handleOptionSelect = (optionScores: { [key: string]: number }) => {
        const newScores = { ...scores };
        Object.entries(optionScores).forEach(([roleId, score]) => {
            newScores[roleId] = (newScores[roleId] || 0) + score;
        });
        setScores(newScores);

        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResult(newScores);
        }
    };

    const calculateResult = (finalScores: { [key: string]: number }) => {
        let maxScore = -1;
        let winningRoleId = '';

        // Normalize scores for roles that might appear less frequently or add base entries
        ROLES.forEach(role => {
            if (!finalScores[role.id]) finalScores[role.id] = 0;
        });

        Object.entries(finalScores).forEach(([roleId, score]) => {
            if (score > maxScore) {
                maxScore = score;
                winningRoleId = roleId;
            }
        });

        const winner = ROLES.find(r => r.id === winningRoleId);
        setRecommendedRole(winner || ROLES[0]);
        setShowResult(true);
    };

    if (showResult && recommendedRole) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 animation-fade-in">
                <div className="w-full max-w-2xl bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 rounded-2xl shadow-2xl p-8 text-center">
                    <SparklesIcon className="w-16 h-16 text-accent mx-auto mb-4 animate-pulse" />
                    <h2 className="text-3xl font-bold text-primary-text mb-2">Your Match Found!</h2>
                    <p className="text-secondary-text mb-8">Based on your personality and preferences, you'd make a great...</p>
                    
                    <div className="bg-base-bg/50 p-6 rounded-2xl border border-accent/30 mb-8 transform hover:scale-105 transition-transform duration-300">
                        <recommendedRole.icon className="w-20 h-20 text-accent mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-primary-text mb-2">{recommendedRole.title}</h3>
                        <p className="text-secondary-text">{recommendedRole.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => onComplete(recommendedRole)}
                            className="px-8 py-3 bg-accent text-primary-text font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-accent/20"
                        >
                            Explore This Role
                        </button>
                        <button 
                            onClick={onClose}
                            className="px-8 py-3 bg-transparent border border-secondary-text/50 text-primary-text font-medium rounded-lg hover:bg-base-bg/50 transition-colors"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-2xl">
                 <button 
                    onClick={onClose}
                    className="text-secondary-text hover:text-primary-text mb-6 flex items-center gap-2 transition-colors"
                >
                    <ChevronRightIcon className="w-4 h-4 rotate-180" />
                    Exit Quiz
                </button>

                <div className="bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Progress Bar */}
                    <div className="w-full bg-base-bg/50 h-2">
                        <div 
                            className="bg-accent h-2 transition-all duration-500 ease-out" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-accent font-bold text-sm tracking-wider uppercase">Question {currentQuestion.id} of {QUESTIONS.length}</span>
                            <PuzzleIcon className="w-6 h-6 text-secondary-text/50" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-primary-text mb-8 leading-relaxed">
                            {currentQuestion.text}
                        </h2>

                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option.scores)}
                                    className="w-full text-left p-4 rounded-xl bg-base-bg/50 border border-transparent hover:border-accent hover:bg-card-bg transition-all duration-200 group"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg text-primary-text">{option.text}</span>
                                        <ChevronRightIcon className="w-5 h-5 text-secondary-text opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalityQuiz;
