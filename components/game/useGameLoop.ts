import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import {
    Vector2D,
    Enemy,
    EnemyType,
    Tower,
    TowerType,
    Projectile,
    Particle,
    GameState,
    ENEMY_STATS,
    TOWER_STATS,
    TICK_RATE
} from './types';

// Map paths should ideally be passed in or available globally
// For now, we'll assume they are provided via a prop or we'll define a few defaults here too for safety
const DEFAULT_MAPS: Vector2D[][] = [
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

// Wave Configuration
const GENERATE_WAVE = (wave: number): EnemyType[] => {
    if (wave === 10) return ['THE_MONOLITH'];
    if (wave === 20) return ['DDOS_DRAGON'];
    if (wave === 30) return ['RANSOMWARE_TITAN'];

    const enemies: EnemyType[] = [];
    const count = 5 + Math.floor(wave * 1.5);

    for (let i = 0; i < count; i++) {
        if (wave < 3) {
            enemies.push('REQUEST_BOT');
        } else if (wave < 6) {
            if (i % 3 === 0) enemies.push('DDOS_SWARM');
            else enemies.push('REQUEST_BOT');
        } else if (wave < 10) {
            if (i % 5 === 0) enemies.push('SQL_SNAKE');
            else if (i % 3 === 0) enemies.push('DDOS_SWARM');
            else enemies.push('REQUEST_BOT');
        } else {
            if (i % 7 === 0) enemies.push('CRYPTO_MINER');
            else if (i % 5 === 0) enemies.push('SQL_SNAKE');
            else if (i % 3 === 0) enemies.push('DDOS_SWARM');
            else enemies.push('REQUEST_BOT');
        }
    }
    return enemies;
};

// Helper Functions
function createParticles(state: GameState, position: Vector2D, color: string, count: number) {
    for (let i = 0; i < count; i++) {
        state.particles.push({
            id: `p-${Date.now()}-${Math.random()}`,
            position: { ...position },
            velocity: {
                x: (Math.random() - 0.5) * 0.1,
                y: (Math.random() - 0.5) * 0.1
            },
            color,
            life: 1.0,
            size: 2 + Math.random() * 3
        });
    }
}

function spawnEnemy(state: GameState, type: EnemyType, position?: Vector2D) {
    const startNode = position || state.path[0];
    const stats = ENEMY_STATS[type];
    const waveScaling = stats.isBoss ? 1 : (1 + (state.wave * 0.15));

    const newEnemy: Enemy = {
        id: `e-${Date.now()}-${Math.random()}`,
        type,
        position: { x: startNode.x, y: startNode.y },
        health: Math.floor(stats.health * waveScaling),
        maxHealth: Math.floor(stats.health * waveScaling),
        speed: stats.speed,
        pathIndex: 0,
        isFrozen: false,
        reward: stats.reward,
        isArmored: stats.isArmored,
        isBoss: stats.isBoss,
        abilities: stats.isBoss ? (type === 'THE_MONOLITH' ? ['SPAWN_MINIONS'] : (type === 'DDOS_DRAGON' ? ['EMP_ROAR'] : ['BUDGET_LOCK'])) : [],
        lastAbilityTime: Date.now()
    };
    state.enemies.push(newEnemy);
}

function moveEnemy(enemy: Enemy, path: Vector2D[]): Enemy | null {
    if (enemy.pathIndex >= path.length - 1) return null;

    const targetNode = path[enemy.pathIndex + 1];
    const dx = targetNode.x - enemy.position.x;
    const dy = targetNode.y - enemy.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < enemy.speed) {
        enemy.position = { x: targetNode.x, y: targetNode.y };
        enemy.pathIndex++;
    } else {
        const angle = Math.atan2(dy, dx);
        enemy.position.x += Math.cos(angle) * enemy.speed;
        enemy.position.y += Math.sin(angle) * enemy.speed;
    }
    return enemy;
}

