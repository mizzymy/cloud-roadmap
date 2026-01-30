import React, { useState, useEffect, useRef } from 'react';
import { GameState, Enemy, Tower, Projectile, Vector2D, GRID_SIZE, TOWER_STATS, TowerType, EnemyType, ENEMY_STATS } from './types';

const TICK_RATE = 30; // Updates per second (approx 33ms)

// Wave Configuration
const GENERATE_WAVE = (wave: number): EnemyType[] => {
    const enemies: EnemyType[] = [];
    const count = 5 + Math.floor(wave * 1.5); // 6, 8, 9...

    for (let i = 0; i < count; i++) {
        // Progression Logic
        const rand = Math.random();
        if (wave < 3) {
            enemies.push('REQUEST_BOT');
        } else if (wave < 6) {
            // Add Swarms
            if (i % 3 === 0) enemies.push('DDOS_SWARM');
            else enemies.push('REQUEST_BOT');
        } else {
            // Add Snakes
            if (i % 5 === 0) enemies.push('SQL_SNAKE');
            else if (i % 3 === 0) enemies.push('DDOS_SWARM');
            else enemies.push('REQUEST_BOT');
        }
    }
    return enemies;
};

export const useGameLoop = (
    initialPath: Vector2D[],
    callbacks?: { onWaveComplete?: (wave: number) => void; onEnemyKilled?: (type: EnemyType) => void; },
    upgrades?: Record<string, number>
) => {
    // Calculate Initial Budget based on Upgrades
    const initialBudget = 1000 + ((upgrades?.['SAVINGS_PLAN'] || 0) * 100);

    const [gameState, setGameState] = useState<GameState>({
        budget: initialBudget,
        health: 100, // 100% Uptime
        wave: 1,
        isPlaying: false,
        isGameOver: false,
        enemies: [],
        towers: [],
        projectiles: [],
        path: initialPath,
        waveStatus: 'BETWEEN_WAVES',
        enemiesRemainingToSpawn: [],
        waveTimer: 3000 // 3s prep time before Wave 1
    });

    const stateRef = useRef(gameState); // Ref to access latest state in interval
    stateRef.current = gameState;

    const upgradesRef = useRef(upgrades);
    upgradesRef.current = upgrades;

    const callbacksRef = useRef(callbacks);
    callbacksRef.current = callbacks;

    useEffect(() => {
        if (!gameState.isPlaying || gameState.isGameOver) return;

        const loop = setInterval(() => {
            updateGame(stateRef.current, setGameState, callbacksRef.current);
        }, 1000 / TICK_RATE);

        return () => clearInterval(loop);
    }, [gameState.isPlaying, gameState.isGameOver]);

    const placeTower = (type: TowerType, position: Vector2D) => {
        const stats = TOWER_STATS[type];
        if (stateRef.current.budget < stats.cost) return false;

        // Check if tile is occupied
        if (stateRef.current.towers.some(t => t.position.x === position.x && t.position.y === position.y)) return false;

        // Check if tile is on the path (simplified collision)
        if (stateRef.current.path.some(p => p.x === position.x && p.y === position.y)) return false;

        // Apply Upgrades
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

                // Upgrade Logic: +50% Damage, +10% Range, +1 Level
                return {
                    ...t,
                    level: t.level + 1,
                    damage: Math.round(t.damage * 1.5),
                    range: t.range * 1.1,
                    // Visual flair or status update could go here
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
                return {
                    ...t,
                    integrity: t.maxIntegrity,
                    status: 'ACTIVE'
                };
            })
        }));
        return true;
    };

    return { gameState, setGameState, placeTower, upgradeTower, repairTower };
};

