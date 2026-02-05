import { Roadmap, Phase, PhaseStatus } from '../../types';

export const SPANISH_ROADMAP: Roadmap = {
    id: 'spanish-language-mastery',
    title: 'Spanish Language Mastery',
    description: 'From zero to conversational fluency in 3 months using immersion and input hypothesis.',
    theme: 'GREEN',
    phases: [
        {
            id: 'es-phase-1',
            title: 'Month 1: Building the Skeleton',
            timeframe: 'Month 1',
            goal: 'Understand how Spanish works and master the 500 most common words.',
            weeklyCommitment: '14-16 Hours',
            status: PhaseStatus.ACTIVE,
            courses: [
                {
                    id: 'c-lang-transfer',
                    provider: 'Other',
                    title: 'Language Transfer (Complete Spanish)',
                    url: 'https://www.languagetransfer.org/complete-spanish',
                    totalModules: 9,
                    completedModules: 0,
                    isEnabled: true,
                    isCustom: true,
                    achievements: [],
                    modules: [
                        {
                            id: 'm1',
                            title: 'The Foundation (1-10)',
                            lessons: [
                                { id: 'l1', title: 'Lesson 1', duration: '5:34', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l2', title: 'Lesson 2', duration: '7:58', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l3', title: 'Lesson 3', duration: '6:14', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l4', title: 'Lesson 4', duration: '8:28', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l5', title: 'Lesson 5', duration: '9:24', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l6', title: 'Lesson 6', duration: '7:04', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l7', title: 'Lesson 7', duration: '10:15', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l8', title: 'Lesson 8', duration: '7:33', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l9', title: 'Lesson 9', duration: '9:08', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l10', title: 'Lesson 10', duration: '12:27', isCompleted: false, type: 'VIDEO', notes: [] }
                            ]
                        },
                        {
                            id: 'm2',
                            title: 'Word Connections (11-20)',
                            lessons: [
                                { id: 'l11', title: 'Lesson 11', duration: '10:52', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l12', title: 'Lesson 12', duration: '13:53', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l13', title: 'Lesson 13', duration: '9:37', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l14', title: 'Lesson 14', duration: '15:10', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l15', title: 'Lesson 15', duration: '9:00', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l16', title: 'Lesson 16', duration: '7:38', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l17', title: 'Lesson 17', duration: '13:22', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l18', title: 'Lesson 18', duration: '6:50', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l19', title: 'Lesson 19', duration: '7:02', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l20', title: 'Lesson 20', duration: '9:21', isCompleted: false, type: 'VIDEO', notes: [] }
                            ]
                        },
                        {
                            id: 'm3',
                            title: 'Verb Patterns I (21-30)',
                            lessons: [
                                { id: 'l21', title: 'Lesson 21', duration: '12:13', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l22', title: 'Lesson 22', duration: '13:10', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l23', title: 'Lesson 23', duration: '6:58', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l24', title: 'Lesson 24', duration: '5:44', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l25', title: 'Lesson 25', duration: '12:07', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l26', title: 'Lesson 26', duration: '8:44', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l27', title: 'Lesson 27', duration: '10:45', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l28', title: 'Lesson 28', duration: '11:22', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l29', title: 'Lesson 29', duration: '8:47', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l30', title: 'Lesson 30', duration: '7:30', isCompleted: false, type: 'VIDEO', notes: [] }
                            ]
                        },
                        {
                            id: 'm4',
                            title: 'Expression & Flow (31-40)',
                            lessons: [
                                { id: 'l31', title: 'Lesson 31', duration: '7:00', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l32', title: 'Lesson 32', duration: '9:40', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l33', title: 'Lesson 33', duration: '8:43', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l34', title: 'Lesson 34', duration: '9:06', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l35', title: 'Lesson 35', duration: '5:41', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l36', title: 'Lesson 36', duration: '11:02', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l37', title: 'Lesson 37', duration: '13:19', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l38', title: 'Lesson 38', duration: '9:24', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l39', title: 'Lesson 39', duration: '10:35', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l40', title: 'Lesson 40', duration: '12:39', isCompleted: false, type: 'VIDEO', notes: [] }
                            ]
                        },
                        {
                            id: 'm5',
                            title: 'Advanced Structure (41-50)',
                            lessons: [
                                { id: 'l41', title: 'Lesson 41', duration: '13:06', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l42', title: 'Lesson 42', duration: '7:04', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l43', title: 'Lesson 43', duration: '9:05', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l44', title: 'Lesson 44', duration: '10:07', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l45', title: 'Lesson 45', duration: '12:51', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l46', title: 'Lesson 46', duration: '10:50', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l47', title: 'Lesson 47', duration: '9:35', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l48', title: 'Lesson 48', duration: '11:00', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l49', title: 'Lesson 49', duration: '10:49', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l50', title: 'Lesson 50', duration: '9:23', isCompleted: false, type: 'VIDEO', notes: [] }
                            ]
                        },
                        {
                            id: 'm6',
                            title: 'Verb Patterns II (51-60)',
                            lessons: [
                                { id: 'l51', title: 'Lesson 51', duration: '12:19', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l52', title: 'Lesson 52', duration: '14:30', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l53', title: 'Lesson 53', duration: '8:18', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l54', title: 'Lesson 54', duration: '9:42', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l55', title: 'Lesson 55', duration: '15:39', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l56', title: 'Lesson 56', duration: '13:44', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l57', title: 'Lesson 57', duration: '11:29', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l58', title: 'Lesson 58', duration: '9:08', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l59', title: 'Lesson 59', duration: '10:43', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l60', title: 'Lesson 60', duration: '8:26', isCompleted: false, type: 'VIDEO', notes: [] }
                            ]
                        },
                        {
                            id: 'm7',
                            title: 'Commanding the Language (61-70)',
                            lessons: [
                                { id: 'l61', title: 'Lesson 61', duration: '7:59', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l62', title: 'Lesson 62', duration: '11:53', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l63', title: 'Lesson 63', duration: '4:58', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l64', title: 'Lesson 64', duration: '13:24', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l65', title: 'Lesson 65', duration: '15:06', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l66', title: 'Lesson 66', duration: '4:57', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l67', title: 'Lesson 67', duration: '11:43', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l68', title: 'Lesson 68', duration: '8:09', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l69', title: 'Lesson 69', duration: '9:29', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l70', title: 'Lesson 70', duration: '10:58', isCompleted: false, type: 'VIDEO', notes: [] }
                            ]
                        },
                        {
                            id: 'm8',
                            title: 'Past & Present (71-80)',
                            lessons: [
                                { id: 'l71', title: 'Lesson 71', duration: '12:40', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l72', title: 'Lesson 72', duration: '13:00', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l73', title: 'Lesson 73', duration: '8:03', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l74', title: 'Lesson 74', duration: '9:07', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l75', title: 'Lesson 75', duration: '9:20', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l76', title: 'Lesson 76', duration: '8:10', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l77', title: 'Lesson 77', duration: '6:55', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l78', title: 'Lesson 78', duration: '9:23', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l79', title: 'Lesson 79', duration: '7:09', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l80', title: 'Lesson 80', duration: '7:09', isCompleted: false, type: 'VIDEO', notes: [] }
                            ]
                        },
                        {
                            id: 'm9',
                            title: 'The Final Stretch (81-90)',
                            lessons: [
                                { id: 'l81', title: 'Lesson 81', duration: '11:56', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l82', title: 'Lesson 82', duration: '6:44', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l83', title: 'Lesson 83', duration: '8:11', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l84', title: 'Lesson 84', duration: '7:52', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l85', title: 'Lesson 85', duration: '4:51', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l86', title: 'Lesson 86', duration: '8:58', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l87', title: 'Lesson 87', duration: '10:17', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l88', title: 'Lesson 88', duration: '9:37', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l89', title: 'Lesson 89', duration: '8:17', isCompleted: false, type: 'VIDEO', notes: [] },
                                { id: 'l90', title: 'Lesson 90', duration: '6:53', isCompleted: false, type: 'VIDEO', notes: [] }
                            ]
                        }
                    ]
                },
                {
                    id: 'c-duolingo-1',
                    provider: 'Other',
                    title: 'Duolingo Daily (15+ mins)',
                    url: 'https://www.duolingo.com/',
                    totalModules: 30,
                    completedModules: 0,
                    modules: [],
                    achievements: [],
                    isEnabled: true,
                    isCustom: true,
                    tracking: {
                        mode: 'TIME',
                        unit: 'minutes',
                        current: 0,
                        target: 450, // 15 mins * 30 days
                        dailyTarget: 15,
                        history: []
                    }
                },
                {
                    id: 'c-anki-500',
                    provider: 'Other',
                    title: 'Anki + Memrise: Top 500 Words',
                    url: 'https://apps.ankiweb.net/',
                    totalModules: 1,
                    completedModules: 0,
                    modules: [],
                    achievements: [],
                    isEnabled: true,
                    isCustom: true,
                    tracking: {
                        mode: 'QUANTITY',
                        unit: 'words',
                        current: 0,
                        target: 500,
                        history: []
                    }
                },
                {
                    id: 'c-dreaming-superbeginner',
                    provider: 'Other',
                    title: 'Dreaming Spanish (Superbeginner)',
                    url: 'https://www.dreamingspanish.com/watch?level=superbeginner',
                    totalModules: 1,
                    completedModules: 0,
                    modules: [],
                    achievements: [],
                    isEnabled: true,
                    isCustom: true,
                    tracking: {
                        mode: 'TIME',
                        unit: 'hours',
                        current: 0,
                        target: 15, // Approx
                        history: []
                    }
                }
            ],
            milestone: {
                name: 'Basic Comprehension & 500 Words',
                date: 'End of Month 1',
                cost: '$0-20',
                completed: false,
                url: ''
            }
        },
        {
            id: 'es-phase-2',
            title: 'Month 2: The Input Flood',
            timeframe: 'Month 2',
            goal: 'Train ears to native speed and double vocabulary.',
            weeklyCommitment: '15-20 Hours',
            status: PhaseStatus.LOCKED,
            courses: [
                {
                    id: 'c-dreaming-beginner',
                    provider: 'Other',
                    title: 'Dreaming Spanish (Beginner)',
                    url: 'https://www.dreamingspanish.com/watch?level=beginner',
                    totalModules: 1,
                    completedModules: 0,
                    modules: [],
                    achievements: [],
                    isEnabled: true,
                    isCustom: true,
                    tracking: {
                        mode: 'TIME',
                        unit: 'hours',
                        current: 0,
                        target: 50,
                        history: []
                    }
                },
                {
                    id: 'c-anki-1000',
                    provider: 'Other',
                    title: 'Anki + Memrise: Top 1000 Words',
                    url: 'https://apps.ankiweb.net/',
                    totalModules: 1,
                    completedModules: 0,
                    modules: [],
                    achievements: [],
                    isEnabled: true,
                    isCustom: true,
                    tracking: {
                        mode: 'QUANTITY',
                        unit: 'words',
                        current: 0,
                        target: 1000,
                        history: []
                    }
                },
                {
                    id: 'c-tutoring-light',
                    provider: 'Other',
                    title: 'BaseLang/Preply (3x/Week)',
                    url: 'https://baselang.com/',
                    totalModules: 12,
                    completedModules: 0,
                    modules: [],
                    achievements: [],
                    isEnabled: true,
                    isCustom: true,
                    tracking: {
                        mode: 'TIME',
                        unit: 'sessions',
                        current: 0,
                        target: 12, // 4 weeks * 3
                        history: []
                    }
                }
            ],
            milestone: {
                name: 'Descriptive Fluency',
                date: 'End of Month 2',
                cost: '$150 (Tutoring)',
                completed: false,
                url: ''
            }
        },
        {
            id: 'es-phase-3',
            title: 'Month 3: The Deep End (Output)',
            timeframe: 'Month 3',
            goal: 'Conversational confidence and being understood.',
            weeklyCommitment: '20+ Hours',
            status: PhaseStatus.LOCKED,
            courses: [
                {
                    id: 'c-tutoring-heavy',
                    provider: 'Other',
                    title: 'BaseLang: Unlimited "Artificial Immersion"',
                    url: 'https://baselang.com/',
                    totalModules: 30, // Daily
                    completedModules: 0,
                    modules: [],
                    achievements: [],
                    isEnabled: true,
                    isCustom: true,
                    tracking: {
                        mode: 'TIME',
                        unit: 'minutes',
                        current: 0,
                        target: 1800, // 30 days * 60 mins
                        history: []
                    }
                },
                {
                    id: 'c-easy-spanish',
                    provider: 'Other',
                    title: 'Easy Spanish (YouTube) - Slang & Fillers',
                    url: 'https://www.youtube.com/@EasySpanish',
                    totalModules: 1,
                    completedModules: 0,
                    modules: [],
                    achievements: [],
                    isEnabled: true,
                    isCustom: true,
                    tracking: {
                        mode: 'TIME',
                        unit: 'hours',
                        current: 0,
                        target: 15,
                        history: []
                    }
                },
                {
                    id: 'c-digital-switch',
                    provider: 'Other',
                    title: 'The 24/7 Digital Switch',
                    url: '',
                    totalModules: 1,
                    completedModules: 0,
                    modules: [],
                    achievements: [],
                    isEnabled: true,
                    isCustom: true
                }
            ],
            milestone: {
                name: 'Conversational Confidence',
                date: 'End of Month 3',
                cost: '$150 (BaseLang)',
                completed: false,
                url: ''
            }
        }
    ],
    resources: [],
    presetLinks: [],
    config: {
        startDate: Date.now(),
        // 90 days deadline
        deadline: Date.now() + (1000 * 60 * 60 * 24 * 90)
    },
    createdAt: Date.now(),
    lastActive: Date.now()
};
