import React, { useEffect, useState } from 'react';
import { useGameLoop } from './useGameLoop';
import { useGameRewards } from './useGameRewards';
import { TechTree } from './TechTree';
import { TutorialModal } from './TutorialModal';
import { TutorialOverlay } from './TutorialOverlay';
import { useTutorial } from './useTutorial';
import { GRID_SIZE, TILE_SIZE, Vector2D, TOWER_STATS, Tower } from './types';
import { getRandomQuestion, checkAnswer } from './QuestionIntegration';
import { Shield, Server, Database, Globe, Play, Pause, RefreshCw, X, Zap, ArrowUpCircle, Trophy, Box, CheckCircle, XCircle, HelpCircle, AlertTriangle, Activity, Cpu, Lock, ShieldAlert } from 'lucide-react';
import { ExamQuestion } from '../data/exams/types';

export const MAP_PATHS: Vector2D[][] = [
    [ // Map 0: Standard
        { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 4 }, { x: 5, y: 4 },
        { x: 5, y: 2 }, { x: 8, y: 2 }, { x: 8, y: 7 }, { x: 4, y: 7 },
        { x: 4, y: 9 }, { x: 9, y: 9 }
    ],
    [ // Map 1: The Spiral
        { x: 0, y: 0 }, { x: 9, y: 0 }, { x: 9, y: 9 }, { x: 0, y: 9 },
        { x: 0, y: 2 }, { x: 7, y: 2 }, { x: 7, y: 7 }, { x: 2, y: 7 },
        { x: 2, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 5 }
    ],
    [ // Map 2: The S-Curve
        { x: 0, y: 2 }, { x: 8, y: 2 }, { x: 8, y: 4 }, { x: 1, y: 4 },
        { x: 1, y: 6 }, { x: 8, y: 6 }, { x: 8, y: 8 }, { x: 0, y: 8 }
    ]
];

export const INITIAL_PATH: Vector2D[] = MAP_PATHS[0];

