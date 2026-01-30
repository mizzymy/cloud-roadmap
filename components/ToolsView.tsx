import React, { useState, useEffect, useMemo } from 'react';
import { Resource, Phase, PresetLink, PresetCategory } from '../types';
import { PlusIcon, LinkIcon, ClockIcon, PlayIcon, LayoutIcon, ChevronRightIcon } from './Icons';
import { StudyPlanner } from './StudyPlanner';
import { INITIAL_PHASES } from '../constants';

const PRESET_CATEGORY_LABELS: Record<PresetCategory, string> = {
  GOLD_STANDARD_AWS: 'Gold Standard AWS',
  NETWORKING: 'Networking',
  IAC: 'IaC',
  PYTHON: 'Python',
  ARCHITECTURE: 'Architecture',
  SECURITY: 'Security',
};

const ALL_CATEGORIES: PresetCategory[] = ['GOLD_STANDARD_AWS', 'NETWORKING', 'IAC', 'PYTHON', 'ARCHITECTURE', 'SECURITY'];

interface Props {
  resources: Resource[];
  onAddResource: (r: Resource) => void;
  onDeleteResource: (id: string) => void;
  presetLinks: PresetLink[];
  onUpdatePreset: (id: string, partial: Partial<PresetLink>) => void;
  onResetPresets: () => void;
  phases?: Phase[];
}

// Fallback if phases aren't passed (though they should be from App.tsx)
const defaultPhases = INITIAL_PHASES;

export const FocusTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');

  useEffect(() => {
    let interval: number | null = null;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound here ideally
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = (newMode: 'FOCUS' | 'BREAK') => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newMode === 'FOCUS' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-xl border border-white/5 shadow-2xl min-w-0 max-w-full">
      <div className="flex items-center gap-2 mb-4 text-aws-light">
        <ClockIcon className="w-5 h-5" />
        <h3 className="font-semibold">Focus Timer</h3>
      </div>
      <div className="text-center mb-6">
        <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white tracking-wider mb-2">
          {formatTime(timeLeft)}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">{mode} MODE</div>
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-2 rounded-lg font-medium transition ${isActive ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => resetTimer('FOCUS')} className="px-3 py-2 bg-slate-700 rounded-lg text-slate-300 text-xs">25m</button>
        <button onClick={() => resetTimer('BREAK')} className="px-3 py-2 bg-slate-700 rounded-lg text-slate-300 text-xs">5m</button>
      </div>
    </div>
  );
};

