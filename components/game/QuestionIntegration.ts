import { ExamQuestion } from '../data/exams/types';
import { PHASE_2_EXAM_1 } from '../data/exams/phase2-exam1';
// Will add more phases as we scale, starting with SAA-C03 (Phase 2) as the default game mode

export type GamePhase = 'PHASE_2' | 'PHASE_3' | 'PHASE_4';

// Cache questions to avoid re-parsing or heavy operations if we add them later
const QUESTION_BANK: Record<GamePhase, ExamQuestion[]> = {
    'PHASE_2': PHASE_2_EXAM_1.questions,
    'PHASE_3': [], // Placeholder for future expansion
    'PHASE_4': []  // Placeholder for future expansion
};

export const getRandomQuestion = (phase: GamePhase): ExamQuestion => {
    const questions = QUESTION_BANK[phase];
    if (!questions || questions.length === 0) {
        // Fallback if no questions loaded for phase
        return PHASE_2_EXAM_1.questions[0];
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
};

export const checkAnswer = (question: ExamQuestion, selectedIndex: number): boolean => {
    return question.correctAnswer === selectedIndex;
};
