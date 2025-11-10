
import { Role } from './types';
import { UserIcon } from './components/icons/UserIcon';
import { ComputerIcon } from './components/icons/ComputerIcon';
import { LightBulbIcon } from './components/icons/LightBulbIcon';
import { ServerIcon } from './components/icons/ServerIcon';
import { ChartPieIcon } from './components/icons/ChartPieIcon';
import { ShieldCheckIcon } from './components/icons/ShieldCheckIcon';

export const ROLES: Role[] = [
    {
        id: 'ux-designer',
        title: 'UX Designer',
        description: 'Shape user experiences by designing intuitive, accessible, and delightful digital products.',
        icon: UserIcon,
        longDescription: 'As a UX Designer, you are the advocate for the user. You\'ll use research and empathy to understand user needs, then create wireframes, prototypes, and high-fidelity mockups to design solutions that are not only beautiful but also easy and enjoyable to use. You bridge the gap between user needs and business goals.',
        skills: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Figma/Sketch', 'Information Architecture'],
        resources: [
            { title: 'Nielsen Norman Group Articles', url: 'https://www.nngroup.com/articles/', type: 'article' },
            { title: 'Figma Learn', url: 'https://www.figma.com/learn/', type: 'video' },
            { title: 'Laws of UX', url: 'https://lawsofux.com/', type: 'article' },
        ],
        challenges: [
            { title: 'New Feature Onboarding', prompt: 'Design a user-friendly onboarding flow for a new "Advanced Analytics" feature in a project management app.' },
            { title: 'E-commerce Checkout Redesign', prompt: 'Redesign the checkout process for a mobile e-commerce site to reduce cart abandonment.' },
            { title: 'Accessibility Audit', prompt: 'Conduct an accessibility audit for a popular news website and propose three key improvements.' },
            { title: 'Mobile App Wireframe', prompt: 'Create low-fidelity wireframes for a new language-learning mobile application.' },
            { title: 'User Research Plan', prompt: 'Develop a user research plan to investigate why users are not using the "collaboration" feature of a productivity tool.' },
        ],
    },
    {
        id: 'frontend-developer',
        title: 'Frontend Developer',
        description: 'Build and implement the user-facing side of web applications using modern frameworks.',
        icon: ComputerIcon,
        longDescription: 'As a Frontend Developer, you bring designs to life. You write clean, efficient, and maintainable code using HTML, CSS, and JavaScript to create interactive and responsive user interfaces. You work closely with designers and backend developers to build seamless web experiences.',
        skills: ['HTML & CSS', 'JavaScript', 'React/Vue/Angular', 'Responsive Design', 'API Integration', 'Version Control (Git)'],
        resources: [
            { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/', type: 'article' },
            { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', type: 'article' },
            { title: 'React Official Tutorial', url: 'https://react.dev/learn', type: 'article' },
        ],
        challenges: [
            { title: 'Build an Interactive Component', prompt: 'Build a reusable "Star Rating" component in React that allows users to select a rating and outputs the value.' },
            { title: 'Fix a Performance Bottleneck', prompt: 'A web page is loading slowly due to large images. Optimize the image loading strategy to improve performance.' },
            { title: 'Implement a Responsive Layout', prompt: 'Implement a complex, responsive pricing page layout based on a provided design mockup.' },
            { title: 'Connect to an API', prompt: 'Fetch user data from a public API and display it in a clean, user-friendly list format.' },
            { title: 'Refactor Legacy Code', prompt: 'Refactor a class-based React component to use modern functional components and Hooks for better readability.' },
        ],
    },
    {
        id: 'product-manager',
        title: 'Product Manager',
        description: 'Define product vision, strategy, and roadmap. Bridge users, business, and development.',
        icon: LightBulbIcon,
        longDescription: 'As a Product Manager, you are the CEO of the product. You are responsible for defining the "what" and "why" of what gets built. You\'ll conduct market research, define features, prioritize backlogs, and work with cross-functional teams to guide products from conception to launch.',
        skills: ['Product Strategy', 'Roadmapping', 'User Story Writing', 'Prioritization', 'Data Analysis', 'Stakeholder Management'],
        resources: [
            { title: 'Mind the Product', url: 'https://www.mindtheproduct.com/', type: 'article' },
            { title: 'Lenny\'s Newsletter', url: 'https://www.lennysnewsletter.com/', type: 'article' },
            { title: 'Product School Videos', url: 'https://www.youtube.com/c/ProductSchool', type: 'video' },
        ],
        challenges: [
            { title: 'Prioritize a Feature Backlog', prompt: 'Given a backlog of 10 feature requests for a SaaS product, prioritize them for the next quarter and justify your decisions.' },
            { title: 'Write a PRD', prompt: 'Write a Product Requirements Document (PRD) for a new "team chat" feature within an existing project management tool.' },
            { title: 'Define Success Metrics', prompt: 'Define the key success metrics (KPIs) for the launch of a new online marketplace.' },
            { title: 'Conduct a Competitive Analysis', prompt: 'Perform a competitive analysis of three major players in the food delivery market and identify a key opportunity.' },
            { title: 'Develop a Product Roadmap', prompt: 'Create a high-level, 6-month product roadmap for a new fitness tracking application.' },
        ],
    },
    {
        id: 'backend-developer',
        title: 'Backend Developer',
        description: 'Power the server-side of applications, working with databases, APIs, and application logic.',
        icon: ServerIcon,
        longDescription: 'As a Backend Developer, you are the architect of the server-side. You build and maintain the core logic, databases, and APIs that power an application. Your work ensures data is processed, stored, and delivered efficiently and securely, making the frontend experience possible.',
        skills: ['Node.js/Python/Java', 'REST APIs', 'SQL/NoSQL Databases', 'Authentication', 'System Architecture', 'Testing'],
        resources: [
            { title: 'Node.js Official Guides', url: 'https://nodejs.org/en/docs/guides/', type: 'article' },
            { title: 'The Flask Mega-Tutorial', url: 'https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world', type: 'article' },
            { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', type: 'article' },
        ],
        challenges: [
            { title: 'Design a REST API Endpoint', prompt: 'Design the API endpoints (GET, POST, PUT, DELETE) for managing "user profiles" in a social media application.' },
            { title: 'Write a Database Schema', prompt: 'Create a SQL database schema for a simple blog application with users, posts, and comments.' },
            { title: 'Implement User Authentication', prompt: 'Outline the steps and logic for implementing a secure JWT-based authentication system for a web app.' },
            { title: 'Troubleshoot a Slow Query', prompt: 'A database query to fetch user activity is running slow. Analyze the query and propose a solution, like adding an index.' },
            { title: 'Build a Simple Microservice', prompt: 'Conceptually design a microservice that handles email notifications for an e-commerce platform.' },
        ],
    },
    {
        id: 'data-scientist',
        title: 'Data Scientist',
        description: 'Uncover insights from complex data using analysis, machine learning, and visualization.',
        icon: ChartPieIcon,
        longDescription: 'As a Data Scientist, you turn raw data into meaningful insights. You use statistical methods, machine learning algorithms, and data visualization techniques to solve complex problems and drive business strategy. Your work helps organizations make smarter, data-driven decisions.',
        skills: ['Python (Pandas, NumPy)', 'SQL', 'Machine Learning', 'Statistical Analysis', 'Data Visualization', 'Problem Solving'],
        resources: [
            { title: 'Kaggle Courses', url: 'https://www.kaggle.com/learn', type: 'article' },
            { title: 'Towards Data Science', url: 'https://towardsdatascience.com/', type: 'article' },
            { title: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/c/statquest', type: 'video' },
        ],
        challenges: [
            { title: 'Analyze Customer Churn', prompt: 'Given a dataset of customer data, propose an approach to analyze and predict customer churn.' },
            { title: 'Design a Product Recommendation System', prompt: 'Outline the design for a machine learning model that provides personalized product recommendations on an e-commerce site.' },
            { title: 'Clean and Explore a Dataset', prompt: 'You are given a messy dataset of sales data. Describe the steps you would take to clean, explore, and find initial insights.' },
            { title: 'Interpret a Model\'s Results', prompt: 'A classification model has an accuracy of 95%. Explain why this might be a misleading metric and what other metrics you would use.' },
            { title: 'A/B Test Analysis', prompt: 'Design an A/B test to determine if changing a button color on a website increases user sign-ups, and how you would analyze the results.' },
        ],
    },
    {
        id: 'cybersecurity-analyst',
        title: 'Cybersecurity Analyst',
        description: 'Protect digital assets by monitoring networks, identifying vulnerabilities, and responding to threats.',
        icon: ShieldCheckIcon,
        longDescription: 'As a Cybersecurity Analyst, you are the first line of defense against digital threats. You monitor networks for suspicious activity, identify and patch vulnerabilities, investigate security breaches, and implement policies to protect an organization\'s data and infrastructure.',
        skills: ['Network Security', 'Vulnerability Assessment', 'Incident Response', 'SIEM Tools', 'Cryptography', 'Threat Intelligence'],
        resources: [
            { title: 'OWASP Top Ten', url: 'https://owasp.org/www-project-top-ten/', type: 'article' },
            { title: 'Cybrary', url: 'https://www.cybrary.it/', type: 'article' },
            { title: 'Professor Messer CompTIA Security+', url: 'https://www.professormesser.com/security-plus/sy0-601/sy0-601-video/sy0-601-comptia-security-plus-course/', type: 'video' },
        ],
        challenges: [
            { title: 'Analyze Suspicious Network Logs', prompt: 'You are given network logs showing unusual traffic to a specific server. Analyze the logs and determine if it is a potential threat.' },
            { title: 'Respond to a Phishing Attack', prompt: 'An employee has reported a suspected phishing email. Outline the steps you would take to investigate and respond to the incident.' },
            { title: 'Conduct a Vulnerability Scan Review', prompt: 'A vulnerability scanner has identified a "critical" SQL injection vulnerability. Explain the risk and recommend a mitigation strategy.' },
            { title: 'Develop a Security Policy', prompt: 'Write a basic "Acceptable Use Policy" for employees at a small company to reduce security risks.' },
            { title: 'Incident Triage', prompt: 'You receive three security alerts at once: a server is down, an employee lost their laptop, and a malware detection. Prioritize them and explain your reasoning.' },
        ],
    }
];
