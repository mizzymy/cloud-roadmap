import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Play, Check } from 'lucide-react';

interface TutorialOverlayProps {
    targetId?: string; // ID of the element to highlight
    message: React.ReactNode;
    onNext: () => void;
    showNext?: boolean;
    nextLabel?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    isComplete?: boolean; // For the final step
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
    targetId,
    message,
    onNext,
    showNext = true,
    nextLabel = "Next",
    position = 'bottom',
    isComplete = false
}) => {
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({ opacity: 0 }); // Hide initially

    // 1. Track Target Size & Auto-Scroll
    useEffect(() => {
        const updateRect = () => {
            if (targetId) {
                const el = document.getElementById(targetId);
                if (el) {
                    setTargetRect(el.getBoundingClientRect());
                }
            } else {
                setTargetRect(null);
            }
        };

        // Initial scroll to target
        if (targetId) {
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        }

        updateRect();
        window.addEventListener('resize', updateRect);
        window.addEventListener('scroll', updateRect, true);

        const interval = setInterval(updateRect, 500);
        return () => {
            window.removeEventListener('resize', updateRect);
            window.removeEventListener('scroll', updateRect, true);
            clearInterval(interval);
        };
    }, [targetId]);

    // 2. Calculate Position (Layout Effect to measure after render)
    useEffect(() => {
        if (!tooltipRef.current) return;

        const calculatePosition = () => {
            const tooltip = tooltipRef.current;
            if (!tooltip) return;

            const tooltipRect = tooltip.getBoundingClientRect();
            const width = tooltipRect.width;
            const height = tooltipRect.height;
            const gap = 20;
            const padding = 20; // Min distance from screen edge

            // Default: Center
            let top = window.innerHeight / 2 - height / 2;
            let left = window.innerWidth / 2 - width / 2;

            if (targetRect) {
                // Initial preference based on prop
                if (position === 'bottom') {
                    top = targetRect.bottom + gap;
                    left = targetRect.left + (targetRect.width / 2) - (width / 2);
                } else if (position === 'top') {
                    top = targetRect.top - gap - height;
                    left = targetRect.left + (targetRect.width / 2) - (width / 2);
                } else if (position === 'right') {
                    top = targetRect.top + (targetRect.height / 2) - (height / 2);
                    left = targetRect.right + gap;
                } else if (position === 'left') {
                    top = targetRect.top + (targetRect.height / 2) - (height / 2);
                    left = targetRect.left - width - gap;
                }

                // 3. Collision Detection & Flipping
                // If Bottom overflows, try Top
                if (position === 'bottom' && top + height > window.innerHeight - padding) {
                    const topSpace = targetRect.top;
                    if (topSpace > height + gap) {
                        top = targetRect.top - gap - height; // Flip to top
                    }
                }
                // If Top overflows (goes negative), try Bottom
                if (position === 'top' && top < padding) {
                    const bottomSpace = window.innerHeight - targetRect.bottom;
                    if (bottomSpace > height + gap) {
                        top = targetRect.bottom + gap; // Flip to bottom
                    }
                }
            }

            // 4. Hard Clamping to Viewport
            if (left < padding) left = padding;
            if (left + width > window.innerWidth - padding) left = window.innerWidth - width - padding;
            if (top < padding) top = padding;
            if (top + height > window.innerHeight - padding) top = window.innerHeight - height - padding;

            setTooltipStyle({
                top: `${top}px`,
                left: `${left}px`,
                position: 'absolute',
                width: '320px', // Maintain fixed width purely for layout consistency
                opacity: 1 // Show after calc
            });
        };

        calculatePosition();
        // Recalc on resize is handled by the parent effect triggering re-render, but we need to track local resize too strictly.
        // Actually targetRect change triggers this effect too.
    }, [targetRect, position, message]); // Re-run if message changes (size changes)

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">

            {/* SVG Mask */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300">
                <defs>
                    <mask id="spotlight-mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                        {targetRect && (
                            <rect
                                x={targetRect.left - 5}
                                y={targetRect.top - 5}
                                width={targetRect.width + 10}
                                height={targetRect.height + 10}
                                rx="8"
                                fill="black"
                            />
                        )}
                    </mask>
                </defs>
                <rect
                    x="0" y="0" width="100%" height="100%"
                    fill="rgba(15, 23, 42, 0.85)"
                    mask="url(#spotlight-mask)"
                />

                {targetRect && (
                    <rect
                        x={targetRect.left - 5}
                        y={targetRect.top - 5}
                        width={targetRect.width + 10}
                        height={targetRect.height + 10}
                        rx="8"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="3"
                        className="animate-pulse"
                    />
                )}
            </svg>

            {/* Tooltip Card */}
            <div
                ref={tooltipRef}
                className="bg-slate-900 border-2 border-amber-500 rounded-xl p-6 shadow-2xl pointer-events-auto flex flex-col gap-4 animate-fade-in-up transition-all duration-200"
                style={tooltipStyle}
            >
                <div>
                    {isComplete && <div className="flex justify-center mb-4"><div className="p-3 bg-green-500/20 rounded-full text-green-400"><Check size={32} /></div></div>}
                    <div className="text-slate-100 font-medium leading-relaxed">
                        {message}
                    </div>
                </div>

                {showNext && (
                    <div className="flex justify-end pt-2">
                        <button
                            onClick={onNext}
                            className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
                        >
                            {nextLabel} {isComplete ? <Play size={16} /> : <ArrowRight size={16} />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