function moveProjectile(state: GameState, proj: Projectile) {
    const target = state.enemies.find(e => e.id === proj.targetId);
    if (!target) return { ...proj, hasHit: true };

    const dx = target.position.x - proj.position.x;
    const dy = target.position.y - proj.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 0.5) {
        let finalDamage = proj.damage;
        if (target.isArmored) finalDamage = Math.floor(proj.damage * 0.5);
        target.health -= finalDamage;
        const color = target.isBoss ? '#facc15' : '#f87171';
        createParticles(state, { ...proj.position }, color, 5);
        return { ...proj, hasHit: true };
    }

    const angle = Math.atan2(dy, dx);
    proj.position.x += Math.cos(angle) * proj.speed;
    proj.position.y += Math.sin(angle) * proj.speed;
    return proj;
}

function towerFire(tower: Tower, state: GameState) {
    const now = Date.now();
    if (tower.status === 'DISABLED' || tower.integrity <= 0) return;
    if (tower.disabledUntil && tower.disabledUntil > now) return;
    if (now - tower.lastFired < 1000 / tower.fireRate) return;

    const target = state.enemies.find(e => {
        const dist = Math.hypot(e.position.x - tower.position.x, e.position.y - tower.position.y);
        return dist <= tower.range;
    });

    if (target) {
        tower.lastFired = now;
        const stats = TOWER_STATS[tower.type];
        if (stats.decayRate) {
            tower.integrity -= stats.decayRate;
            if (tower.integrity <= 0) {
                tower.integrity = 0;
                tower.status = 'DISABLED';
                createParticles(state, { ...tower.position }, '#ef4444', 15);
            }
        }
        createParticles(state, { ...tower.position }, '#60a5fa', 3);

        state.projectiles.push({
            id: `p-${now}-${Math.random()}`,
            position: { ...tower.position },
            targetId: target.id,
            speed: 0.2,
            damage: tower.damage,
            type: 'PACKET'
        });
    }
}