const ResourceList: React.FC<Omit<Props, 'phases'>> = ({
  resources,
  onAddResource,
  onDeleteResource,
  presetLinks,
  onUpdatePreset,
  onResetPresets,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'LINKS' | 'FILES' | 'PRESETS'>('LINKS');
  const [presetSearch, setPresetSearch] = useState('');
  const [presetCategoryFilter, setPresetCategoryFilter] = useState<PresetCategory | 'ALL'>('ALL');
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PresetLink>>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!newTitle) return;
    onAddResource({
      id: Date.now().toString(),
      title: newTitle,
      url: newUrl,
      type: activeTab === 'LINKS' ? 'LINK' : 'FILE',
      tags: []
    });
    setNewTitle('');
    setNewUrl('');
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onAddResource({
      id: Date.now().toString(),
      title: file.name,
      url,
      type: 'FILE',
      tags: []
    });
    e.target.value = '';
  };

  const filteredPresets = useMemo(() => {
    const q = presetSearch.trim().toLowerCase();
    const byCategory = presetCategoryFilter === 'ALL'
      ? presetLinks
      : presetLinks.filter(p => p.category === presetCategoryFilter);
    if (!q) return byCategory;
    return byCategory.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        PRESET_CATEGORY_LABELS[p.category].toLowerCase().includes(q)
    );
  }, [presetLinks, presetSearch, presetCategoryFilter]);

  const startEdit = (p: PresetLink) => {
    setEditingPresetId(p.id);
    setEditForm({ title: p.title, url: p.url, description: p.description, category: p.category });
  };

  const saveEdit = () => {
    if (editingPresetId && (editForm.title ?? '').trim()) {
      onUpdatePreset(editingPresetId, {
        title: editForm.title!.trim(),
        url: (editForm.url ?? '').trim(),
        description: (editForm.description ?? '').trim(),
        category: editForm.category ?? 'GOLD_STANDARD_AWS',
      });
    }
    setEditingPresetId(null);
    setEditForm({});
  };

  const cancelEdit = () => {
    setEditingPresetId(null);
    setEditForm({});
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/5 h-[396px] md:h-full flex flex-col min-w-0 shadow-xl">
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        <h3 className="font-bold text-white text-lg">Resource Hub</h3>
        <div className="flex bg-slate-900 rounded-lg p-1 flex-shrink-0">
          <button
            onClick={() => setActiveTab('LINKS')}
            className={`px-2 py-1 rounded text-xs font-medium transition min-h-[28px] ${activeTab === 'LINKS' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
          >
            Links
          </button>
          <button
            onClick={() => setActiveTab('FILES')}
            className={`px-2 py-1 rounded text-xs font-medium transition min-h-[28px] ${activeTab === 'FILES' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
          >
            Local Files
          </button>
          <button
            onClick={() => setActiveTab('PRESETS')}
            className={`px-2 py-1 rounded text-xs font-medium transition min-h-[28px] ${activeTab === 'PRESETS' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
          >
            Presets
          </button>
        </div>
      </div>

      {activeTab === 'PRESETS' ? (
        <>
          <div className="flex flex-col gap-2 mb-3 flex-shrink-0">
            <input
              type="text"
              placeholder="Search presets…"
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-aws-orange"
              value={presetSearch}
              onChange={(e) => setPresetSearch(e.target.value)}
            />
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
              <button
                onClick={() => setPresetCategoryFilter('ALL')}
                className={`flex-shrink-0 px-2 py-1 rounded text-xs font-medium transition min-h-[28px] ${presetCategoryFilter === 'ALL' ? 'bg-aws-orange/80 text-slate-900' : 'bg-slate-700 text-slate-300'}`}
              >
                All
              </button>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPresetCategoryFilter(cat)}
                  className={`flex-shrink-0 px-2 py-1 rounded text-xs font-medium transition min-h-[28px] whitespace-nowrap ${presetCategoryFilter === cat ? 'bg-aws-orange/80 text-slate-900' : 'bg-slate-700 text-slate-300'}`}
                >
                  {PRESET_CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 mb-2 pr-2 min-h-0">
            {filteredPresets.length === 0 ? (
              <div className="text-center text-slate-500 py-6 text-sm italic">
                No presets match your search or filter.
              </div>
            ) : (
              filteredPresets.map((p) =>
                editingPresetId === p.id ? (
                  <div key={p.id} className="bg-slate-800 p-3 rounded border border-aws-orange/50 space-y-2">
                    <input
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-aws-orange"
                      placeholder="Title"
                      value={editForm.title ?? ''}
                      onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                    />
                    <input
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-aws-orange"
                      placeholder="URL"
                      value={editForm.url ?? ''}
                      onChange={(e) => setEditForm((f) => ({ ...f, url: e.target.value }))}
                    />
                    <input
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-aws-orange"
                      placeholder="Description"
                      value={editForm.description ?? ''}
                      onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                    />
                    <select
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-aws-orange"
                      value={editForm.category ?? p.category}
                      onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value as PresetCategory }))}
                    >
                      {ALL_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{PRESET_CATEGORY_LABELS[c]}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="flex-1 py-1.5 rounded bg-aws-orange text-slate-900 font-medium text-sm">Save</button>
                      <button onClick={cancelEdit} className="flex-1 py-1.5 rounded bg-slate-600 text-slate-200 text-sm">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div key={p.id} className="flex flex-col gap-1 bg-slate-800 p-3 rounded border border-slate-700 hover:border-slate-500 transition group">
                    <div className="flex items-start justify-between gap-2 min-h-[44px]">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-white hover:text-aws-orange truncate flex-1 min-w-0"
                      >
                        {p.title}
                      </a>
                      <button
                        onClick={() => startEdit(p)}
                        className="flex-shrink-0 py-1 px-2 rounded text-xs text-slate-400 hover:text-aws-orange hover:bg-slate-700 transition opacity-0 group-hover:opacity-100"
                        aria-label="Edit"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
                    <span className="inline-flex w-fit rounded px-1.5 py-0.5 text-[10px] bg-slate-700 text-slate-300">
                      {PRESET_CATEGORY_LABELS[p.category]}
                    </span>
                  </div>
                )
              )
            )}
          </div>
          <div className="flex-shrink-0 pt-2 border-t border-slate-700">
            <button
              onClick={onResetPresets}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Reset all presets to default
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2 min-h-0">
            {resources.filter(r => (activeTab === 'LINKS' ? r.type === 'LINK' : r.type === 'FILE')).map(res => (
              <div key={res.id} className="flex justify-between items-center bg-slate-800 p-3 rounded border border-slate-700 group hover:border-slate-500 transition">
                <div className="flex items-center gap-3 overflow-hidden min-w-0">
                  <div className="p-2 bg-slate-700 rounded flex-shrink-0">
                    <LinkIcon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="truncate min-w-0">
                    <div className="text-sm font-medium text-white truncate">{res.title}</div>
                    <a href={res.url} target="_blank" rel="noreferrer" className="text-xs text-aws-orange hover:underline truncate block">
                      {res.url || 'No URL'}
                    </a>
                  </div>
                </div>
                <button onClick={() => onDeleteResource(res.id)} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 flex-shrink-0">
                  &times;
                </button>
              </div>
            ))}
            {resources.filter(r => (activeTab === 'LINKS' ? r.type === 'LINK' : r.type === 'FILE')).length === 0 && (
              <div className="text-center text-slate-500 py-10 text-sm italic">
                No {activeTab.toLowerCase().replace('_', ' ')} added yet.
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-slate-700 flex-shrink-0">
            <input
              type="text"
              placeholder="Title (e.g., 'Terraform Cheatsheet')"
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white mb-2 focus:outline-none focus:border-aws-orange"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            {activeTab === 'FILES' && (
              <>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFilePick} />
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm py-2 px-3 rounded border border-slate-600 focus:outline-none focus:border-aws-orange min-h-[44px]"
                  >
                    Choose file (Android / Windows)
                  </button>
                </div>
              </>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={activeTab === 'LINKS' ? "https://..." : "Or paste file:/// path (e.g. C:\\Users\\...)"}
                className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-aws-orange"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
              <button
                onClick={handleAdd}
                className="bg-aws-orange hover:bg-orange-500 text-slate-900 px-4 rounded font-bold transition flex items-center justify-center min-h-[44px]"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
            {activeTab === 'FILES' && (
              <p className="text-[10px] text-slate-500 mt-2">* Pick a file with the button above, or paste a file:/// path and add with +</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const ToolsView: React.FC<Props> = ({
  resources,
  onAddResource,
  onDeleteResource,
  presetLinks,
  onUpdatePreset,
  onResetPresets,
  phases = defaultPhases,
}) => {
  const [showPlanner, setShowPlanner] = useState(false);

  return (
    <>
      <div className="p-4 md:p-8 pb-32 md:pb-8 min-h-0 max-w-7xl mx-auto space-y-6 md:h-full">

        {/* Study Planner Hero Card */}
        <div className="w-full bg-gradient-to-r from-slate-900/60 to-slate-900/40 backdrop-blur-xl rounded-xl border border-white/5 p-6 flex items-center justify-between group cursor-pointer hover:border-aws-orange/50 transition-all shadow-2xl relative overflow-hidden"
          onClick={() => setShowPlanner(true)}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-aws-orange/5 blur-[80px] rounded-full pointer-events-none -mr-20 -mt-20 group-hover:bg-aws-orange/10 transition-colors"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 group-hover:border-aws-orange transition-colors">
              <LayoutIcon className="w-8 h-8 text-aws-orange" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">CloudFlow Workbook</h2>
              <p className="text-slate-400 text-sm">Comprehensive study planner, to-dos, and notes for every exam.</p>
            </div>
          </div>
          <div className="bg-aws-orange text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 group-hover:bg-white transition-colors">
            Launch <ChevronRightIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-full">
          <div className="h-fit space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="font-bold text-white mb-2">Quick Scratchpad</h3>
              <textarea className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-aws-orange" placeholder="Jot down a quick thought..."></textarea>
            </div>
          </div>
          <div className="min-h-[396px] lg:h-[calc(100vh-280px)]">
            <ResourceList
              resources={resources}
              onAddResource={onAddResource}
              onDeleteResource={onDeleteResource}
              presetLinks={presetLinks}
              onUpdatePreset={onUpdatePreset}
              onResetPresets={onResetPresets}
            />
          </div>
        </div>
      </div>

      {/* Full Screen Overlay for Study Planner */}
      {showPlanner && (
        <StudyPlanner phases={phases} onClose={() => setShowPlanner(false)} />
      )}
    </>
  );
};