const CloudDefender: React.FC = () => {
    const rewards = useGameRewards();
    const [hasWon, setHasWon] = useState(false); // Added for setHasWon in onWaveComplete
    const { gameState, setGameState, placeTower, upgradeTower, repairTower } = useGameLoop(
        INITIAL_PATH,
        {
            onWaveComplete: (wave) => {
                if (wave % 10 === 0) {
                    // Boss Down!
                    setHasWon(false); // Just keep going
                }
            },
            onEnemyKilled: (type) => {
                // Tracking total kills for something?
            }
        },
        rewards.stats.upgrades,
        MAP_PATHS
    );

    // UI State
    const [selectedCatalogTower, setSelectedCatalogTower] = useState<string | null>(null);
    const [selectedActiveTowerId, setSelectedActiveTowerId] = useState<string | null>(null);
    const [activeChallenge, setActiveChallenge] = useState<ExamQuestion | null>(null);
    const [challengeResult, setChallengeResult] = useState<'PENDING' | 'SUCCESS' | 'FAILURE'>('PENDING');
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [showTechTree, setShowTechTree] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false); // Old static modal
    const tutorial = useTutorial();

    // Check first-time user
    useEffect(() => {
        const hasPlayed = localStorage.getItem('cloud_defender_intro_shown');
        if (!hasPlayed) {
            // tutorial.startTutorial(); // Auto-start? Or show modal?
            // User requested walkthrough first thing.
            // Let's Open the Modal first, and the Modal Start button will trigger interactive tutorial.
            setShowTutorial(true);
            localStorage.setItem('cloud_defender_intro_shown', 'true');
        }
    }, []);

    // Tutorial Game Control Logic
    useEffect(() => {
        if (!tutorial.isActive) return;

        const step = tutorial.currentStep;
        if (!step) return;

        // If waiting for enemy, ensure game is playing
        if (step.id === 'wait-enemy') {
            if (!gameState.isPlaying) setGameState(prev => ({ ...prev, isPlaying: true }));
        }
        // If placing tower, allow play (time doesn't matter much) or pause? 
        // Standard tutorial usually pauses logic but allows interaction.
        // Our 'isPlaying' stops loop. Interaction is allowed.
        else {
            if (gameState.isPlaying) setGameState(prev => ({ ...prev, isPlaying: false }));
        }

    }, [tutorial.isActive, tutorial.currentStep, gameState.isPlaying]);

    // Track Enemy Spawn for Tutorial
    useEffect(() => {
        if (tutorial.isActive && tutorial.currentStep?.requireAction === 'ENEMY_SPAWN') {
            if (gameState.enemies.length > 0) {
                tutorial.handleAction('ENEMY_SPAWN');
            }
        }
    }, [gameState.enemies, tutorial.isActive, tutorial.currentStep]);

    // Penalty State
    const [consecutiveFailures, setConsecutiveFailures] = useState(0);
    const [failureLockoutTimer, setFailureLockoutTimer] = useState(0);

    // Countdown Effect for Penalty
    useEffect(() => {
        if (failureLockoutTimer > 0 && gameState.isPlaying) {
            const timer = setInterval(() => {
                setFailureLockoutTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [failureLockoutTimer, gameState.isPlaying]);

    // Track previous tutorial state to auto-resume
    const wasTutorialActive = React.useRef(false);
    useEffect(() => {
        if (wasTutorialActive.current && !tutorial.isActive) {
            // Tutorial just finished -> Resume Game
            setGameState(prev => ({ ...prev, isPlaying: true }));
        }
        wasTutorialActive.current = tutorial.isActive;
    }, [tutorial.isActive]);

    const togglePlay = () => {
        setGameState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    };

    const openTutorial = () => {
        setGameState(prev => ({ ...prev, isPlaying: false }));
        setShowTutorial(true);
    };

    const startInteractiveTutorial = () => {
        setShowTutorial(false);
        tutorial.startTutorial();
    };

    const closeTutorial = () => {
        setShowTutorial(false);
        setGameState(prev => ({ ...prev, isPlaying: true }));
    };

    const startWave = () => {
        setGameState(prev => ({ ...prev, waveTimer: 0, waveStatus: 'SPAWNING' }));
    };

    const handleGridClick = (x: number, y: number) => {
        if (showTechTree || showTutorial) return; // Prevent clicks through overlay

        // Tutorial Check
        if (tutorial.isActive) {
            if (tutorial.currentStep?.requireAction === 'PLACE_TOWER') {
                tutorial.handleAction('PLACE_TOWER');
            } else {
                // Block clicks if we are strictly guiding?
                // For now, allow but they might be blocked by overlay if we engineered it that way.
            }
        }

        // If clicking on an existing tower -> Select it
        const clickedTower = gameState.towers.find(t => t.position.x === x && t.position.y === y);
        if (clickedTower) {
            setSelectedActiveTowerId(clickedTower.id);
            setSelectedCatalogTower(null); // Clear catalog selection
            return;
        }

        // Else if trying to place a new tower
        if (selectedCatalogTower) {
            const success = placeTower(selectedCatalogTower as any, { x, y });
            if (success) {
                setSelectedCatalogTower(null);
            }
        }
    };

    const initiateUpgrade = () => {
        if (!selectedActiveTowerId) return;
        setGameState(prev => ({ ...prev, isPlaying: false })); // Pause game
        const question = getRandomQuestion('PHASE_2');
        setActiveChallenge(question);
        setChallengeResult('PENDING');
        setSelectedAnswerIndex(null);
    };

    const handleAnswerParams = (index: number) => {
        if (!activeChallenge || !selectedActiveTowerId) return;

        setSelectedAnswerIndex(index);
        const correct = checkAnswer(activeChallenge, index);

        if (correct) {
            setChallengeResult('SUCCESS');
            setConsecutiveFailures(0);
        } else {
            setChallengeResult('FAILURE');
            const newFailures = consecutiveFailures + 1;
            setConsecutiveFailures(newFailures);

            // Deduct Budget
            setGameState(prev => ({
                ...prev,
                budget: Math.max(0, prev.budget - 50)
            }));

            // Penalty progression: 5s -> 10s -> 15s (max)
            let penaltyTime = 5;
            if (newFailures === 2) penaltyTime = 10;
            if (newFailures >= 3) penaltyTime = 15;

            setFailureLockoutTimer(penaltyTime);
        }
    };

    const closeChallenge = () => {
        if (challengeResult === 'SUCCESS' && selectedActiveTowerId) {
            upgradeTower(selectedActiveTowerId);
        }

        setActiveChallenge(null);
        setChallengeResult('PENDING');
        setGameState(prev => ({ ...prev, isPlaying: true }));
    };

    const selectedActiveTower = gameState.towers.find(t => t.id === selectedActiveTowerId);

    return (
        <div className="flex flex-col h-full bg-slate-900 text-white p-4 overflow-hidden relative">

            {/* TECH TREE OVERLAY */}
            {showTechTree && (
                <TechTree
                    stats={rewards.stats}
                    onPurchase={rewards.purchaseUpgrade}
                    onClose={() => setShowTechTree(false)}
                />
            )}

            {/* TUTORIAL OVERLAY */}
            {showTutorial && (
                <TutorialModal onClose={closeTutorial} onStartInteractive={startInteractiveTutorial} />
            )}

            {tutorial.isActive && tutorial.currentStep && (
                <TutorialOverlay
                    targetId={tutorial.currentStep.targetId}
                    message={tutorial.currentStep.message}
                    onNext={tutorial.nextStep}
                    showNext={tutorial.currentStep.showNext}
                    nextLabel={tutorial.currentStep.id === 'finish' ? "Start Game" : "Next"}
                    position={tutorial.currentStep.position}
                    isComplete={tutorial.currentStep.id === 'finish'}
                />
            )}

            {/* HUD Header */}
            <div className="flex flex-col lg:flex-row justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg mb-4 gap-4 lg:gap-0">
                <div className="flex flex-wrap items-center gap-6 lg:gap-12 pl-4 lg:pl-44 w-full lg:w-auto justify-center lg:justify-start">
                    <div className="flex flex-col items-center lg:items-start" id="cd-hud-uptime">
                        <span className="text-xs text-slate-400 uppercase tracking-widest">Uptime</span>
                        <span className={`text-2xl font-bold font-mono ${gameState.health < 50 ? 'text-red-400' : 'text-green-400'}`}>
                            {gameState.health.toFixed(2)}%
                        </span>
                    </div>
                    <div className="flex flex-col items-center lg:items-start" id="cd-hud-budget">
                        <span className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            Budget
                            {gameState.budgetLockedUntil && <Lock size={12} className="text-red-500 animate-pulse" />}
                        </span>
                        <span className={`text-2xl font-bold font-mono transition-colors ${gameState.budgetLockedUntil ? 'text-red-500 line-through opacity-50' : 'text-yellow-400'}`}>
                            ${gameState.budget}
                        </span>
                    </div>
                    <div className="flex flex-col items-center lg:items-start">
                        <span className="text-xs text-slate-400 uppercase tracking-widest">Wave</span>
                        <span className="text-2xl font-bold font-mono text-blue-400">#{gameState.wave}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="flex flex-col items-end mr-4">
                        <span className="text-xs text-slate-400 uppercase tracking-widest">Architect XP</span>
                        <span className="text-xl font-bold font-mono text-purple-400 flex items-center gap-2">
                            <Trophy size={16} /> {rewards.stats.totalXP}
                        </span>
                    </div>

                    <button
                        onClick={openTutorial}
                        className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white flex items-center gap-2 font-bold"
                        title="How to Play"
                    >
                        <HelpCircle size={20} className="text-blue-400" />
                    </button>

                    <button
                        onClick={() => setShowTechTree(true)}
                        className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white flex items-center gap-2 font-bold"
                    >
                        <Box size={20} className="text-purple-400" />
                        LAB
                    </button>
                    <div className="flex flex-col items-center lg:items-end justify-center">
                        {(gameState.wave % 10 === 0 && gameState.wave > 0) && (
                            <div className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest animate-pulse mb-1">
                                Boss Threat Level: High
                            </div>
                        )}
                        <div className="flex gap-2">
                            <button
                                onClick={togglePlay}
                                className={`p-3 rounded-lg flex items-center gap-2 font-bold transition-all ${gameState.isPlaying
                                    ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30'
                                    : 'bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-500/20'
                                    }`}
                            >
                                {gameState.isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                {gameState.isPlaying ? 'PAUSE' : 'RESUME'}
                            </button>

                            {gameState.waveStatus === 'BETWEEN_WAVES' && gameState.isPlaying && (
                                <button
                                    onClick={startWave}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-black tracking-widest shadow-lg shadow-blue-900/40 animate-pulse border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all"
                                >
                                    DEPLOY NOW
                                </button>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>

            {/* BADGE UNLOCK TOAST */}
            {rewards.newUnlocks.length > 0 && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce-in">
                    {rewards.newUnlocks.map(badge => (
                        <div key={badge.id} className="bg-slate-900/90 border-2 border-yellow-500 text-white p-4 rounded-xl shadow-[0_0_50px_rgba(234,179,8,0.5)] flex items-center gap-4 mb-2 backdrop-blur-md">
                            <div className="text-4xl">{badge.icon}</div>
                            <div>
                                <div className="text-xs font-bold text-yellow-500 tracking-widest uppercase">Badge Unlocked</div>
                                <div className="text-lg font-bold">{badge.name}</div>
                                <div className="text-sm text-slate-400">{badge.description}</div>
                            </div>
                            <button onClick={rewards.clearNewUnlocks} className="ml-4 p-2 hover:bg-white/10 rounded-full"><X size={16} /></button>
                        </div>
                    ))}
                </div>
            )}

            {/* Main Game Area */}
            <div className="flex flex-col lg:flex-row flex-1 gap-4 overflow-hidden">
                {/* Game Grid Container */}
                <div className="flex-1 min-h-[400px] lg:h-full relative bg-slate-950 rounded-2xl border-2 border-slate-800 shadow-2xl overflow-hidden cursor-crosshair group">
                    {/* Circuit Board Pattern */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                        backgroundImage: `
                            linear-gradient(to right, #1e293b 1px, transparent 1px),
                            linear-gradient(to bottom, #1e293b 1px, transparent 1px),
                            radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)
                        `,
                        backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px, ${TILE_SIZE}px ${TILE_SIZE}px, ${TILE_SIZE}px ${TILE_SIZE}px`
                    }} />

                    {/* Path Indicators */}
                    {gameState.path.map((node, i) => (
                        <div
                            key={`path-${i}`}
                            className="absolute bg-slate-800/40 border border-slate-700/50 pointer-events-none"
                            style={{
                                left: node.x * TILE_SIZE,
                                top: node.y * TILE_SIZE,
                                width: TILE_SIZE,
                                height: TILE_SIZE
                            }}
                        >
                            <div className="absolute inset-2 bg-blue-500/5 rounded-full animate-pulse" />
                        </div>
                    ))}

                    <div
                        className="relative mx-auto mt-8 lg:mt-0"
                        style={{
                            width: GRID_SIZE * TILE_SIZE,
                            height: GRID_SIZE * TILE_SIZE,
                            backgroundImage: `
                                linear-gradient(rgba(30, 41, 59, 0.4) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(30, 41, 59, 0.4) 1px, transparent 1px)
                            `,
                            backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`
                        }}
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
                            const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);
                            handleGridClick(x, y);
                        }}
                    >
                        {/* Grid Nodes (Click Targets) */}
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                            const x = i % GRID_SIZE;
                            const y = Math.floor(i / GRID_SIZE);
                            const isPath = gameState.path.some(p => p.x === x && p.y === y);
                            return (
                                <div
                                    key={i}
                                    id={`grid-cell-${x}-${y}`}
                                    className={`absolute w-[64px] h-[64px] border border-slate-800/20 transition-all ${selectedCatalogTower && !isPath ? 'hover:bg-blue-500/10 hover:border-blue-500/30' : ''
                                        }`}
                                    style={{ left: x * TILE_SIZE, top: y * TILE_SIZE }}
                                />
                            );
                        })}

                        {/* Towers Layer */}
                        {gameState.towers.map(tower => (
                            <div
                                key={tower.id}
                                id={`tower-${tower.id}`}
                                className={`absolute cursor-pointer transition-all duration-300 transform hover:scale-105 z-20 group/tower
                                    ${selectedActiveTowerId === tower.id ? 'z-30' : ''}
                                `}
                                style={{
                                    left: tower.position.x * TILE_SIZE,
                                    top: tower.position.y * TILE_SIZE,
                                    width: TILE_SIZE,
                                    height: TILE_SIZE
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedActiveTowerId(tower.id);
                                    setSelectedCatalogTower(null);
                                }}
                            >
                                {/* Tower Base Halo */}
                                <div className={`absolute inset-0 rounded-full blur-md opacity-20 group-hover/tower:opacity-40 transition-opacity ${tower.status === 'DISABLED' ? 'bg-red-500' : 'bg-blue-500'
                                    }`} />

                                <div className={`relative w-full h-full flex flex-col items-center justify-center rounded-xl border-2 shadow-lg backdrop-blur-sm
                                    ${selectedActiveTowerId === tower.id ? 'border-amber-400 bg-amber-400/10 shadow-amber-900/40' : 'border-slate-700 bg-slate-800/80 hover:border-slate-500'}
                                    ${tower.status === 'DISABLED' ? 'border-red-900 bg-red-900/20 scale-95 opacity-80' : ''}
                                `}>
                                    {/* Integrity Gauge */}
                                    <div className="absolute -top-1 left-1 right-1 h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                                        <div
                                            className={`h-full transition-all duration-300 ${tower.integrity < 30 ? 'bg-red-500' : 'bg-green-500'}`}
                                            style={{ width: `${(tower.integrity / tower.maxIntegrity) * 100}%` }}
                                        />
                                    </div>

                                    {tower.type === 'ALB' && <Globe className={tower.status === 'DISABLED' ? 'text-slate-600' : 'text-blue-400'} size={24} />}
                                    {tower.type === 'WAF' && <Shield className={tower.status === 'DISABLED' ? 'text-slate-600' : 'text-orange-400'} size={24} />}
                                    {tower.type === 'SHIELD' && <Lock className={tower.status === 'DISABLED' ? 'text-slate-600' : 'text-purple-400'} size={24} />}
                                    {tower.type === 'RDS' && <Database className={tower.status === 'DISABLED' ? 'text-slate-600' : 'text-emerald-400'} size={24} />}
                                    {tower.type === 'S3' && <Box className={tower.status === 'DISABLED' ? 'text-slate-600' : 'text-yellow-400'} size={24} />}

                                    <div className="text-[10px] font-bold mt-1 text-slate-400">v{tower.level}</div>

                                    {tower.disabledUntil && (
                                        <div className="absolute inset-0 bg-red-500/20 animate-pulse flex items-center justify-center rounded-xl">
                                            <Zap className="text-red-500" size={16} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {/* Enemies Layer */}
                        {gameState.enemies.map(enemy => (
                            <div
                                key={enemy.id}
                                className={`absolute flex items-center justify-center transition-all duration-100 ease-linear ${enemy.isBoss ? 'z-30' : 'z-20'} pointer-events-none`}
                                style={{
                                    left: enemy.position.x * TILE_SIZE + (enemy.isBoss ? 0 : 16),
                                    top: enemy.position.y * TILE_SIZE + (enemy.isBoss ? 0 : 16),
                                    transform: `translate(-50%, -50%)`
                                }}
                            >
                                {/* Enemy Health Bar */}
                                <div className={`absolute -top-4 ${enemy.isBoss ? 'w-20 h-2' : 'w-10 h-1'} bg-slate-800 rounded-full overflow-hidden border border-slate-700`}>
                                    <div
                                        className={`h-full ${enemy.isBoss ? 'bg-yellow-400' : 'bg-red-500'}`}
                                        style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}
                                    />
                                </div>

                                <div className={`flex items-center justify-center ${enemy.isBoss ? 'p-2 bg-slate-900/40 rounded-full border border-yellow-500/30' : ''}`}>
                                    {enemy.type === 'REQUEST_BOT' && <Box size={enemy.isBoss ? 40 : 20} className="text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]" />}
                                    {enemy.type === 'DDOS_SWARM' && <Zap size={enemy.isBoss ? 40 : 16} className="text-orange-400 animate-pulse" />}
                                    {enemy.type === 'SQL_SNAKE' && <Activity size={enemy.isBoss ? 40 : 24} className="text-purple-400" />}
                                    {enemy.type === 'CRYPTO_MINER' && <Cpu size={enemy.isBoss ? 40 : 28} className="text-pink-500" />}
                                    {enemy.type === 'THE_MONOLITH' && <Database size={48} className="text-yellow-600 drop-shadow-[0_0_10px_rgba(202,138,4,0.7)] animate-bounce" />}
                                    {enemy.type === 'DDOS_DRAGON' && <Zap size={56} className="text-red-600 rotate-90 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] shadow-red-500" />}
                                    {enemy.type === 'RANSOMWARE_TITAN' && <ShieldAlert size={64} className="text-red-700 animate-pulse drop-shadow-[0_0_20px_rgba(185,28,28,0.9)]" />}
                                </div>

                                {enemy.isBoss && <div className="absolute -bottom-5 text-[10px] font-black text-yellow-500 bg-black/60 px-2 rounded border border-yellow-500/50">BOSS</div>}
                                {enemy.isArmored && !enemy.isBoss && <div className="absolute -top-6 text-[8px] text-purple-300 font-bold">🛡️</div>}
                            </div>
                        ))}
                        {/* Projectiles Layer */}
                        {gameState.projectiles.map(proj => (
                            <div
                                key={proj.id}
                                className="absolute z-30 pointer-events-none"
                                style={{
                                    left: proj.position.x * TILE_SIZE + 32,
                                    top: proj.position.y * TILE_SIZE + 32,
                                    transform: `translate(-50%, -50%)`
                                }}
                            >
                                <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,1)] blur-[0.5px]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-yellow-400/30 animate-ping" />
                            </div>
                        ))}

                        {/* Particles Layer */}
                        {gameState.particles.map(particle => (
                            <div
                                key={particle.id}
                                className="absolute rounded-full pointer-events-none transition-opacity duration-100"
                                style={{
                                    left: particle.position.x * TILE_SIZE + 32,
                                    top: particle.position.y * TILE_SIZE + 32,
                                    width: particle.size,
                                    height: particle.size,
                                    backgroundColor: particle.color,
                                    opacity: particle.life,
                                    transform: 'translate(-50%, -50%)',
                                    boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
                                }}
                            />
                        ))}

                        {/* Map Status Indicators */}
                        {gameState.waveStatus === 'BETWEEN_WAVES' && gameState.wave > 1 && gameState.wave % 10 === 1 && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-blue-900/20 backdrop-blur-sm animate-in fade-in duration-700 pointer-events-none">
                                <div className="p-8 bg-slate-900/90 border-2 border-blue-500 rounded-2xl shadow-2xl text-center space-y-4 max-w-sm">
                                    <div className="flex justify-center">
                                        <RefreshCw size={48} className="text-blue-400 animate-spin-slow" />
                                    </div>
                                    <h2 className="text-2xl font-black text-blue-400 tracking-tighter uppercase italic">VPC Migration</h2>
                                    <p className="text-slate-300 text-sm font-medium">Infrastructure decommissioned. Resources refactored for new Network Topology.</p>
                                    <div className="text-amber-400 font-mono font-bold text-lg animate-pulse">BUDGET REFUNDED</div>
                                </div>
                            </div>
                        )}

                        {/* Wave Status Overlay (Between Waves) */}
                        {gameState.waveStatus === 'BETWEEN_WAVES' && gameState.enemies.length === 0 && (
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center animate-pulse z-40 pointer-events-none">
                                <div className="text-3xl font-black text-amber-500 drop-shadow-lg tracking-widest bg-black/50 px-6 py-2 rounded-lg backdrop-blur-sm border border-amber-500/30">
                                    WAVE {gameState.wave} COMPLETED
                                </div>
                                <div className="text-sm font-mono text-amber-200 mt-2 bg-black/50 px-3 py-1 rounded">
                                    Next wave in: {(gameState.waveTimer / 1000).toFixed(1)}s
                                </div>
                            </div>
                        )}

                        {/* Spawning Indicator */}
                        {gameState.waveStatus === 'SPAWNING' && (
                            <div className="absolute top-2 right-2 flex items-center gap-2 bg-red-900/80 px-3 py-1 rounded-full border border-red-500/50 z-40 pointer-events-none">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                <span className="text-xs font-bold text-red-100 tracking-wider">INTRUSION DETECTED</span>
                            </div>
                        )}
                    </div>

                    {/* Active Challenge Modal Overlay */}
                    {activeChallenge && (
                        <div className="absolute inset-0 bg-slate-950/90 flex items-center justify-center z-50 p-8 backdrop-blur-md">
                            <div className="max-w-2xl w-full bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl p-8 relative overflow-hidden flex flex-col max-h-[90vh]">
                                {challengeResult === 'SUCCESS' && <div className="absolute inset-0 bg-green-500/10 pointer-events-none border-4 border-green-500 rounded-2xl z-0"></div>}
                                {challengeResult === 'FAILURE' && <div className="absolute inset-0 bg-red-500/10 pointer-events-none border-4 border-red-500 rounded-2xl z-0"></div>}

                                <div className="relative z-10 flex-1 overflow-y-auto">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                                            <ArrowUpCircle /> Architecture Validation Required
                                        </h3>
                                        <div className="text-slate-500 text-sm font-mono">Permit #8821</div>
                                    </div>

                                    <p className="text-lg text-white mb-8 font-medium leading-relaxed">
                                        {activeChallenge.scenario}
                                    </p>

                                    {/* Options (Hidden if answered) or Highlighted */}
                                    <div className="grid gap-3 mb-6">
                                        {activeChallenge.options.map((opt, idx) => {
                                            const isCorrect = checkAnswer(activeChallenge, idx);
                                            const isSelected = idx === selectedAnswerIndex;

                                            let btnClass = "p-4 rounded-lg border text-left transition-all flex justify-between items-center ";

                                            if (challengeResult === 'PENDING') {
                                                btnClass += "bg-slate-800 border-slate-700 hover:border-amber-400 hover:bg-slate-700";
                                            } else {
                                                if (isCorrect) {
                                                    btnClass += "bg-green-500/20 border-green-500 text-green-100 font-bold shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                                                } else if (isSelected) {
                                                    btnClass += "bg-red-500/20 border-red-500 text-red-100 font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]";
                                                } else {
                                                    btnClass += "bg-slate-800 border-slate-700 opacity-30 grayscale";
                                                }
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => challengeResult === 'PENDING' && handleAnswerParams(idx)}
                                                    disabled={challengeResult !== 'PENDING'}
                                                    className={btnClass}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold">{String.fromCharCode(65 + idx)})</span>
                                                        {opt}
                                                    </div>
                                                    {challengeResult !== 'PENDING' && isCorrect && <CheckCircle size={20} className="text-green-400" />}
                                                    {challengeResult !== 'PENDING' && isSelected && !isCorrect && <XCircle size={20} className="text-red-400" />}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    {/* Explanation & Result */}
                                    {challengeResult !== 'PENDING' && (
                                        <div className="animate-fade-in bg-slate-800/50 p-4 rounded-xl border border-white/10 mb-4">
                                            <h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-slate-400">Analysis</h4>
                                            <p className="text-slate-300 leading-relaxed text-sm">
                                                {activeChallenge.explanation}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                {challengeResult !== 'PENDING' && (
                                    <div className="relative z-10 mt-6 flex justify-end">
                                        <button
                                            onClick={closeChallenge}
                                            className="px-8 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2 transition-transform hover:scale-105 bg-slate-700 hover:bg-slate-600 text-slate-200"
                                        >
                                            {challengeResult === 'SUCCESS' ? 'APPLY UPGRADE & RESUME' : 'ACKNOWLEDGE FAILURE & RESUME'}
                                            <Play size={16} fill="currentColor" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar: Dynamic Content */}
                <div className="w-full lg:w-80 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 flex flex-col gap-4 overflow-y-auto max-h-[30vh] lg:max-h-none">

                    {selectedActiveTower ? (
                        // -- MODE 1: ACTIVE TOWER SELECTED --
                        <div className="animate-fade-in space-y-4">
                            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">Unit Config</h3>
                                <button onClick={() => setSelectedActiveTowerId(null)} className="text-slate-400 hover:text-white"><X size={16} /></button>
                            </div>

                            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-4xl font-black text-slate-200 mb-1">{TOWER_STATS[selectedActiveTower.type].name}</div>
                                <div className="text-xs text-slate-500 font-mono mb-4">ID: {selectedActiveTower.id.slice(-6)}</div>

                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <div className="bg-slate-800 p-2 rounded">
                                        <div className="text-xs text-slate-500">Level</div>
                                        <div className="font-bold text-green-400 text-lg">v{selectedActiveTower.level}</div>
                                    </div>
                                    <div className="bg-slate-800 p-2 rounded">
                                        <div className="text-xs text-slate-500">Damage</div>
                                        <div className="font-bold text-red-400 text-lg">{selectedActiveTower.damage}</div>
                                    </div>
                                    <div className="bg-slate-800 p-2 rounded">
                                        <div className="text-xs text-slate-500">Range</div>
                                        <div className="font-bold text-blue-400 text-lg">{selectedActiveTower.range.toFixed(1)}</div>
                                    </div>
                                    <div className="bg-slate-800 p-2 rounded">
                                        <div className="text-xs text-slate-500">Rate</div>
                                        <div className="font-bold text-yellow-400 text-lg">{selectedActiveTower.fireRate}/s</div>
                                    </div>
                                </div>

                                {/* Integrity / Repair Section */}
                                <div className="bg-slate-800 p-3 rounded mb-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-slate-400">Structure Integrity</span>
                                        <span className={`text-xs font-bold ${selectedActiveTower.integrity < 30 ? 'text-red-400' : 'text-green-400'}`}>
                                            {Math.round(selectedActiveTower.integrity)} / {selectedActiveTower.maxIntegrity}
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
                                        <div
                                            className={`h-full transition-all ${selectedActiveTower.integrity < 30 ? 'bg-red-500' : 'bg-green-500'}`}
                                            style={{ width: `${(selectedActiveTower.integrity / selectedActiveTower.maxIntegrity) * 100}%` }}
                                        />
                                    </div>

                                    {selectedActiveTower.integrity < selectedActiveTower.maxIntegrity && (
                                        <button
                                            onClick={() => repairTower(selectedActiveTower.id)}
                                            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-sm flex items-center justify-center gap-2 mb-2 shadow-lg shadow-blue-900/20"
                                            disabled={gameState.budget < Math.floor(TOWER_STATS[selectedActiveTower.type].cost * 0.4)}
                                        >
                                            <RefreshCw size={14} />
                                            REFACTOR (Repair)
                                            <span className="text-yellow-300 ml-1">
                                                -${Math.floor(TOWER_STATS[selectedActiveTower.type].cost * 0.4)}
                                            </span>
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={initiateUpgrade}
                                    disabled={failureLockoutTimer > 0}
                                    className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg transition-all
                                        ${failureLockoutTimer > 0
                                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                            : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:brightness-110 shadow-amber-900/20'}`}
                                >
                                    {failureLockoutTimer > 0 ? (
                                        <>
                                            <AlertTriangle size={20} />
                                            COOLDOWN: {failureLockoutTimer}s
                                        </>
                                    ) : (
                                        <>
                                            <Zap size={20} fill="currentColor" />
                                            VALIDATE UPGRADE
                                        </>
                                    )}
                                </button>
                                <p className="text-[10px] text-slate-500 mt-2">Requires successful architecture quiz.</p>
                            </div>
                        </div>
                    ) : (
                        // -- MODE 2: CONSTRUCTION CATALOG --
                        <>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-700 pb-2">Service Catalog</h3>
                            {Object.entries(TOWER_STATS).map(([type, stats]) => (
                                <div
                                    key={type}
                                    id={`cd-catalog-${type}`}
                                    onClick={() => {
                                        setSelectedCatalogTower(type);
                                        setSelectedActiveTowerId(null);
                                        if (tutorial.isActive) tutorial.handleAction(`SELECT_${type}`);
                                    }}
                                    className={`p-3 bg-slate-900 border rounded-lg cursor-pointer transition-all group
                                        ${selectedCatalogTower === type ? 'border-green-500 bg-green-500/10' : 'border-slate-700 hover:border-slate-500'}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded
                                            ${type === 'ALB' ? 'bg-blue-500/20 text-blue-400' :
                                                type === 'WAF' ? 'bg-purple-500/20 text-purple-400' :
                                                    type === 'RDS' ? 'bg-orange-500/20 text-orange-400' :
                                                        'bg-green-500/20 text-green-400'
                                            }`}>
                                            {type === 'ALB' && <Server size={20} />}
                                            {type === 'WAF' && <Shield size={20} />}
                                            {type === 'RDS' && <Database size={20} />}
                                            {type === 'S3' && <Globe size={20} />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-200">{stats.name}</div>
                                            <div className="text-xs text-green-400 font-mono">${stats.cost}</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">{stats.description}</p>
                                </div>
                            ))}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CloudDefender;
