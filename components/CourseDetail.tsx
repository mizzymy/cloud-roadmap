
import React, { useState } from 'react';
import { Course, Module, Lesson, UserProfile } from '../types';
import { PlayIcon, CheckCircleIcon, ClockIcon, BeakerIcon, ListIcon } from './Icons';
import { FocusTimer } from './ToolsView';
import { MetricTracker } from './MetricTracker';

interface Props {
  course: Course;
  userProfile: UserProfile;
  onUpdateCourse: (updatedCourse: Course) => void;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
  onBack: () => void;
}

const CourseDetail: React.FC<Props> = ({ course, userProfile, onUpdateCourse, onUpdateProfile, onBack }) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(course.modules[0]?.id || '');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(
    course.modules[0]?.lessons[0] || null
  );
  const [noteContent, setNoteContent] = useState('');
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);

  const handleToggleLesson = (moduleId: string, lessonId: string) => {
    const updatedModules = course.modules.map(mod => {
      if (mod.id !== moduleId) return mod;

      const updatedLessons = mod.lessons.map(les => {
        if (les.id !== lessonId) return les;

        const isNowCompleted = !les.isCompleted;
        // Gamification Logic
        if (isNowCompleted) {
          const xpGain = les.type === 'LAB' ? 150 : 50;
          onUpdateProfile({
            ...userProfile,
            xp: userProfile.xp + xpGain,
            level: Math.floor((userProfile.xp + xpGain) / 1000) + 1
          });
        }

        return { ...les, isCompleted: isNowCompleted };
      });

      return { ...mod, lessons: updatedLessons };
    });

    onUpdateCourse({ ...course, modules: updatedModules });
  };

  const handleAddNote = () => {
    if (!activeLesson || !noteContent.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      content: noteContent,
      createdAt: Date.now()
    };

    const updatedModules = course.modules.map(mod => {
      const updatedLessons = mod.lessons.map(les => {
        if (les.id === activeLesson.id) {
          const updatedLesson = { ...les, notes: [...les.notes, newNote] };
          setActiveLesson(updatedLesson);
          return updatedLesson;
        }
        return les;
      });
      return { ...mod, lessons: updatedLessons };
    });

    onUpdateCourse({ ...course, modules: updatedModules });
    setNoteContent('');
  };

  const calculateProgress = () => {
    if (course.tracking) {
      if (!course.tracking.target) return 0;
      return Math.min(100, Math.round((course.tracking.current / course.tracking.target) * 100));
    }

    let total = 0;
    let completed = 0;
    course.modules.forEach(m => {
      m.lessons.forEach(l => {
        total++;
        if (l.isCompleted) completed++;
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const currentModule = course.modules.find(m => m.id === activeModuleId);

  return (
    <div className="h-full w-full min-w-0 max-w-full flex flex-col bg-slate-950 relative overflow-x-hidden">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 z-30 shadow-lg md:shadow-none overflow-hidden">
        <div className="flex items-center gap-4 w-full md:w-auto min-w-0">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition shrink-0">
            ← <span className="hidden md:inline">Back</span>
          </button>
          <div className="flex-1 md:flex-none min-w-0">
            <div className="text-[10px] md:text-xs text-aws-orange font-bold uppercase tracking-wider mb-0.5">{course.provider}</div>
            <h1 className="text-lg md:text-2xl font-bold text-white break-words line-clamp-3">{course.title}</h1>
          </div>
          {/* Mobile Syllabus Toggle */}
          <button
            onClick={() => setIsSyllabusOpen(!isSyllabusOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg"
          >
            <ListIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="w-full md:w-64 hidden md:block">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Course Progress</span>
            <span className="text-white font-mono">{calculateProgress()}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-aws-orange to-red-500 transition-all duration-500" style={{ width: `${calculateProgress()}%` }}></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">

        {/* Syllabus Sidebar - Responsive: Sidebar on Desktop, Overlay Drawer on Mobile */}
        <div className={`
            fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-sm transition-transform duration-300 md:relative md:transform-none md:bg-slate-900 md:w-80 md:border-r md:border-slate-800 flex flex-col
            ${isSyllabusOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex justify-between items-center p-4 md:hidden border-b border-slate-800">
            <h3 className="font-bold text-white">Course Content</h3>
            <button onClick={() => setIsSyllabusOpen(false)} className="text-slate-400 px-2 py-1">Close</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 hidden md:block">Syllabus</h3>

            {course.tracking ? (
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-sm text-slate-400 mb-4">
                  <p>This course tracks <strong>{course.tracking.mode === 'TIME' ? 'Time' : 'Quantity'}</strong> instead of lessons.</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-white mb-1">{course.tracking.current}</div>
                  <div className="text-xs text-slate-500 uppercase">{course.tracking.unit}</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {course.modules.map(module => (
                  <div key={module.id} className="space-y-2">
                    <button
                      onClick={() => setActiveModuleId(module.id)}
                      className={`w-full text-left font-semibold text-sm py-2 px-3 rounded flex justify-between items-center transition
                          ${activeModuleId === module.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}
                    >
                      <span className="truncate pr-2">{module.title}</span>
                      {module.lessons.every(l => l.isCompleted) && <CheckCircleIcon className="w-4 h-4 text-green-500 shrink-0" />}
                    </button>

                    {activeModuleId === module.id && (
                      <div className="pl-4 space-y-1 border-l-2 border-slate-800 ml-3">
                        {module.lessons.map(lesson => (
                          <button
                            key={lesson.id}
                            onClick={() => { setActiveLesson(lesson); setIsSyllabusOpen(false); }}
                            className={`w-full text-left text-sm py-2 px-3 rounded flex items-center gap-3 transition
                                ${activeLesson?.id === lesson.id ? 'bg-aws-orange/10 text-aws-orange' : 'text-slate-400 hover:text-slate-200'}`}
                          >
                            <div
                              onClick={(e) => { e.stopPropagation(); handleToggleLesson(module.id, lesson.id); }}
                              className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition shrink-0
                                  ${lesson.isCompleted ? 'bg-green-500 border-green-500' : 'border-slate-600 hover:border-aws-orange'}`}
                            >
                              {lesson.isCompleted && <svg className="w-3 h-3 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                            </div>

                            <div className="text-slate-500 shrink-0" title={lesson.type}>
                              {lesson.type === 'LAB' ? <BeakerIcon className="w-3 h-3" /> : <PlayIcon className="w-3 h-3" />}
                            </div>

                            <span className={`truncate ${lesson.isCompleted ? 'line-through opacity-50' : ''}`}>{lesson.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content: Study Area */}
        <div className="flex-1 min-w-0 overflow-y-auto bg-slate-950 p-4 md:p-8 w-full">
          {course.tracking ? (
            <div className="max-w-2xl mx-auto space-y-8 mt-10">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-white">{course.title}</h2>
                <p className="text-slate-400">Track your daily progress for this resource.</p>
                <a
                  href={course.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-aws-orange hover:text-white transition font-medium"
                >
                  Open Resource <span className="text-lg">↗</span>
                </a>
              </div>

              <MetricTracker course={course} onUpdate={onUpdateCourse} />
            </div>
          ) : activeLesson ? (
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 min-w-0">
              {/* Lesson Header */}
              <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-6 min-w-0">
                <div className="w-full min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3 min-w-0">
                    <span className="bg-slate-800 text-slate-300 text-[10px] md:text-xs px-2 py-1 rounded border border-slate-700 font-mono truncate max-w-full">
                      Module: {currentModule?.title}
                    </span>
                    <span className={`flex items-center gap-1 text-slate-900 text-[10px] md:text-xs px-2 py-1 rounded font-bold font-mono
                         ${activeLesson.type === 'LAB' ? 'bg-green-500' : 'bg-slate-300'}`}>
                      {activeLesson.type}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-800 text-slate-300 text-[10px] md:text-xs px-2 py-1 rounded border border-slate-700 font-mono">
                      <ClockIcon className="w-3 h-3" /> {activeLesson.duration}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{activeLesson.title}</h2>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full md:w-auto inline-flex justify-center items-center gap-2 px-6 py-4 rounded-lg font-bold transition shadow-lg 
                         ${activeLesson.type === 'LAB'
                        ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-500/20'
                        : 'bg-aws-orange hover:bg-orange-500 text-slate-900 shadow-orange-500/20'}`}
                  >
                    {activeLesson.type === 'LAB' ? <BeakerIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                    {activeLesson.type === 'LAB' ? 'Start Lab Session' : 'Watch Lesson'}
                  </a>
                </div>
                <div className="w-full md:w-80 shrink-0 min-w-0">
                  <FocusTimer />
                </div>
              </div>

              {/* Achievements Section for this Course */}
              {course.achievements.length > 0 && (
                <div className="bg-slate-900 rounded-xl p-4 md:p-6 border border-slate-800 overflow-x-auto">
                  <h3 className="text-lg font-bold text-white mb-4">Available Achievements</h3>
                  <div className="flex gap-4 min-w-max">
                    {course.achievements.map(ach => (
                      <div key={ach.id} className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700 opacity-70 hover:opacity-100 transition">
                        <div className="text-2xl">{ach.icon}</div>
                        <div>
                          <div className="font-bold text-white text-sm">{ach.title}</div>
                          <div className="text-xs text-aws-orange">+{ach.xpReward} XP</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes Section */}
              <div className="flex flex-col h-[500px] bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="text-aws-orange">✎</span> Lesson Notes
                  </h3>
                  <span className="text-xs text-slate-400">{activeLesson.notes.length} notes saved</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeLesson.notes.length === 0 && (
                    <div className="text-center text-slate-500 mt-10">
                      <p>No notes for this lesson yet.</p>
                      <p className="text-xs">Write down key concepts, analogies, or exam tips.</p>
                    </div>
                  )}
                  {activeLesson.notes.map(note => (
                    <div key={note.id} className="bg-slate-800 p-3 rounded border border-slate-700 text-slate-300 text-sm whitespace-pre-wrap">
                      {note.content}
                      <div className="text-[10px] text-slate-500 mt-2 text-right">
                        {new Date(note.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-800 border-t border-slate-700">
                  <textarea
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-aws-orange resize-none"
                    rows={3}
                    placeholder="Type your note here... (e.g. 'S3 buckets are like water tanks...')"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddNote(); } }}
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleAddNote}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm font-medium transition w-full md:w-auto"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <div className="text-6xl mb-4">🎓</div>
              <p className="text-xl font-medium text-slate-400">Select a lesson from the syllabus to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