const updateGame = (
    currentState: GameState,
    setState: Dispatch<SetStateAction<GameState>>,
    callbacks?: { onWaveComplete?: (wave: number) => void; onEnemyKilled?: (type: EnemyType) => void; },
    mapPaths: Vector2D[][] = DEFAULT_MAPS
) => {
    const newState = { ...currentState };
    const now = Date.now();

    // 1. WAVE LOGIC MANAGER
    if (newState.waveStatus === 'BETWEEN_WAVES') {
        newState.waveTimer -= (1000 / TICK_RATE);
        if (newState.waveTimer <= 0) {
            if (newState.enemies.length === 0) {
                newState.waveStatus = 'SPAWNING';
                newState.enemiesRemainingToSpawn = GENERATE_WAVE(newState.wave);
                newState.waveTimer = 1000;
            }
        }
    } else if (newState.waveStatus === 'SPAWNING') {
        newState.waveTimer -= (1000 / TICK_RATE);
        if (newState.waveTimer <= 0) {
            if (newState.enemiesRemainingToSpawn.length > 0) {
                const type = newState.enemiesRemainingToSpawn.shift()!;
                spawnEnemy(newState, type);
                newState.waveTimer = 1500;
            } else {
                newState.waveStatus = 'ACTIVE';
            }
        }
    } else if (newState.waveStatus === 'ACTIVE') {
        if (newState.enemies.length === 0) {
            callbacks?.onWaveComplete && callbacks.onWaveComplete(newState.wave);

            // Map Shifting Logic (Every 10 waves)
            if (newState.wave % 10 === 0) {
                // VPC Migration: New Path, Refund Towers
                const nextMapIndex = ((newState.wave / 10) % mapPaths.length);
                newState.path = mapPaths[nextMapIndex];

                // Refund 60% of tower costs
                let refund = 0;
                newState.towers.forEach(t => {
                    const baseCost = TOWER_STATS[t.type].cost;
                    refund += Math.floor(baseCost * 0.6 * t.level);
                    createParticles(newState, { ...t.position }, '#60a5fa', 20); // Migration effect
                });
                newState.budget += refund;
                newState.towers = []; // Clear all towers for new map
            }

            newState.waveStatus = 'BETWEEN_WAVES';
            newState.wave++;
            newState.waveTimer = 5000;
            if (!newState.budgetLockedUntil) {
                newState.budget += 100 + (newState.wave * 10);
            }
        }
    }

    // 2. Move Enemies & Check Leaks
    const activeEnemies: Enemy[] = [];
    newState.enemies.forEach(enemy => {
        const movedEnemy = moveEnemy(enemy, newState.path);
        if (movedEnemy) {
            activeEnemies.push(movedEnemy);
        } else {
            newState.health -= 10;
        }
    });
    newState.enemies = activeEnemies;

    // 3. Move Projectiles & Collision
    newState.projectiles = newState.projectiles.map(proj => moveProjectile(newState, proj)).filter(p => !p.hasHit) as any;

    // 4. Update Status (Cooldowns & Maintenance)
    if (newState.budgetLockedUntil && newState.budgetLockedUntil < now) {
        newState.budgetLockedUntil = undefined;
    }

    newState.towers = newState.towers.map(tower => {
        if (tower.disabledUntil && tower.disabledUntil < now) {
            return { ...tower, disabledUntil: undefined };
        }
        return tower;
    });

    // 5. Boss Abilities
    newState.enemies.forEach(enemy => {
        if (!enemy.isBoss || !enemy.abilities) return;
        const cooldown = enemy.type === 'THE_MONOLITH' ? 4000 : 5000;
        if (!enemy.lastAbilityTime) enemy.lastAbilityTime = now;
        if (now - enemy.lastAbilityTime > cooldown) {
            enemy.lastAbilityTime = now;
            if (enemy.abilities.includes('SPAWN_MINIONS')) {
                spawnEnemy(newState, 'REQUEST_BOT', { ...enemy.position });
                spawnEnemy(newState, 'REQUEST_BOT', { ...enemy.position });
            }
            if (enemy.abilities.includes('EMP_ROAR')) {
                const nearest = newState.towers
                    .filter(t => t.status === 'ACTIVE' && (!t.disabledUntil || t.disabledUntil < now))
                    .sort((a, b) => {
                        const distA = Math.hypot(a.position.x - enemy.position.x, a.position.y - enemy.position.y);
                        const distB = Math.hypot(b.position.x - enemy.position.x, b.position.y - enemy.position.y);
                        return distA - distB;
                    })[0];
                if (nearest) {
                    const distToNearest = Math.hypot(nearest.position.x - enemy.position.x, nearest.position.y - enemy.position.y);
                    if (distToNearest < 4) {
                        nearest.disabledUntil = now + 4000;
                    }
                }
            }
            if (enemy.abilities.includes('BUDGET_LOCK')) {
                newState.budgetLockedUntil = now + 6000;
            }
        }
    });

    // 6. Passive Tower Logic (RDS/S3)
    newState.towers.forEach(tower => {
        if (tower.status === 'DISABLED') return;
        if (tower.disabledUntil && tower.disabledUntil > now) return;
        if (tower.type === 'RDS') {
            newState.health = Math.min(100, newState.health + 0.01);
            tower.integrity -= (TOWER_STATS['RDS'].decayRate / TICK_RATE);
        }
        if (tower.type === 'S3' && !newState.budgetLockedUntil) {
            if (now % 2000 < (1000 / TICK_RATE)) {
                newState.budget += 1;
            }
            tower.integrity -= (TOWER_STATS['S3'].decayRate / TICK_RATE);
        }
        if (tower.integrity <= 0) {
            tower.integrity = 0;
            tower.status = 'DISABLED';
        }
    });

    // 7. Towers Fire
    newState.towers.forEach(tower => towerFire(tower, newState));

    // 8. Particle System Update
    newState.particles = newState.particles.map(p => ({
        ...p,
        position: {
            x: p.position.x + p.velocity.x,
            y: p.position.y + p.velocity.y
        },
        life: p.life - 0.05
    })).filter(p => p.life > 0);

    // 9. Cleanup Dead Enemies and Trigger Callbacks
    const livingEnemies: Enemy[] = [];
    newState.enemies.forEach(enemy => {
        if (enemy.health > 0) {
            livingEnemies.push(enemy);
        } else {
            if (!newState.budgetLockedUntil) {
                newState.budget += enemy.reward;
                createParticles(newState, { ...enemy.position }, '#fff', 10);
            }
            callbacks?.onEnemyKilled && callbacks.onEnemyKilled(enemy.type);
        }
    });
    newState.enemies = livingEnemies;

    if (newState.health <= 0) {
        newState.isGameOver = true;
        newState.isPlaying = false;
    }

    setState(newState);
};

