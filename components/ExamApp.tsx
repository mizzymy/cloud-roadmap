
import React, { useState, useEffect } from 'react';
import { ExamDefinition } from './data/exams/types';
import { ArrowLeftIcon, CheckCircleIcon, XIcon, ClockIcon } from './Icons';

interface ExamAppProps {
    exam: ExamDefinition;
    onExit: () => void;
}

export const ExamApp: React.FC<ExamAppProps> = ({ exam, onExit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(exam.questions.length).fill(-1));
    const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(new Array(exam.questions.length).fill(false));
    const [timeLeft, setTimeLeft] = useState(exam.timeLimitMinutes * 60);
    const [examState, setExamState] = useState<'IN_PROGRESS' | 'REVIEW' | 'RESULTS'>('IN_PROGRESS');

    // Timer Logic
    useEffect(() => {
        if (examState !== 'IN_PROGRESS') return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setExamState('RESULTS');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [examState]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const currentQuestion = exam.questions[currentQuestionIndex];

    const handleSelectAnswer = (idx: number) => {
        if (examState !== 'IN_PROGRESS') return;
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = idx;
        setSelectedAnswers(newAnswers);
    };

    const toggleFlag = () => {
        const newFlags = [...flaggedQuestions];
        newFlags[currentQuestionIndex] = !newFlags[currentQuestionIndex];
        setFlaggedQuestions(newFlags);
    };

    const calculateScore = () => {
        let correct = 0;
        selectedAnswers.forEach((ans, idx) => {
            if (ans === exam.questions[idx].correctAnswer) correct++;
        });
        // Scaled score logic simulation (100-1000)
        const percentage = correct / exam.questions.length;
        const scaledScore = Math.round(100 + (percentage * 900));
        return { correct, scaledScore, passed: scaledScore >= exam.passingScore };
    };

    if (examState === 'RESULTS') {
        const { correct, scaledScore, passed } = calculateScore();
        return (
            <div className="fixed inset-0 z-50 bg-slate-950 text-white overflow-auto">
                <div className="max-w-4xl mx-auto p-8">
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                        <h1 className="text-2xl font-bold">Exam Results: {exam.code}</h1>
                        <button onClick={onExit} className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 transition">Exit Exam</button>
                    </div>

                    <div className={`p-8 rounded-2xl mb-8 text-center border ${passed ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                        <div className="text-sm uppercase tracking-widest mb-2 font-bold">{passed ? 'PASS' : 'FAIL'}</div>
                        <div className={`text-6xl font-black mb-4 ${passed ? 'text-green-400' : 'text-red-400'}`}>{scaledScore}</div>
                        <div className="text-slate-400">Passing Score: {exam.passingScore} • Your Score: {scaledScore}</div>
                        <div className="mt-4 text-xl">{correct} / {exam.questions.length} Correct</div>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-xl font-bold border-b border-white/10 pb-2">Detailed Review</h3>
                        {exam.questions.map((q, idx) => {
                            const userAns = selectedAnswers[idx];
                            const isCorrect = userAns === q.correctAnswer;
                            return (
                                <div key={q.id} className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`mt-1 p-1 rounded-full ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {isCorrect ? <CheckCircleIcon className="w-5 h-5" /> : <XIcon className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <div className="font-mono text-xs text-slate-500 mb-1">Question {idx + 1}</div>
                                            <p className="font-medium text-lg text-slate-200">{q.scenario}</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-2 pl-10 mb-6">
                                        {q.options.map((opt, optIdx) => (
                                            <div key={optIdx} className={`p-3 rounded border text-sm flex justify-between
                        ${optIdx === q.correctAnswer ? 'bg-green-500/10 border-green-500/50 text-green-200' :
                                                    (optIdx === userAns && !isCorrect) ? 'bg-red-500/10 border-red-500/50 text-red-200' :
                                                        'bg-slate-950 border-transparent text-slate-500'}`}
                                            >
                                                <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)})</span>
                                                {opt}
                                                {optIdx === q.correctAnswer && <span className="text-xs font-bold uppercase ml-2 text-green-500">[Correct Answer]</span>}
                                                {optIdx === userAns && !isCorrect && <span className="text-xs font-bold uppercase ml-2 text-red-500">[Your Answer]</span>}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pl-10 space-y-4">
                                        <div className="bg-blue-900/20 p-4 rounded border border-blue-500/20">
                                            <span className="text-blue-400 font-bold block mb-1">Deep Dive Explanation:</span>
                                            <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
                                        </div>
                                        <div className="bg-slate-800/50 p-4 rounded border border-white/5">
                                            <span className="text-slate-400 font-bold block mb-1">Why Distractors Failed:</span>
                                            <p className="text-sm text-slate-400 leading-relaxed italic">{q.distractorExplanation}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-white text-slate-900 flex flex-col font-sans">
            {/* Header */}
            <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shadow-md select-none">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-lg tracking-tight">{exam.code} Exam</span>
                    <span className="text-slate-500">|</span>
                    <span className="font-mono text-sm">Question {currentQuestionIndex + 1} of {exam.questions.length}</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                        <ClockIcon className="w-5 h-5" />
                        {formatTime(timeLeft)}
                    </div>
                    <button
                        onClick={toggleFlag}
                        className={`px-3 py-1 rounded border text-sm font-bold transition flex items-center gap-2
                ${flaggedQuestions[currentQuestionIndex] ? 'bg-orange-500 border-orange-600 text-white' : 'border-slate-600 text-slate-400 hover:text-white'}`}
                    >
                        {flaggedQuestions[currentQuestionIndex] ? 'Flagged' : 'Flag for Review'}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Question Area */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-slate-50">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8">
                            {currentQuestion.scenario}
                        </p>

                        <div className="space-y-3">
                            {currentQuestion.options.map((opt, idx) => (
                                <label
                                    key={idx}
                                    className={`flex items-start gap-4 p-5 rounded-lg border-2 cursor-pointer transition-all
                            ${selectedAnswers[currentQuestionIndex] === idx
                                            ? 'bg-indigo-50 border-indigo-600 shadow-md'
                                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                ${selectedAnswers[currentQuestionIndex] === idx ? 'border-indigo-600' : 'border-slate-300'}`}>
                                        {selectedAnswers[currentQuestionIndex] === idx && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                                    </div>
                                    <span className="text-lg text-slate-700 font-medium">{opt}</span>
                                    <input
                                        type="radio"
                                        name={`q-${currentQuestionIndex}`}
                                        className="hidden"
                                        onChange={() => handleSelectAnswer(idx)}
                                        checked={selectedAnswers[currentQuestionIndex] === idx}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigator (Bottom Bar in real exam, implies logic here) - keeping simple side or bottom */}
            </div>

            {/* Footer */}
            <footer className="h-20 bg-slate-100 border-t border-slate-200 px-8 flex items-center justify-between">
                <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50 transition shadow-sm"
                >
                    Previous
                </button>

                <div className="flex gap-2">
                    {/* Quick Nav Dots? */}
                </div>

                {currentQuestionIndex === exam.questions.length - 1 ? (
                    <button
                        onClick={() => {
                            if (confirm("Are you sure you want to finish the exam?")) {
                                setExamState('RESULTS');
                            }
                        }}
                        className="px-8 py-2.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                    >
                        Finish Exam
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
                        className="px-8 py-2.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                    >
                        Next Default
                    </button>
                )}
            </footer>
        </div>
    );
};
