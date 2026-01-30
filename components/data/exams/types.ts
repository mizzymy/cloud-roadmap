export interface ExamQuestion {
    id: string;
    scenario: string;
    options: string[];
    correctAnswer: number; // Index 0-4
    explanation: string;
    distractorExplanation: string;
}

export interface ExamDefinition {
    id: string;
    title: string;
    code: string; // e.g., "CLF-C02"
    description: string;
    timeLimitMinutes: number;
    passingScore: number; // e.g. 720
    totalQuestions: number;
    questions: ExamQuestion[];
}