export const useGameLoop = (
    initialPath: Vector2D[],
    callbacks?: { onWaveComplete?: (wave: number) => void; onEnemyKilled?: (type: EnemyType) => void; },
    upgrades?: Record<string, number>,
    mapPaths: Vector2D[][] = DEFAULT_MAPS
) => {
    const initialBudget = 1000 + ((upgrades?.['SAVINGS_PLAN'] || 0) * 100);

    const [gameState, setGameState] = useState<GameState>({
        budget: initialBudget,
        health: 100,
        wave: 1,
        isPlaying: false,
        isGameOver: false,
        enemies: [],
        towers: [],
        projectiles: [],
        path: initialPath,
        waveStatus: 'BETWEEN_WAVES',
        enemiesRemainingToSpawn: [],
        waveTimer: 3000,
        particles: []
    });

    const stateRef = useRef(gameState);
    stateRef.current = gameState;
    const upgradesRef = useRef(upgrades);
    upgradesRef.current = upgrades;
    const callbacksRef = useRef(callbacks);
    callbacksRef.current = callbacks;

    useEffect(() => {
        if (!gameState.isPlaying || gameState.isGameOver) return;
        const loop = setInterval(() => {
            updateGame(stateRef.current, setGameState, callbacksRef.current, mapPaths);
        }, 1000 / TICK_RATE);
        return () => clearInterval(loop);
    }, [gameState.isPlaying, gameState.isGameOver, mapPaths]);

    const placeTower = (type: TowerType, position: Vector2D) => {
        const stats = TOWER_STATS[type];
        if (stateRef.current.budget < stats.cost) return false;
        if (stateRef.current.towers.some(t => t.position.x === position.x && t.position.y === position.y)) return false;
        if (stateRef.current.path.some(p => p.x === position.x && p.y === position.y)) return false;
        const rangeMultiplier = 1 + ((upgradesRef.current?.['EDGE_LOCATIONS'] || 0) * 0.05);
        const rateMultiplier = 1 + ((upgradesRef.current?.['PROVISIONED_CONCURRENCY'] || 0) * 0.05);
        setGameState(prev => ({
            ...prev,
            budget: prev.budget - stats.cost,
            towers: [
                ...prev.towers,
                {
                    id: `t-${Date.now()}`,
                    type,
                    position,
                    level: 1,
                    range: stats.range * rangeMultiplier,
                    damage: stats.damage,
                    fireRate: stats.fireRate * rateMultiplier,
                    lastFired: 0,
                    status: 'ACTIVE',
                    integrity: stats.maxIntegrity,
                    maxIntegrity: stats.maxIntegrity
                }
            ]
        }));
        return true;
    };

    const upgradeTower = (towerId: string) => {
        setGameState(prev => ({
            ...prev,
            towers: prev.towers.map(t => {
                if (t.id !== towerId) return t;
                return {
                    ...t,
                    level: t.level + 1,
                    damage: Math.round(t.damage * 1.5),
                    range: t.range * 1.1,
                };
            })
        }));
        return true;
    };

    const repairTower = (towerId: string) => {
        const tower = stateRef.current.towers.find(t => t.id === towerId);
        if (!tower) return false;
        const stats = TOWER_STATS[tower.type];
        const repairCost = Math.floor(stats.cost * 0.4);
        if (stateRef.current.budget < repairCost) return false;
        setGameState(prev => ({
            ...prev,
            budget: prev.budget - repairCost,
            towers: prev.towers.map(t => {
                if (t.id !== towerId) return t;
                return { ...t, integrity: t.maxIntegrity, status: 'ACTIVE' };
            })
        }));
        return true;
    };

    return { gameState, setGameState, placeTower, upgradeTower, repairTower };
};
