import React, { useState, useCallback } from 'react';

export interface TutorialStep {
    id: string;
    targetId?: string; // ID of element to highlight
    message: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    requireAction?: string; // Event name to wait for (e.g., 'PLACE_TOWER')
    showNext?: boolean; // Show "Next" button? (False if waiting for action)
    isComplete?: boolean;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
    {
        id: 'welcome',
        message: 'Welcome, Architect! This guided simulation will teach you how to defend your cloud infrastructure. Click Next to begin.',
        showNext: true,
        position: 'bottom'
    },
    {
        id: 'hud-uptime',
        targetId: 'cd-hud-uptime',
        message: 'This is your System Uptime. If it drops to 0%, the mission fails. Malicious traffic will try to lower it.',
        position: 'bottom'
    },
    {
        id: 'hud-budget',
        targetId: 'cd-hud-budget',
        message: 'You need Budget to deploy defenses. You earn budget by filtering requests and keeping uptime high.',
        position: 'bottom'
    },
    {
        id: 'catalog-alb',
        targetId: 'cd-catalog-ALB',
        message: 'Let\'s deploy your first defense. The Application Load Balancer (ALB) handles efficient, single-target filtering. Select it now.',
        position: 'top',
        requireAction: 'SELECT_ALB',
        showNext: false
    },
    {
        id: 'grid-place',
        targetId: 'cd-grid-tile-2-2', // We'll need to make sure this ID exists
        message: 'Great choice. Now place the ALB on this strategic tile to cover the entry path.',
        position: 'right',
        requireAction: 'PLACE_TOWER',
        showNext: false
    },
    {
        id: 'wait-enemy',
        message: 'System active. Monitoring traffic... Wait for the first threat to appear.',
        showNext: false, // Will auto-advance when enemy spawns
        requireAction: 'ENEMY_SPAWN'
    },
    {
        id: 'enemy-info',
        // Actually, pointing to a moving enemy is hard. We'll Pause game and point to where it spawns or center.
        // Let's assume we pause and point to start tile?
        targetId: 'cd-grid-tile-0-1', // Start tile
        message: 'INTRUSION DETECTED! This is a Request Bot. It has low health but comes in swarms. Your ALB will handle it automatically.',
        position: 'right',
        showNext: true
    },
    {
        id: 'catalog-waf',
        targetId: 'cd-catalog-WAF',
        message: 'For larger swarms, you need Area of Effect damage. The WAF (Web Application Firewall) burns multiple threats at once.',
        requireAction: 'SELECT_WAF',
        showNext: false,
        position: 'top'
    },
    {
        id: 'grid-place-waf',
        targetId: 'cd-grid-tile-5-2',
        message: 'Place the WAF here to create a kill zone at the corner.',
        position: 'left',
        requireAction: 'PLACE_TOWER',
        showNext: false
    },
    {
        id: 'upgrades',
        targetId: 'cd-grid-tile-2-2', // Point back to ALB
        message: 'Click on your deployed units to Inspect and Upgrade them. Upgrades boost stats but require passing technical validations (Quizzes).',
        position: 'right'
    },
    {
        id: 'finish',
        message: 'You are ready, Architect. Protect the cloud at all costs. Good luck!',
        position: 'bottom',
        isComplete: true
    }
];

export const useTutorial = () => {
    const [isActive, setIsActive] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const startTutorial = useCallback(() => {
        setIsActive(true);
        setCurrentStepIndex(0);
        // Maybe check localStorage here to skip? logic moved to parent
    }, []);

    const stopTutorial = useCallback(() => {
        setIsActive(false);
    }, []);

    const nextStep = useCallback(() => {
        if (currentStepIndex >= TUTORIAL_STEPS.length - 1) {
            stopTutorial();
        } else {
            setCurrentStepIndex(prev => prev + 1);
        }
    }, [currentStepIndex, stopTutorial]);

    const handleAction = useCallback((action: string) => {
        if (!isActive) return;

        const step = TUTORIAL_STEPS[currentStepIndex];
        if (step.requireAction === action) {
            nextStep();
        }
    }, [isActive, currentStepIndex, nextStep]);

    const currentStep = isActive ? TUTORIAL_STEPS[currentStepIndex] : null;

    return {
        isActive,
        currentStep,
        startTutorial,
        stopTutorial,
        nextStep,
        handleAction,
        totalSteps: TUTORIAL_STEPS.length,
        stepIndex: currentStepIndex
    };
};
