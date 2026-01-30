

export enum PhaseStatus {
  LOCKED = 'LOCKED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Note {
  id: string;
  content: string;
  createdAt: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "15m"
  type: 'VIDEO' | 'LAB' | 'QUIZ';
  isCompleted: boolean;
  notes: Note[]; 
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  isCompleted: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  icon: string; // emoji or icon name
  unlockedAt?: number; // timestamp
}

export interface Course {
  id: string;
  provider: 'Coursera' | 'Cantrill' | 'Other';
  title: string;
  url: string;
  totalModules: number;
  completedModules: number;
  modules: Module[]; // Expanded structure
  achievements: Achievement[];
}

export interface Phase {
  id: string;
  title: string;
  timeframe: string;
  goal: string;
  weeklyCommitment: string;
  courses: Course[];
  phaseStartMs?: number;
  phaseEndMs?: number;
  milestone: {
    name: string;
    date: string;
    cost: string;
    completed: boolean;
    url?: string;
  };
  status: PhaseStatus;
}

export interface UserProfile {
  xp: number;
  level: number;
  streak: number;
  lastLogin: string;
  startDate: number; // Timestamp when user started the journey
  deadline: number; // Timestamp for the final goal (June 2027)
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'LINK' | 'FILE' | 'NOTE';
  url?: string; 
  content?: string;
  tags: string[];
}

export interface AppSettings {
  username: string;
  notificationsEnabled: boolean;
  reminderTime: string; // "19:00"
  soundEnabled: boolean;
}

// --- STUDY PLANNER TYPES ---

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface StudyTask {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

export interface StudyWorkbook {
  id: string;
  linkedEntityId: string; // Connects to a Course ID or Phase ID
  title: string;
  type: 'COURSE' | 'EXAM';
  provider: string; // e.g., 'Cantrill', 'AWS'
  tasks: StudyTask[];
  notes: string; // Markdown/Text content
  lastUpdated: number;
}
