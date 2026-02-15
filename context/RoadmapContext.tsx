import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Roadmap, Phase, Resource, PresetLink, RoadmapTheme, AppSettings } from '../types';
import { SPANISH_ROADMAP } from '../components/data/spanishRoadmap';
import { SALESFORCE_ROADMAP } from '../components/data/salesforceRoadmap';
import { INITIAL_PHASES, PRESET_LINKS_DEFAULT } from '../constants';

// --- TYPES & INTERFACES ---

interface RoadmapContextType {
    roadmaps: Roadmap[];
    activeRoadmapId: string;
    activeRoadmap: Roadmap | null;
    createRoadmap: (title: string, theme: RoadmapTheme, description: string) => Promise<string>;
    deleteRoadmap: (id: string) => void;
    selectRoadmap: (id: string) => void;
    updateActiveRoadmap: (updates: Partial<Roadmap>) => void;
    updateRoadmapPhases: (roadmapId: string, phases: Phase[]) => void;
    isLoading: boolean;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

const STORAGE_KEY_ROADMAPS = 'cloudflow_all_roadmaps';
const STORAGE_KEY_ACTIVE_ID = 'cloudflow_active_roadmap_id';

// --- MIGRATION HELPERS ---

const migrateLegacyData = (): Roadmap[] | null => {
    const legacyPhases = localStorage.getItem('cloudflow_phases');
    const legacyResources = localStorage.getItem('cloudflow_resources');
    const legacyPresets = localStorage.getItem('cloudflow_preset_links');
    const legacyProfile = localStorage.getItem('cloudflow_profile');

    // If we have legacy data but no new roadmaps, migrate it
    if (legacyPhases || legacyProfile) {
        console.log("Migrating legacy data to new Roadmap structure...");

        let parsedPhases = INITIAL_PHASES;
        let startDate = Date.now();

        if (legacyPhases) {
            try {
                // Apply saved progress to initial phases (reusing logic from old App.tsx)
                const saved = JSON.parse(legacyPhases);
                parsedPhases = INITIAL_PHASES.map(ip => {
                    const found = saved.find((s: Phase) => s.id === ip.id);
                    if (found) {
                        return {
                            ...ip,
                            status: found.status,
                            courses: ip.courses.map(c => {
                                const savedCourse = found.courses.find((sc: any) => sc.id === c.id);
                                return savedCourse ? { ...c, completedModules: savedCourse.completedModules, modules: savedCourse.modules, isEnabled: savedCourse.isEnabled, isCustom: savedCourse.isCustom } : c;
                            }),
                            milestone: { ...ip.milestone, completed: found.milestone.completed }
                        };
                    }
                    return ip;
                });
            } catch (e) {
                console.error("Migration phase parse error", e);
            }
        }

        if (legacyProfile) {
            const p = JSON.parse(legacyProfile);
            if (p.startDate) startDate = p.startDate;

            // IMPORTANT: Migrate the legacy profile to the NEW isolated key format
            // The ID for the legacy roadmap will be 'legacy-cloud-roadmap'
            localStorage.setItem('cloudflow_profile_legacy-cloud-roadmap', legacyProfile);
        }

        const legacyRoadmap: Roadmap = {
            id: 'legacy-cloud-roadmap',
            title: 'AWS Cloud Architect',
            description: 'Legacy roadmap migrated from previous version.',
            theme: 'ORANGE',
            phases: parsedPhases,
            resources: legacyResources ? JSON.parse(legacyResources) : [],
            presetLinks: legacyPresets ? JSON.parse(legacyPresets) : PRESET_LINKS_DEFAULT,
            config: {
                startDate: startDate,
                deadline: new Date(startDate + (1000 * 60 * 60 * 24 * 365 * 2.5)).getTime()
            },
            createdAt: startDate,
            lastActive: Date.now()
        };

        return [legacyRoadmap];
    }
    return null;
};

// --- PROVIDER COMPONENT ---

export const RoadmapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [activeRoadmapId, setActiveRoadmapId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    // Load Data
    useEffect(() => {
        const loadData = () => {
            const savedRoadmaps = localStorage.getItem(STORAGE_KEY_ROADMAPS);
            const savedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);

            let loadedRoadmaps: Roadmap[] = [];

            if (savedRoadmaps) {
                try {
                    loadedRoadmaps = JSON.parse(savedRoadmaps);
                } catch (e) {
                    console.error("Failed to parse roadmaps", e);
                }
            }

            // Migration Check
            if (loadedRoadmaps.length === 0) {
                const migrated = migrateLegacyData();
                if (migrated) {
                    loadedRoadmaps = migrated;
                    localStorage.setItem(STORAGE_KEY_ROADMAPS, JSON.stringify(loadedRoadmaps));
                } else {
                    // Create Default if truly empty and no legacy
                    const defaultRoadmap: Roadmap = {
                        id: 'aws-cloud-architect',
                        title: 'AWS Cloud Architect',
                        description: 'The gold standard path from zero to Professional Architect.',
                        theme: 'ORANGE',
                        phases: INITIAL_PHASES,
                        resources: [],
                        presetLinks: PRESET_LINKS_DEFAULT,
                        config: {
                            startDate: Date.now(),
                            deadline: Date.now() + (1000 * 60 * 60 * 24 * 365 * 2)
                        },
                        createdAt: Date.now(),
                        lastActive: Date.now()
                    };
                    loadedRoadmaps = [defaultRoadmap];
                    localStorage.setItem(STORAGE_KEY_ROADMAPS, JSON.stringify(loadedRoadmaps));

                    // Initialize default profile for this new roadmap
                    const defaultProfile = {
                        xp: 0,
                        level: 1,
                        streak: 1,
                        lastLogin: new Date().toISOString(),
                        startDate: Date.now(),
                        deadline: defaultRoadmap.config.deadline
                    };
                    localStorage.setItem(`cloudflow_profile_${defaultRoadmap.id}`, JSON.stringify(defaultProfile));
                }
            }

            // INJECTION: Ensure Spanish Roadmap exists (if not already present)
            if (!loadedRoadmaps.find(r => r.id === SPANISH_ROADMAP.id)) {
                loadedRoadmaps.push(SPANISH_ROADMAP);
                localStorage.setItem(STORAGE_KEY_ROADMAPS, JSON.stringify(loadedRoadmaps));

                // Initialize Profile for Spanish roadmap
                const initialProfile = {
                    xp: 0,
                    level: 1,
                    streak: 1,
                    lastLogin: new Date().toISOString(),
                    startDate: SPANISH_ROADMAP.config.startDate,
                    deadline: SPANISH_ROADMAP.config.deadline
                };
                localStorage.setItem(`cloudflow_profile_${SPANISH_ROADMAP.id}`, JSON.stringify(initialProfile));
            }

            // INJECTION: Ensure Salesforce Roadmap exists
            if (!loadedRoadmaps.find(r => r.id === SALESFORCE_ROADMAP.id)) {
                loadedRoadmaps.push(SALESFORCE_ROADMAP);
                localStorage.setItem(STORAGE_KEY_ROADMAPS, JSON.stringify(loadedRoadmaps));

                // Initialize Profile for Salesforce roadmap
                const initialProfile = {
                    xp: 0,
                    level: 1,
                    streak: 1,
                    lastLogin: new Date().toISOString(),
                    startDate: SALESFORCE_ROADMAP.config.startDate,
                    deadline: SALESFORCE_ROADMAP.config.deadline
                };
                localStorage.setItem(`cloudflow_profile_${SALESFORCE_ROADMAP.id}`, JSON.stringify(initialProfile));
            }

            setRoadmaps(loadedRoadmaps);

            // AUTO-SELECT LOGIC:
            // If we want RoadmapOS Launcher to be default, we DO NOT set activeRoadmapId here.
            // Only set it if the user specifically asked specifically? No, user said "implement RoadmapOS launcher".
            // So we leave it empty.
            setActiveRoadmapId('');

            setIsLoading(false);
        };

        loadData();
    }, []);