const updateGame = (
    currentState: GameState,
    setState: React.Dispatch<React.SetStateAction<GameState>>,
    callbacks?: { onWaveComplete?: (wave: number) => void; onEnemyKilled?: (type: EnemyType) => void; }
) => {
    const newState = { ...currentState };
    const now = Date.now();

    // 1. WAVE LOGIC MANAGER
    if (newState.waveStatus === 'BETWEEN_WAVES') {
        newState.waveTimer -= (1000 / TICK_RATE);
        if (newState.waveTimer <= 0) {
            // START NEW WAVE
            // If it was wave 1 start, or standard next wave
            if (newState.enemies.length === 0) {
                newState.waveStatus = 'SPAWNING';
                newState.enemiesRemainingToSpawn = GENERATE_WAVE(newState.wave);
                newState.waveTimer = 1000; // Delay before first spawn
            }
        }
    } else if (newState.waveStatus === 'SPAWNING') {
        newState.waveTimer -= (1000 / TICK_RATE);
        if (newState.waveTimer <= 0) {
            if (newState.enemiesRemainingToSpawn.length > 0) {
                // Spawn one
                const type = newState.enemiesRemainingToSpawn.shift()!;
                spawnEnemy(newState, type);
                newState.waveTimer = 1500; // 1.5s between spawns (Playable pacing)
            } else {
                newState.waveStatus = 'ACTIVE';
            }
        }
    } else if (newState.waveStatus === 'ACTIVE') {
        if (newState.enemies.length === 0) {
            // Wave Cleared!
            callbacks?.onWaveComplete && callbacks.onWaveComplete(newState.wave);
            newState.waveStatus = 'BETWEEN_WAVES';
            newState.wave++;
            newState.waveTimer = 5000; // 5s break
            newState.budget += 100 + (newState.wave * 10); // Wave Clear Bonus
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
    newState.projectiles = newState.projectiles.map(proj => moveProjectile(proj, newState.enemies)).filter(p => !p.hasHit) as any;

    // 4. Towers Fire
    newState.towers.forEach(tower => towerFire(tower, newState));

    // 5. Cleanup Dead Enemies and Trigger Callbacks
    const livingEnemies: Enemy[] = [];
    newState.enemies.forEach(enemy => {
        if (enemy.health > 0) {
            livingEnemies.push(enemy);
        } else {
            newState.budget += enemy.reward;
            callbacks?.onEnemyKilled && callbacks.onEnemyKilled(enemy.type);
        }
    });
    newState.enemies = livingEnemies;

    // Check Game Over
    if (newState.health <= 0) {
        newState.isGameOver = true;
        newState.isPlaying = false;
    }

    setState(newState);
};

const spawnEnemy = (state: GameState, type: EnemyType) => {
    const startNode = state.path[0];

    // Simple Wave Logic
    const stats = ENEMY_STATS[type];
    const waveScaling = 1 + (state.wave * 0.15); // Slightly harder scaling

    const newEnemy: Enemy = {
        id: `e-${Date.now()}-${Math.random()}`,
        type,
        position: { x: startNode.x, y: startNode.y },
        health: Math.floor(stats.health * waveScaling),
        maxHealth: Math.floor(stats.health * waveScaling),
        speed: stats.speed, // Speed doesn't scale infinitely
        pathIndex: 0,
        isFrozen: false,
        reward: stats.reward,
        isArmored: stats.isArmored
    };
    state.enemies.push(newEnemy);
};

const moveEnemy = (enemy: Enemy, path: Vector2D[]): Enemy | null => {
    if (enemy.pathIndex >= path.length - 1) {
        return null; // Remove from board (leaked) - caller handles damage
    }

    const targetNode = path[enemy.pathIndex + 1];
    const dx = targetNode.x - enemy.position.x;
    const dy = targetNode.y - enemy.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < enemy.speed) {
        // Snap to node and increment index
        enemy.position = { x: targetNode.x, y: targetNode.y };
        enemy.pathIndex++;
    } else {
        // Move towards target
        const angle = Math.atan2(dy, dx);
        enemy.position.x += Math.cos(angle) * enemy.speed;
        enemy.position.y += Math.sin(angle) * enemy.speed;
    }

    return enemy;
}

const moveProjectile = (proj: Projectile, enemies: Enemy[]) => {
    const target = enemies.find(e => e.id === proj.targetId);
    if (!target) return { ...proj, hasHit: true }; // Target dead/gone

    const dx = target.position.x - proj.position.x;
    const dy = target.position.y - proj.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 0.5) { // Hit!
        let finalDamage = proj.damage;

        // Armor Logic: If enemy is armored, take reduced damage unless it's a specific type?
        // For MVP, enable simple reduction. 
        if (target.isArmored) {
            finalDamage = Math.floor(proj.damage * 0.5);
        }

        target.health -= finalDamage;
        return { ...proj, hasHit: true };
    }

    const angle = Math.atan2(dy, dx);
    proj.position.x += Math.cos(angle) * proj.speed;
    proj.position.y += Math.sin(angle) * proj.speed;

    return proj;
};

const towerFire = (tower: Tower, state: GameState) => {
    // V3: Integrity Check
    if (tower.status === 'DISABLED' || tower.integrity <= 0) return;

    const now = Date.now();
    if (now - tower.lastFired < 1000 / tower.fireRate) return;

    // Find target in range
    const target = state.enemies.find(e => {
        const dist = Math.hypot(e.position.x - tower.position.x, e.position.y - tower.position.y);
        return dist <= tower.range;
    });

    if (target) {
        tower.lastFired = now;

        // V3: Decay Logic
        const stats = TOWER_STATS[tower.type];
        if (stats.decayRate) {
            tower.integrity -= stats.decayRate;
            if (tower.integrity <= 0) {
                tower.integrity = 0;
                tower.status = 'DISABLED';
            }
        }

        state.projectiles.push({
            id: `p-${now}-${Math.random()}`,
            position: { ...tower.position },
            targetId: target.id,
            speed: 0.2, // Projectile speed
            damage: tower.damage,
            type: 'PACKET'
        });
    }
};
