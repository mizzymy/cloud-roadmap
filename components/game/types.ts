
export interface Vector2D {
    x: number;
    y: number;
}

export type EnemyType = 'REQUEST_BOT' | 'DDOS_SWARM' | 'SQL_SNAKE' | 'CRYPTO_MINER' | 'THE_MONOLITH' | 'DDOS_DRAGON' | 'RANSOMWARE_TITAN';
export type TowerType = 'ALB' | 'WAF' | 'SHIELD' | 'RDS' | 'S3';

export interface Enemy {
    id: string;
    type: EnemyType;
    position: Vector2D;
    health: number;
    maxHealth: number;
    speed: number;
    pathIndex: number;
    isFrozen: boolean;
    reward: number;
    // Special traits
    isArmored?: boolean; // Takes reduced damage from standard attacks
    isStealth?: boolean; // Visible only within short range
    isBoss?: boolean;
    abilities?: string[];
    lastAbilityTime?: number; // V3: For Boss Ability Cooldowns
}

export const ENEMY_STATS: Record<EnemyType, { name: string; health: number; speed: number; reward: number; description: string; isArmored?: boolean; isBoss?: boolean }> = {
    'REQUEST_BOT': { name: 'HTTP Flood Bot', health: 50, speed: 0.05, reward: 10, description: 'Standard traffic bot.' },
    'DDOS_SWARM': { name: 'DDoS Packet', health: 20, speed: 0.12, reward: 5, description: 'Fast, weak swarms.' },
    'SQL_SNAKE': { name: 'SQL Injection', health: 150, speed: 0.03, reward: 25, isArmored: true, description: 'Heavy armored exploit.' },
    'CRYPTO_MINER': { name: 'Crypto Miner', health: 300, speed: 0.02, reward: 50, description: 'Tanky resource drainer.' },
    'THE_MONOLITH': { name: 'The Monolith', health: 2500, speed: 0.015, reward: 250, isBoss: true, description: 'Ancient legacy system. Spawns minions when damaged.' },
    'DDOS_DRAGON': { name: 'DDoS Dragon', health: 6000, speed: 0.04, reward: 500, isBoss: true, description: 'Breathes latency. Can temporarily disable towers.' },
    'RANSOMWARE_TITAN': { name: 'Ransomware Titan', health: 15000, speed: 0.01, reward: 1000, isBoss: true, description: 'Encrypts your financials. Freezes budget generation.' }
};

export interface Tower {
    id: string;
    type: TowerType;
    position: Vector2D; // Grid coordinates (0-9, 0-9)
    level: number;
    range: number;
    damage: number;
    fireRate: number;
    lastFired: number;
    status: 'ACTIVE' | 'DISABLED' | 'COOLDOWN';
    // V3: Structure Integrity & Status
    integrity: number;
    maxIntegrity: number;
    disabledUntil?: number; // For temporary boss effects
}

export interface Projectile {
    id: string;
    position: Vector2D;
    targetId: string;
    speed: number;
    damage: number;
    type: 'STANDARD' | 'LASER' | 'PACKET';
    hasHit?: boolean;
}

export interface Particle {
    id: string;
    position: Vector2D;
    velocity: Vector2D;
    color: string;
    life: number; // 0 to 1
    size: number;
}

export interface GameState {
    budget: number;
    health: number; // 0-100 (Uptime)
    wave: number;
    isPlaying: boolean;
    isGameOver: boolean;
    enemies: Enemy[];
    towers: Tower[];
    projectiles: Projectile[];
    path: Vector2D[];

    // Wave Logic
    waveStatus: 'SPAWNING' | 'ACTIVE' | 'BETWEEN_WAVES';
    enemiesRemainingToSpawn: EnemyType[]; // Queue of enemies to spawn this wave
    waveTimer: number; // Timer for next spawn or next wave
    budgetLockedUntil?: number; // V3: For Ransomware Boss
    particles: Particle[]; // V3: Visual effects
}

export const GRID_SIZE = 10; // 10x10 Grid
export const TILE_SIZE = 64; // Pixels per tile
export const TICK_RATE = 10; // FPS (Loops per second)

export const TOWER_STATS: Record<TowerType, {
    name: string;
    cost: number;
    range: number;
    damage: number;
    fireRate: number;
    description: string;
    maxIntegrity: number;
    decayRate: number; // Integrity loss per shot (or per sec for passive)
}> = {
    'ALB': { name: 'App Load Balancer', cost: 200, range: 3.5, damage: 10, fireRate: 2, description: 'Basic rapid-fire traffic distribution.', maxIntegrity: 100, decayRate: 1 },
    'WAF': { name: 'AWS WAF', cost: 450, range: 5, damage: 40, fireRate: 0.8, description: 'Heavy damage against exploit attempts (SQLi).', maxIntegrity: 150, decayRate: 2 },
    'SHIELD': { name: 'Shield Advanced', cost: 600, range: 3, damage: 5, fireRate: 5, description: 'AOE suppression against DDoS swarms.', maxIntegrity: 250, decayRate: 0.5 },
    'RDS': { name: 'RDS Multi-AZ', cost: 800, range: 0, damage: 0, fireRate: 0, description: 'Regenerates Uptime (Health) passively.', maxIntegrity: 400, decayRate: 2 }, // Decays per tick
    'S3': { name: 'S3 Standard', cost: 350, range: 0, damage: 0, fireRate: 0, description: 'Generates Budget (Gold) passively.', maxIntegrity: 150, decayRate: 2 }, // Decays per tick
};