    // Persist Roadmaps
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY_ROADMAPS, JSON.stringify(roadmaps));
        }
    }, [roadmaps, isLoading]);

    // Persist Active ID
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeRoadmapId);
        }
    }, [activeRoadmapId, isLoading]);


    const createRoadmap = async (title: string, theme: RoadmapTheme, description: string): Promise<string> => {
        const newRoadmap: Roadmap = {
            id: crypto.randomUUID(),
            title,
            description,
            theme,
            phases: [], // Initially empty, populated by Wizard potentially
            resources: [],
            presetLinks: [],
            config: {
                startDate: Date.now(),
                deadline: Date.now() + (1000 * 60 * 60 * 24 * 180) // default 6 months
            },
            createdAt: Date.now(),
            lastActive: Date.now()
        };

        setRoadmaps(prev => [...prev, newRoadmap]);
        setActiveRoadmapId(newRoadmap.id);

        // Initialize Profile for new roadmap
        const initialProfile = {
            xp: 0,
            level: 1,
            streak: 1,
            lastLogin: new Date().toISOString(),
            startDate: newRoadmap.config.startDate,
            deadline: newRoadmap.config.deadline
        };
        localStorage.setItem(`cloudflow_profile_${newRoadmap.id}`, JSON.stringify(initialProfile));

        return newRoadmap.id;
    };

    const deleteRoadmap = (id: string) => {
        setRoadmaps(prev => prev.filter(r => r.id !== id));
        if (activeRoadmapId === id) {
            setActiveRoadmapId('');
        }
        // Cleanup profile? Maybe keep just in case of accidental delete? 
        // For now, keep it simple.
    };

    const selectRoadmap = (id: string) => {
        setRoadmaps(prev => prev.map(r => r.id === id ? { ...r, lastActive: Date.now() } : r));
        setActiveRoadmapId(id);
    };

    const updateActiveRoadmap = (updates: Partial<Roadmap>) => {
        if (!activeRoadmapId) return;
        setRoadmaps(prev => prev.map(r => r.id === activeRoadmapId ? { ...r, ...updates } : r));
    };

    const updateRoadmapPhases = (roadmapId: string, phases: Phase[]) => {
        setRoadmaps(prev => prev.map(r => r.id === roadmapId ? { ...r, phases } : r));
    };

    const activeRoadmap = roadmaps.find(r => r.id === activeRoadmapId) || null;

    return (
        <RoadmapContext.Provider value={{
            roadmaps,
            activeRoadmapId,
            activeRoadmap,
            createRoadmap,
            deleteRoadmap,
            selectRoadmap,
            updateActiveRoadmap,
            updateRoadmapPhases,
            isLoading
        }}>
            {children}
        </RoadmapContext.Provider>
    );
};

export const useRoadmap = () => {
    const context = useContext(RoadmapContext);
    if (context === undefined) {
        throw new Error('useRoadmap must be used within a RoadmapProvider');
    }
    return context;
};
