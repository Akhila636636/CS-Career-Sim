// Fix: Import React to provide the React namespace.
import React from 'react';

export interface LearningResource {
    title: string;
    url: string;
    type: 'article' | 'video';
}

export interface Challenge {
    title: string;
    prompt: string;
}

export interface Role {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    longDescription: string;
    skills: string[];
    resources: LearningResource[];
    challenges: Challenge[];
}

export interface MockAsset {
    name: string;
    content: string;
}

export interface Scenario {
    companyName: string;
    scenario: string;
    task: string;
    deliverables: string[];
    mockEmail: {
        from: string;
        subject: string;
        body: string;
    };
    mockAssets: MockAsset[];
}

export interface SkillBreakdown {
    skill: string;
    rating: number; // 1-5
    feedback: string;
}

export interface Feedback {
    performanceReview: string;
    skillBreakdown: SkillBreakdown[];
    learningKit: LearningResource[];
}

export interface ChallengeHistoryItem {
    role: Role;
    feedback: Feedback;
}

export type View = 'dashboard' | 'roleDetail' | 'briefing' | 'simulation' | 'debrief' | 'profile';