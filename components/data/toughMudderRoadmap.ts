import { Roadmap, Phase, PhaseStatus, Course, Module, Lesson } from '../../types';

// Helper to create workout lessons
const w = (title: string, duration: string, notes: string = ''): Lesson => ({
    id: Math.random().toString(36).substr(2, 9),
    title,
    duration,
    type: 'WORKOUT',
    isCompleted: false,
    notes: notes ? [{ id: Math.random().toString(), content: notes, createdAt: Date.now() }] : []
});

// Helper to create rest days
const r = (title: string = 'Rest & Recovery'): Lesson => ({
    id: Math.random().toString(36).substr(2, 9),
    title,
    duration: '0m',
    type: 'WORKOUT',
    isCompleted: false,
    notes: []
});

// Helper to create a Day (Module) with multiple lessons
const createDay = (id: string, title: string, lessons: Lesson[]): Module => ({
    id,
    title,
    lessons,
    isCompleted: false
});

const createWeek = (id: string, title: string, days: Module[]): Course => {
    return {
        id,
        provider: 'Other',
        title,
        url: '',
        totalModules: 7,
        completedModules: 0,
        modules: days,
        achievements: [],
        isEnabled: true,
        isCustom: true
    };
};

/* 
   DIFFICULTY ADJUSTMENT: Active Plumber (38yo)
   - Skipped Walking phases.
   - Starting with continuous running (15-20m).
   - Higher intensity strength from day 1.
*/

