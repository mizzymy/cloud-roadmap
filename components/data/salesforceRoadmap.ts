import { Roadmap, Phase, PhaseStatus } from '../../types';

export const SALESFORCE_ROADMAP: Roadmap = {
    id: 'salesforce-architect-track',
    title: 'Salesforce Cloud',
    description: 'The High-Demand Roadmap (Architect Track). From Administrator to Agentforce Specialist.',
    theme: 'BLUE', // Blue for Salesforce
    phases: [
        {
            id: 'sf-phase-1',
            title: 'The Mandatory Foundation: Salesforce Administrator',
            timeframe: 'Month 1-2',
            goal: 'Learn the "Salesforce way" of managing user security and automation.',
            weeklyCommitment: '10-15 Hours',
            status: PhaseStatus.ACTIVE,
            courses: [
                {
                    id: 'c-sf-admin-exam',
                    provider: 'Other',
                    title: 'The Exam: Salesforce Administrator',
                    url: 'https://trailhead.salesforce.com/credentials/administrator',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: [],
                    tracking: {
                        mode: 'QUANTITY',
                        unit: 'exam',
                        current: 0,
                        target: 1,
                        history: []
                    }
                },
                {
                    id: 'c-sf-admin-course',
                    provider: 'Other',
                    title: 'The Course: Administrator Certification Prep',
                    url: 'https://trailhead.salesforce.com/en/content/learn/trails/administrator-certification-prep',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                },
                {
                    id: 'c-sf-admin-study',
                    provider: 'Other',
                    title: 'Pro Study Tool: Focus on Force Admin Study Guide',
                    url: 'https://focusonforce.com/salesforce-administrator-study-guide-2/',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                }
            ],
            milestone: {
                name: 'Certified Administrator',
                date: 'End of Month 2',
                cost: '£149',
                completed: false,
                url: ''
            }
        },
        {
            id: 'sf-phase-2',
            title: 'The Platform Logic: Platform App Builder',
            timeframe: 'Month 3-4',
            goal: 'Build "apps" within Salesforce using low-code tools. Systems-logic overlap with AWS.',
            weeklyCommitment: '10-15 Hours',
            status: PhaseStatus.LOCKED,
            courses: [
                {
                    id: 'c-sf-app-builder-exam',
                    provider: 'Other',
                    title: 'The Exam: Platform App Builder',
                    url: 'https://trailhead.salesforce.com/en/credentials/platformappbuilder',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                },
                {
                    id: 'c-sf-app-builder-course',
                    provider: 'Other',
                    title: 'The Course: Prepare for your Salesforce Platform App Builder Credential',
                    url: 'https://trailhead.salesforce.com/en/users/strailhead/trailmixes/prepare-for-your-salesforce-platform-app-builder-credential',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                }
            ],
            milestone: {
                name: 'Certified Platform App Builder',
                date: 'End of Month 4',
                cost: '$200 (~£155)',
                completed: false,
                url: ''
            }
        },
        {
            id: 'sf-phase-3',
            title: 'The Data Bridge: Data Architect',
            timeframe: 'Month 5-6',
            goal: 'Design "Zero-ETL" integrations—sharing data between AWS S3 and Salesforce.',
            weeklyCommitment: '15-20 Hours',
            status: PhaseStatus.LOCKED,
            courses: [
                {
                    id: 'c-sf-data-arch-exam',
                    provider: 'Other',
                    title: 'The Exam: Data Architect',
                    url: 'https://trailheadacademy.salesforce.com/certificate/exam-data-architect---Plat-Arch-201',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                },
                {
                    id: 'c-sf-data-arch-course',
                    provider: 'Other',
                    title: 'The Course: Architect Journey: Data Architecture',
                    url: 'https://trailhead.salesforce.com/en/users/strailhead/trailmixes/architect-journey-data-architecture',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                },
                {
                    id: 'c-sf-data-arch-study',
                    provider: 'Other',
                    title: 'Pro Study Tool: Focus on Force Data Architect Study Guide',
                    url: 'https://focusonforce.com/salesforce-data-architect-study-guide/',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                }
            ],
            milestone: {
                name: 'Certified Data Architect',
                date: 'End of Month 6',
                cost: '$400 (~£310)',
                completed: false,
                url: ''
            }
        },
        {
            id: 'sf-phase-4',
            title: 'The AWS-Salesforce Link: Platform Integration Architect',
            timeframe: 'Month 7-8',
            goal: 'Connect Salesforce to external cloud systems (AWS Lambda/API Gateway) using OAuth 2.0.',
            weeklyCommitment: '15-20 Hours',
            status: PhaseStatus.LOCKED,
            courses: [
                {
                    id: 'c-sf-integ-arch-exam',
                    provider: 'Other',
                    title: 'The Exam: Integration Architect',
                    url: 'https://trailheadacademy.salesforce.com/certificate/exam-integration-arch---Plat-Arch-204',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                },
                {
                    id: 'c-sf-integ-arch-course',
                    provider: 'Other',
                    title: 'The Course: Architect Journey: Integration Architecture',
                    url: '', // No URL provided in prompt for course specifically, using placeholder or omitting if empty string is allowed. User said "The Course: Architect Journey: Integration Architecture"
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                },
                {
                    id: 'c-sf-integ-arch-study',
                    provider: 'Other',
                    title: 'Pro Study Tool: Focus on Force Integration Architect Guide',
                    url: '', // User text: "Focus on Force Integration Architect Guide"
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                }
            ],
            milestone: {
                name: 'Certified Integration Architect',
                date: 'End of Month 8',
                cost: '$400 (~£310)',
                completed: false,
                url: ''
            }
        },
        {
            id: 'sf-phase-5',
            title: 'The 2026 AI Edge: Agentforce Specialist',
            timeframe: 'Month 9',
            goal: 'Build autonomous AI agents that pull data from AWS architecture to solve customer problems.',
            weeklyCommitment: '10-15 Hours',
            status: PhaseStatus.LOCKED,
            courses: [
                {
                    id: 'c-sf-ai-agent-exam',
                    provider: 'Other',
                    title: 'The Exam: Agentforce Specialist',
                    url: 'https://trailheadacademy.salesforce.com/certificate/exam-agentforce-specialist---AI-201',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                },
                {
                    id: 'c-sf-ai-agent-course',
                    provider: 'Other',
                    title: 'The Course: Become an Agentblazer Champion',
                    url: 'https://trailhead.salesforce.com/en/content/learn/trails/become-an-agentblazer-champion-2026',
                    totalModules: 1,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: []
                }
            ],
            milestone: {
                name: 'Agentforce Specialist',
                date: 'End of Month 9',
                cost: '$200 (~£155)',
                completed: false,
                url: ''
            }
        }
    ],
    resources: [],
    presetLinks: [],
    config: {
        startDate: Date.now(),
        // 9 months deadline approx
        deadline: Date.now() + (1000 * 60 * 60 * 24 * 30 * 9)
    },
    createdAt: Date.now(),
    lastActive: Date.now()
};
