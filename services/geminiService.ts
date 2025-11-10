
import { GoogleGenAI, Type } from "@google/genai";
import { Role, Scenario, Feedback } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const scenarioSchema = {
    type: Type.OBJECT,
    properties: {
        companyName: { type: Type.STRING },
        scenario: { type: Type.STRING },
        task: { type: Type.STRING },
        deliverables: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        },
        mockEmail: {
            type: Type.OBJECT,
            properties: {
                from: { type: Type.STRING },
                subject: { type: Type.STRING },
                body: { type: Type.STRING },
            },
            required: ["from", "subject", "body"]
        },
        mockAssets: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The filename or title of the asset." },
                    content: { type: Type.STRING, description: "The detailed content of the asset, like user persona details, design specs, or brand guidelines." }
                },
                required: ["name", "content"]
            }
        }
    },
    required: ["companyName", "scenario", "task", "deliverables", "mockEmail", "mockAssets"]
};

const feedbackSchema = {
    type: Type.OBJECT,
    properties: {
        performanceReview: { type: Type.STRING },
        skillBreakdown: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    rating: { type: Type.INTEGER },
                    feedback: { type: Type.STRING }
                },
                required: ["skill", "rating", "feedback"]
            }
        },
        learningKit: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    url: { type: Type.STRING },
                    type: {
                        type: Type.STRING,
                        enum: ["article", "video"]
                    }
                },
                required: ["title", "url", "type"]
            }
        }
    },
    required: ["performanceReview", "skillBreakdown", "learningKit"]
};

export const generateScenario = async (role: Role, challengePrompt: string): Promise<Scenario> => {
    const prompt = `Generate a realistic, entry-level project brief for a ${role.title} in a career simulation. The scenario should be based on this specific challenge: "${challengePrompt}". The scenario should be concise but detailed enough for a user to act on. Include a mock company name, a core scenario, a specific task, expected deliverables, a mock email with a sender, subject, and a detailed body explaining the task, and 2-3 mock project assets. Each asset must have a 'name' (like a filename) and detailed 'content' (like user personas, design specifications, or brand guidelines).`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: scenarioSchema,
        },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as Scenario;
};


export const generateFeedback = async (role: Role, scenario: Scenario, submission: string): Promise<Feedback> => {
    const prompt = `You are an expert ${role.title} manager providing feedback in a career simulation.
    
    The user was given this scenario:
    - Company: ${scenario.companyName}
    - Situation: ${scenario.scenario}
    - Task: ${scenario.task}
    
    Their submission is:
    ---
    ${submission}
    ---
    
    Assess their work based on industry standards for a junior professional. Provide a detailed but encouraging performance review, a breakdown of 3-4 key skills demonstrated (and areas for improvement) with a 1-5 star rating, and a curated 'Free Learning Kit' of 3 high-quality online resources (articles or videos) to help them improve.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: feedbackSchema,
        },
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as Feedback;
};