// --- PHASE 1: BUILDING THE BASE (MONTH 1) ---
const PHASE_1_WEEKS: Course[] = [
    createWeek('tm-w1', 'Week 1: Establishing the Baseline', [
        createDay('tm-w1-d1', 'Day 1: Base Run', [
            w('Warmup: Brisk Walk', '5m'),
            w('Run: Continuous Jog (Conversational Pace)', '15m'),
            w('Cooldown: Walk', '5m')
        ]),
        createDay('tm-w1-d2', 'Day 2: Strength Circuit A', [
            w('Warmup: Jumping Jacks & Arm Circles', '5m'),
            w('Circuit 1: 15 Bodyweight Squats', '2m'),
            w('Circuit 1: 10 Pushups', '2m'),
            w('Circuit 1: 30s Plank', '2m'),
            w('Rest 90s', '2m'),
            w('Repeat Circuit x2', '10m'),
            w('Cooldown: Stretch', '5m')
        ]),
        createDay('tm-w1-d3', 'Day 3: Intervals', [
            w('Warmup: Jog', '5m'),
            w('Intervals: 2m Hard Run / 2m Walk x 5', '20m'),
            w('Cooldown: Walk', '5m')
        ]),
        createDay('tm-w1-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w1-d5', 'Day 5: Long Run', [
            w('Warmup: Walk', '5m'),
            w('Run: Continuous Jog', '20m'),
            w('Cooldown: Walk', '5m')
        ]),
        createDay('tm-w1-d6', 'Day 6: Strength Circuit B', [
            w('Warmup', '5m'),
            w('Circuit: 20 Lunges (Total)', '3m'),
            w('Circuit: 10 Burpees (Slow is fine)', '3m'),
            w('Circuit: 40s Plank', '3m'),
            w('Repeat Circuit x3', '15m')
        ]),
        createDay('tm-w1-d7', 'Day 7: Active Recovery', [w('Hike or Long Walk', '45m')])
    ]),
    createWeek('tm-w2', 'Week 2: Increasing Duration', [
        createDay('tm-w2-d1', 'Day 1: Base Run', [
            w('Warmup', '5m'),
            w('Run: Continuous Jog', '20m'),
            w('Cooldown', '5m')
        ]),
        createDay('tm-w2-d2', 'Day 2: Strength', [
            w('Warmup', '5m'),
            w('Circuit: 20 Squats, 12 Pushups, 45s Plank x 3', '20m')
        ]),
        createDay('tm-w2-d3', 'Day 3: Intervals', [
            w('Warmup', '5m'),
            w('Intervals: 3m Run / 1m Walk x 5', '20m'),
            w('Cooldown', '5m')
        ]),
        createDay('tm-w2-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w2-d5', 'Day 5: Long Run', [
            w('Warmup', '5m'),
            w('Run: Continuous Jog', '25m'),
            w('Cooldown', '5m')
        ]),
        createDay('tm-w2-d6', 'Day 6: Strength (Grip Focus)', [
            w('Warmup', '5m'),
            w('Dead Hangs: 3 x Max Time', '10m'),
            w('Farmer Carries (Heavy buckets/tools): 3 x 30m', '10m'),
            w('Pushups: 3 x 10', '5m')
        ]),
        createDay('tm-w2-d7', 'Day 7: Active Recovery', [w('Swim or Cycle', '30m')])
    ]),
    createWeek('tm-w3', 'Week 3: Breaking 30 Minutes', [
        createDay('tm-w3-d1', 'Day 1: Base Run', [w('Warmup', '5m'), w('Run: Continuous', '25m')]),
        createDay('tm-w3-d2', 'Day 2: Strength', [w('Circuit: 25 Squats, 15 Pushups, 60s Plank x 3', '25m')]),
        createDay('tm-w3-d3', 'Day 3: Speed Play', [w('Warmup', '5m'), w('Run: 15m (Surge pace for 30s every 2m)', '15m'), w('Cooldown', '5m')]),
        createDay('tm-w3-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w3-d5', 'Day 5: Long Run', [w('Warmup', '5m'), w('Run: Continuous', '30m')]),
        createDay('tm-w3-d6', 'Day 6: Conditioning', [w('Burpees: 5 sets of 10. Rest 60s between sets.', '15m'), w('Lunges: 3 x 20', '10m')]),
        createDay('tm-w3-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w4', 'Week 4: Volume', [
        createDay('tm-w4-d1', 'Day 1: Base Run', [w('Run: Continuous', '30m')]),
        createDay('tm-w4-d2', 'Day 2: Strength', [w('Circuit: 30 Squats, 20 Pushups, 60s Plank x 3', '30m')]),
        createDay('tm-w4-d3', 'Day 3: Hill Repeats', [w('Find a hill. Sprint up (30s), Walk down. Repeat x 8', '20m')]),
        createDay('tm-w4-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w4-d5', 'Day 5: Long Run', [w('Run: Continuous', '35m')]),
        createDay('tm-w4-d6', 'Day 6: Grip & Pull', [w('Pullups (or negatives): 3 x 5', '10m'), w('Dead Hangs: 3 x Max', '10m')]),
        createDay('tm-w4-d7', 'Day 7: Recovery', [w('Yoga / Stretch', '20m')])
    ])
];

// --- PHASE 2: 5K READINESS & OBSTACLES (MONTH 2) ---
const PHASE_2_WEEKS: Course[] = [
    createWeek('tm-w5', 'Week 5: Pace & Strength', [
        createDay('tm-w5-d1', 'Day 1: Run', [w('Run: 30m Steady', '30m')]),
        createDay('tm-w5-d2', 'Day 2: Strength', [w('Circuit: Burpees, Squats, Pushups x 4 rounds', '25m')]),
        createDay('tm-w5-d3', 'Day 3: Intervals', [w('Run 1k hard, Walk 2m. Repeat x 3', '25m')]),
        createDay('tm-w5-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w5-d5', 'Day 5: Long Run', [w('Run: 40m Continuous', '40m')]),
        createDay('tm-w5-d6', 'Day 6: Obstacle Sim', [w('Run 400m, Do 10 Burpees. Repeat x 4', '20m')]),
        createDay('tm-w5-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w6', 'Week 6: 5k Distance', [
        createDay('tm-w6-d1', 'Day 1: Run', [w('Run: 35m Steady', '35m')]),
        createDay('tm-w6-d2', 'Day 2: Strength', [w('Upper Body Focus: Pushups, Pullups, Dips', '30m')]),
        createDay('tm-w6-d3', 'Day 3: Speed', [w('Run: 20m Tempo (Uncomfortably fast)', '20m')]),
        createDay('tm-w6-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w6-d5', 'Day 5: Test Run', [w('Run: 5k Distance (3.1 miles) - Time yourself', '40m')]),
        createDay('tm-w6-d6', 'Day 6: Grip', [w('Farmer Carry 400m total', '15m'), w('Dead Hangs', '10m')]),
        createDay('tm-w6-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w7', 'Week 7: Intensity', [
        createDay('tm-w7-d1', 'Day 1: Run', [w('Run: 35m Hilly', '35m')]),
        createDay('tm-w7-d2', 'Day 2: Strength', [w('Circuit: 50 Squats, 30 Pushups, 20 Lunges, 10 Pullups. For time.', '20m')]),
        createDay('tm-w7-d3', 'Day 3: Intervals', [w('Sprint 100m, Walk 100m x 10', '20m')]),
        createDay('tm-w7-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w7-d5', 'Day 5: Long Run', [w('Run: 45m Continuous', '45m')]),
        createDay('tm-w7-d6', 'Day 6: Obstacle Sim', [w('Bear Crawl 50m', '5m'), w('Broad Jumps 50m', '5m'), w('Run 1 mile', '10m')]),
        createDay('tm-w7-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w8', 'Week 8: Taper & Prep', [
        createDay('tm-w8-d1', 'Day 1: Run', [w('Run: 30m Easy', '30m')]),
        createDay('tm-w8-d2', 'Day 2: Strength', [w('Light Circuit: 2 rounds', '15m')]),
        createDay('tm-w8-d3', 'Day 3: Shakeout', [w('Run: 15m Easy', '15m')]),
        createDay('tm-w8-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w8-d5', 'Day 5: Rest', [r()]),
        // Assuming 5k event is here or in Phase 3
        createDay('tm-w8-d6', 'Day 6: Event Prep', [w('Hydrate & Stretch', '20m')]),
        createDay('tm-w8-d7', 'Day 7: Rest', [r()])
    ])
];

// --- PHASE 3: 5K EVENT & RECOVERY (MONTH 3) ---
const PHASE_3_WEEKS: Course[] = [
    createWeek('tm-w9', 'Week 9: RACE WEEK', [
        createDay('tm-w9-d1', 'Day 1: Easy Run', [w('Run: 20m Easy', '20m')]),
        createDay('tm-w9-d2', 'Day 2: Rest', [r()]),
        createDay('tm-w9-d3', 'Day 3: Rest', [r()]),
        createDay('tm-w9-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w9-d5', 'Day 5: Shakeout', [w('Run: 10m Very Easy', '10m')]),
        createDay('tm-w9-d6', 'Day 6: THE EVENT', [w('EVENT: TOUGH MUDDER 5K!', '3h')]),
        createDay('tm-w9-d7', 'Day 7: Rest', [r('Recovery')])
    ]),
    createWeek('tm-w10', 'Week 10: Recovery', [
        createDay('tm-w10-d1', 'Day 1: Rest', [r()]),
        createDay('tm-w10-d2', 'Day 2: Walk', [w('Walk: 30m', '30m')]),
        createDay('tm-w10-d3', 'Day 3: Rest', [r()]),
        createDay('tm-w10-d4', 'Day 4: Easy Run', [w('Run: 20m Easy', '20m')]),
        createDay('tm-w10-d5', 'Day 5: Swim/Cycle', [w('Cross Train: 30m', '30m')]),
        createDay('tm-w10-d6', 'Day 6: Rest', [r()]),
        createDay('tm-w10-d7', 'Day 7: Walk', [w('Walk: 45m', '45m')])
    ]),
    createWeek('tm-w11', 'Week 11: Re-Building', [
        createDay('tm-w11-d1', 'Day 1: Run', [w('Run: 30m', '30m')]),
        createDay('tm-w11-d2', 'Day 2: Strength', [w('Circuit: Standard', '25m')]),
        createDay('tm-w11-d3', 'Day 3: Run', [w('Run: 35m', '35m')]),
        createDay('tm-w11-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w11-d5', 'Day 5: Long Run', [w('Run: 45m', '45m')]),
        createDay('tm-w11-d6', 'Day 6: Strength', [w('Gym: Deadlifts/Squats if available, or heavy carry', '30m')]),
        createDay('tm-w11-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w12', 'Week 12: Volume Increase', [
        createDay('tm-w12-d1', 'Day 1: Run', [w('Run: 35m', '35m')]),
        createDay('tm-w12-d2', 'Day 2: Strength', [w('Circuit: High Intensity', '30m')]),
        createDay('tm-w12-d3', 'Day 3: Hills', [w('Hill Sprints x 10', '25m')]),
        createDay('tm-w12-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w12-d5', 'Day 5: Long Run', [w('Run: 50m', '50m')]),
        createDay('tm-w12-d6', 'Day 6: Grip', [w('Chin-ups: 3 x Max', '10m'), w('Hangs', '5m')]),
        createDay('tm-w12-d7', 'Day 7: Rest', [r()])
    ])
];

// --- PHASE 4: BRIDGE TO 10K (MONTH 4) ---
const PHASE_4_WEEKS: Course[] = [
    createWeek('tm-w13', 'Week 13: 10k Base', [
        createDay('tm-w13-d1', 'Day 1: Run', [w('Run: 40m', '40m')]),
        createDay('tm-w13-d2', 'Day 2: Strength', [w('Leg Blaster Circuit (Squats, Lunges, Jumps)', '20m')]),
        createDay('tm-w13-d3', 'Day 3: Tempo', [w('Run: 10m Warmup, 20m Hard, 10m Cool', '40m')]),
        createDay('tm-w13-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w13-d5', 'Day 5: Long Run', [w('Run: 60m (approx 5-6 miles)', '60m')]),
        createDay('tm-w13-d6', 'Day 6: Conditioning', [w('Burpee Broad Jumps: 5 x 20m', '15m')]),
        createDay('tm-w13-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w14', 'Week 14: Strength Endurance', [
        createDay('tm-w14-d1', 'Day 1: Run', [w('Run: 40m', '40m')]),
        createDay('tm-w14-d2', 'Day 2: Strength', [w('Circuit: 50 reps of everything.', '30m')]),
        createDay('tm-w14-d3', 'Day 3: Intervals', [w('800m repeats x 4', '30m')]),
        createDay('tm-w14-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w14-d5', 'Day 5: Long Run', [w('Run: 65m', '65m')]),
        createDay('tm-w14-d6', 'Day 6: Grip', [w('Farmer Carry: 1 mile total (break as needed)', '20m')]),
        createDay('tm-w14-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w15', 'Week 15: Speed', [
        createDay('tm-w15-d1', 'Day 1: Run', [w('Run: 45m', '45m')]),
        createDay('tm-w15-d2', 'Day 2: Strength', [w('Power Focus: Box Jumps/Sprints', '25m')]),
        createDay('tm-w15-d3', 'Day 3: Intervals', [w('400m repeats x 8', '30m')]),
        createDay('tm-w15-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w15-d5', 'Day 5: Long Run', [w('Run: 70m', '70m')]),
        createDay('tm-w15-d6', 'Day 6: Conditioning', [w('Bear Crawl mile (break effectively)', '30m')]),
        createDay('tm-w15-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w16', 'Week 16: Peak Volume', [
        createDay('tm-w16-d1', 'Day 1: Run', [w('Run: 50m', '50m')]),
        createDay('tm-w16-d2', 'Day 2: Strength', [w('Circuit: Max Reps', '30m')]),
        createDay('tm-w16-d3', 'Day 3: Hills', [w('Hill Repeats x 12', '30m')]),
        createDay('tm-w16-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w16-d5', 'Day 5: Long Run', [w('Run: 80m (approx 7-8 miles)', '80m')]),
        createDay('tm-w16-d6', 'Day 6: Mixed', [w('Run 1 mile, 50 Burpees, Run 1 mile', '40m')]),
        createDay('tm-w16-d7', 'Day 7: Rest', [r()])
    ])
];

// --- PHASE 5: 10K PEAK (MONTH 5) ---
const PHASE_5_WEEKS: Course[] = [
    createWeek('tm-w17', 'Week 17: Simulation', [
        createDay('tm-w17-d1', 'Day 1: Run', [w('Run: 45m', '45m')]),
        createDay('tm-w17-d2', 'Day 2: Strength', [w('Grip strength max', '20m')]),
        createDay('tm-w17-d3', 'Day 3: Tempo', [w('Run: 30m Hard', '30m')]),
        createDay('tm-w17-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w17-d5', 'Day 5: Long Run', [w('Run: 60m', '60m')]),
        createDay('tm-w17-d6', 'Day 6: Sim', [w('Wet/Cold training (if safe). Run with wet clothes/shoes.', '30m')]),
        createDay('tm-w17-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w18', 'Week 18: Peak', [
        createDay('tm-w18-d1', 'Day 1: Run', [w('Run: 50m', '50m')]),
        createDay('tm-w18-d2', 'Day 2: Strength', [w('Maintenance', '20m')]),
        createDay('tm-w18-d3', 'Day 3: Speed', [w('Run: Fartlek (Speed play)', '30m')]),
        createDay('tm-w18-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w18-d5', 'Day 5: Long Run', [w('Run: 90m (Over-distance)', '90m')]),
        createDay('tm-w18-d6', 'Day 6: Easy', [w('Run: 20m Easy', '20m')]),
        createDay('tm-w18-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w19', 'Week 19: Taper', [
        createDay('tm-w19-d1', 'Day 1: Run', [w('Run: 30m', '30m')]),
        createDay('tm-w19-d2', 'Day 2: Strength', [w('Light', '15m')]),
        createDay('tm-w19-d3', 'Day 3: Easy', [w('Run: 20m', '20m')]),
        createDay('tm-w19-d4', 'Day 4: Rest', [r()]),
        createDay('tm-w19-d5', 'Day 5: Long Run', [w('Run: 45m', '45m')]),
        createDay('tm-w19-d6', 'Day 6: Rest', [r()]),
        createDay('tm-w19-d7', 'Day 7: Rest', [r()])
    ]),
    createWeek('tm-w20', 'Week 20: RACE WEEK', [
        createDay('tm-w20-d1', 'Day 1: Easy', [w('Run: 20m', '20m')]),
        createDay('tm-w20-d2', 'Day 2: Rest', [r()]),
        createDay('tm-w20-d3', 'Day 3: Rest', [r()]),
        createDay('tm-w20-d4', 'Day 4: Shakeout', [w('Run: 10m', '10m')]),
        createDay('tm-w20-d5', 'Day 5: Rest', [r()]),
        createDay('tm-w20-d6', 'Day 6: THE EVENT', [w('EVENT: TOUGH MUDDER 10K!', '4h')]),
        createDay('tm-w20-d7', 'Day 7: GLORY', [r('Celebrate!')])
    ])
];

export const TOUGH_MUDDER_ROADMAP: Roadmap = {
    id: 'tough-mudder-training',
    title: 'Zero to Tough Mudder (5k & 10k)',
    description: 'A comprehensive 5-month physical training plan taking you from active job to 10k obstacle course finisher.',
    theme: 'ORANGE',
    category: 'FITNESS',
    phases: [
        {
            id: 'tm-p1',
            title: 'Phase 1: Establishing Baseline',
            timeframe: 'Feb 15 - Mar 15',
            goal: 'Build running volume and basic strength.',
            weeklyCommitment: '4 Hours',
            status: PhaseStatus.ACTIVE,
            courses: PHASE_1_WEEKS,
            milestone: {
                name: 'Run 30 mins continuous',
                date: 'Mar 15, 2026',
                cost: '$0',
                completed: false
            }
        },
        {
            id: 'tm-p2',
            title: 'Phase 2: 5k Readiness',
            timeframe: 'Mar 15 - Apr 15',
            goal: 'Run 5k distance and build grip strength.',
            weeklyCommitment: '5 Hours',
            status: PhaseStatus.LOCKED,
            courses: PHASE_2_WEEKS,
            milestone: {
                name: 'Run 5k Distance',
                date: 'Apr 15, 2026',
                cost: '$0',
                completed: false
            }
        },
        {
            id: 'tm-p3',
            title: 'Phase 3: The 5k Event',
            timeframe: 'Apr 15 - May 9',
            goal: 'Complete the 5k event & Recover.',
            weeklyCommitment: 'Variable',
            status: PhaseStatus.LOCKED,
            courses: PHASE_3_WEEKS,
            milestone: {
                name: 'Tough Mudder 5k Completed',
                date: 'May 9, 2026',
                cost: 'Ticket Price',
                completed: false
            }
        },
        {
            id: 'tm-p4',
            title: 'Phase 4: Bridge to 10k',
            timeframe: 'May 10 - June 30',
            goal: 'Increase mileage and durability for 10k.',
            weeklyCommitment: '6 Hours',
            status: PhaseStatus.LOCKED,
            courses: PHASE_4_WEEKS,
            milestone: {
                name: 'Run 6 Miles',
                date: 'June 30, 2026',
                cost: '$0',
                completed: false
            }
        },
        {
            id: 'tm-p5',
            title: 'Phase 5: 10k Peak',
            timeframe: 'July 1 - Aug 2026',
            goal: 'Peak training and Obstacle Simulation.',
            weeklyCommitment: '6+ Hours',
            status: PhaseStatus.LOCKED,
            courses: PHASE_5_WEEKS,
            milestone: {
                name: 'Tough Mudder 10k Completed',
                date: 'August 2026',
                cost: 'Ticket Price',
                completed: false
            }
        }
    ],
    resources: [],
    presetLinks: [],
    config: {
        startDate: Date.now(),
        deadline: Date.now() + (1000 * 60 * 60 * 24 * 150) // ~5 months
    },
    createdAt: Date.now(),
    lastActive: Date.now()
};
