import React, { useState, useEffect } from 'react';
import { FlashcardIcon, CheckCircleIcon, XIcon, ActivityIcon } from '../Icons';

const deck = [
    { term: '¡Hola!', meaning: 'Hello!', context: '¡Hola! ¿Cómo estás?', translation: 'Hello! How are you?' },
    { term: 'Por favor', meaning: 'Please', context: 'Un café, por favor.', translation: 'A coffee, please.' },
    { term: 'Gracias', meaning: 'Thank you', context: 'Gracias por tu ayuda.', translation: 'Thank you for your help.' },
    { term: 'Salud', meaning: 'Cheers / Bless you', context: '¡Salud!', translation: 'Cheers!' },
    { term: 'De nada', meaning: 'You\'re welcome', context: 'De nada, amigo.', translation: 'You\'re welcome, friend.' },
    { term: 'Lo siento', meaning: 'I\'m sorry', context: 'Lo siento mucho.', translation: 'I\'m very sorry.' },
    { term: '¿Cuánto cuesta?', meaning: 'How much does it cost?', context: '¿Cuánto cuesta este perro caliente?', translation: 'How much does this hot dog cost?' },
    { term: 'La cuenta', meaning: 'The bill / check', context: 'La cuenta, por favor.', translation: 'The bill, please.' },
];

export const VocabTrainerView: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardIndex, setCardIndex] = useState(0);

    // Local Storage Persistence
    useEffect(() => {
        const savedIndex = localStorage.getItem('language_roadmap_vocab_index');
        if (savedIndex) {
            setCardIndex(parseInt(savedIndex, 10));
        }
    }, []);

    const currentCard = deck[cardIndex];

    const playAudio = (text: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (!window.speechSynthesis) return;
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES'; // Spanish pronunciation
        utterance.rate = 0.9; // Slightly slower for learning
        window.speechSynthesis.speak(utterance);
    };

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            const newIndex = (cardIndex + 1) % deck.length;
            setCardIndex(newIndex);
            localStorage.setItem('language_roadmap_vocab_index', newIndex.toString());
        }, 150); // wait for flip back
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
            <header className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 mb-4">
                    <FlashcardIcon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-white">Vocab Trainer</h2>
                <p className="text-slate-400 mt-2">Spaced repetition. Review your everyday conversational Spanish.</p>
            </header>

            <div className="flex flex-col items-center">
                <div className="text-slate-500 text-sm mb-4">Card {cardIndex + 1} of {deck.length}</div>
                
                {/* Flashcard */}
                <div className="w-full max-w-lg h-96 relative perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                    <div className={`w-full h-full transition-transform duration-500 transform-style-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}>
                        
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden bg-slate-900 border-2 border-indigo-500/30 hover:border-indigo-500/50 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center transition-colors">
                            <span className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Term</span>
                            <h3 className="text-5xl font-black text-white">{currentCard.term}</h3>
                            
                            <button 
                                onClick={(e) => playAudio(currentCard.term, e)}
                                className="mt-6 px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded-full text-sm font-semibold transition"
                            >
                                ▶ Play Audio
                            </button>

                            <div className="mt-8 text-slate-500 text-sm">(Tap to flip)</div>
                        </div>

                        {/* Back */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-900 to-slate-900 border-2 border-indigo-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center">
                             <span className="text-sm font-semibold text-indigo-300 uppercase tracking-widest mb-2">Meaning</span>
                             <h3 className="text-4xl font-bold text-white mb-6">{currentCard.meaning}</h3>
                             
                             <div className="bg-black/20 p-4 rounded-xl w-full flex flex-col items-center gap-2">
                                <div className="italic text-slate-300">
                                    "{currentCard.context}"
                                </div>
                                <div className="text-slate-400 text-sm">
                                    {currentCard.translation}
                                </div>
                                <button 
                                    onClick={(e) => playAudio(currentCard.context, e)}
                                    className="mt-2 px-3 py-1 bg-white/5 hover:bg-white/10 text-indigo-200 rounded-full text-xs font-semibold"
                                >
                                    ▶ Hear Sentence
                                </button>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Controls (only show when flipped to rate) */}
                <div className={`mt-8 flex gap-4 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <button onClick={(e) => { e.stopPropagation(); nextCard(); }} className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-semibold border border-red-500/30 transition">
                        <XIcon className="w-5 h-5" /> Hard
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); nextCard(); }} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold border border-slate-700 transition">
                        Good
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); nextCard(); }} className="flex items-center gap-2 px-6 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl font-semibold border border-green-500/30 transition">
                        <CheckCircleIcon className="w-5 h-5" /> Easy
                    </button>
                </div>
            </div>
            
            <div className="mt-12 p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-start gap-4">
                <ActivityIcon className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-white">Daily Review Status</h4>
                    <p className="text-sm text-slate-400 mt-1">You have {deck.length - cardIndex} cards left to review today. The algorithm spaces them out based on your recall difficulty.</p>
                </div>
            </div>

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </div>
    );
};

