import React, { useState, useEffect } from 'react';
import { useRoadmap } from '../context/RoadmapContext';

// Types
interface JobApplication {
  id: string;
  company: string;
  role: string;
  url: string;
  dateApplied: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';
  notes: string;
}

interface DailyTask {
  id: string;
  label: string;
  completed: boolean;
  lastCompletedDate: string | null;
}

const STATUS_CONFIG = {
  applied: { label: 'Applied', color: '#60A5FA', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.3)' },
  screening: { label: 'Screening', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)' },
  interview: { label: 'Interview', color: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)' },
  offer: { label: 'Offer 🎉', color: '#34D399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)' },
  rejected: { label: 'Rejected', color: '#94A3B8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)' },
};

const QUICK_LINKS = [
  { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/search/?keywords=remote%20IT%20support%20cloud&f_WT=2', icon: '💼', color: '#0A66C2' },
  { name: 'Indeed Remote', url: 'https://www.indeed.co.uk/jobs?q=remote+IT+support&l=Remote', icon: '🔍', color: '#2164F3' },
  { name: 'AWS Jobs', url: 'https://www.amazon.jobs/en/search?base_query=cloud+support&loc_query=United+Kingdom', icon: '☁️', color: '#FF9900' },
  { name: 'Otta', url: 'https://otta.com/jobs?q=cloud+support', icon: '🚀', color: '#1E1E2F' },
  { name: 'We Work Remotely', url: 'https://weworkremotely.com/remote-jobs/search?term=IT+support+cloud', icon: '🌍', color: '#1A8FCE' },
  { name: 'Remote.co', url: 'https://remote.co/remote-jobs/it/', icon: '🏠', color: '#6C5CE7' },
  { name: 'TotalJobs', url: 'https://www.totaljobs.com/jobs/remote/it-support', icon: '📋', color: '#E91E63' },
  { name: 'Reed.co.uk', url: 'https://www.reed.co.uk/jobs/remote-it-support-jobs', icon: '📝', color: '#D0021B' },
];

const DEFAULT_DAILY_TASKS: DailyTask[] = [
  { id: 'dt-1', label: 'Apply to 5 roles today', completed: false, lastCompletedDate: null },
  { id: 'dt-2', label: 'Update LinkedIn profile / headline', completed: false, lastCompletedDate: null },
  { id: 'dt-3', label: 'Study 1 hour (Cloud Practitioner)', completed: false, lastCompletedDate: null },
  { id: 'dt-4', label: 'Network: comment/connect on LinkedIn', completed: false, lastCompletedDate: null },
  { id: 'dt-5', label: 'Tailor CV for target role', completed: false, lastCompletedDate: null },
  { id: 'dt-6', label: 'Practice interview question', completed: false, lastCompletedDate: null },
];

const CV_ITEMS = [
  { label: 'Google IT Support Cert', points: 20, done: true, icon: '🎓' },
  { label: 'AWS Cloud Practitioner (CLF-C02)', points: 30, done: false, icon: '☁️' },
  { label: 'AWS Solutions Architect Associate', points: 25, done: false, icon: '🏗️' },
  { label: 'Portfolio Project (DrawWarm)', points: 15, done: false, icon: '🎮' },
  { label: 'Cloud Resume Challenge', points: 10, done: false, icon: '📄' },
];

const SALARY_MILESTONES = [
  { label: 'Entry IT Support', value: 25000, color: '#60A5FA' },
  { label: 'Cloud Support', value: 35000, color: '#FBBF24' },
  { label: 'Jr. Cloud Engineer', value: 50000, color: '#A78BFA' },
  { label: 'Cloud Engineer', value: 70000, color: '#34D399' },
  { label: 'Sr. / Architect', value: 100000, color: '#FF9900' },
];

export const JobHuntView: React.FC = () => {
  const { activeRoadmap } = useRoadmap();
  const storageKey = `cloudflow_jobs_${activeRoadmap?.id || 'default'}`;

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).applications || [] : [];
  });

  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(() => {
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : null;
    if (parsed?.dailyTasks) {
      // Reset tasks if last completed was not today
      const today = new Date().toDateString();
      return parsed.dailyTasks.map((t: DailyTask) => ({
        ...t,
        completed: t.lastCompletedDate === today ? t.completed : false
      }));
    }
    return DEFAULT_DAILY_TASKS;
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ company: '', role: '', url: '', notes: '' });

  // Persist
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ applications, dailyTasks }));
  }, [applications, dailyTasks, storageKey]);

  const addApplication = () => {
    if (!formData.company || !formData.role) return;
    const app: JobApplication = {
      id: `job-${Date.now()}`,
      company: formData.company,
      role: formData.role,
      url: formData.url,
      dateApplied: new Date().toISOString().split('T')[0],
      status: 'applied',
      notes: formData.notes,
    };
    setApplications(prev => [app, ...prev]);
    setFormData({ company: '', role: '', url: '', notes: '' });
    setShowAddForm(false);
  };

  const updateStatus = (id: string, status: JobApplication['status']) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const removeApplication = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  const toggleDailyTask = (id: string) => {
    const today = new Date().toDateString();
    setDailyTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed, lastCompletedDate: today } : t
    ));
  };

  const dailyProgress = dailyTasks.filter(t => t.completed).length / dailyTasks.length;

  const cvScore = CV_ITEMS.reduce((sum, item) => sum + (item.done ? item.points : 0), 0);
  const cvTotal = CV_ITEMS.reduce((sum, item) => sum + item.points, 0);

  const statusCounts = {
    applied: applications.filter(a => a.status === 'applied').length,
    screening: applications.filter(a => a.status === 'screening').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offer: applications.filter(a => a.status === 'offer').length,
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <header style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          💼 Job Hunt Command Center
        </h2>
        <p style={{ color: '#94A3B8', margin: '0.25rem 0 0' }}>Track applications, build momentum, get hired.</p>
      </header>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {(['applied', 'screening', 'interview', 'offer'] as const).map(status => (
          <div key={status} style={{
            background: STATUS_CONFIG[status].bg,
            border: `1px solid ${STATUS_CONFIG[status].border}`,
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: STATUS_CONFIG[status].color }}>{statusCounts[status]}</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}>{STATUS_CONFIG[status].label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>

          {/* Application Tracker */}
          <section style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>📋 Application Tracker</h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                style={{
                  background: 'linear-gradient(135deg, #FF9900, #FF6600)',
                  border: 'none',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                + Add Application
              </button>
            </div>

            {showAddForm && (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <input
                    placeholder="Company name"
                    value={formData.company}
                    onChange={e => setFormData(f => ({ ...f, company: e.target.value }))}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <input
                    placeholder="Role title"
                    value={formData.role}
                    onChange={e => setFormData(f => ({ ...f, role: e.target.value }))}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <input
                  placeholder="Job URL (optional)"
                  value={formData.url}
                  onChange={e => setFormData(f => ({ ...f, url: e.target.value }))}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.6rem 0.8rem', color: '#fff', fontSize: '0.9rem', marginBottom: '0.75rem', outline: 'none', boxSizing: 'border-box' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={addApplication} style={{ background: '#34D399', border: 'none', color: '#000', padding: '0.5rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Save</button>
                  <button onClick={() => setShowAddForm(false)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', padding: '0.5rem 1.25rem', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            )}

            {applications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#475569' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚀</div>
                <p style={{ margin: 0 }}>No applications yet. Start applying!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                {applications.map(app => (
                  <div key={app.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${STATUS_CONFIG[app.status].border}`,
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{app.company}</div>
                      <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{app.role}</div>
                    </div>
                    <select
                      value={app.status}
                      onChange={e => updateStatus(app.id, e.target.value as JobApplication['status'])}
                      style={{
                        background: STATUS_CONFIG[app.status].bg,
                        border: `1px solid ${STATUS_CONFIG[app.status].border}`,
                        color: STATUS_CONFIG[app.status].color,
                        borderRadius: '6px',
                        padding: '0.3rem 0.5rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        fontWeight: 600,
                        outline: 'none'
                      }}
                    >
                      {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                        <option key={key} value={key}>{cfg.label}</option>
                      ))}
                    </select>
                    {app.url && (
                      <a href={app.url} target="_blank" rel="noreferrer" style={{ color: '#60A5FA', fontSize: '0.8rem', textDecoration: 'none' }}>🔗</a>
                    )}
                    <button onClick={() => removeApplication(app.id)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1rem', padding: '0.25rem' }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Quick Apply Links */}
          <section style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 1rem' }}>⚡ Quick Apply Links</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.6rem' }}>
              {QUICK_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 0.85rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = link.color;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${link.color}22`;
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>

          {/* Daily Action Checklist */}
          <section style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>✅ Daily Actions</h3>
              <span style={{
                background: dailyProgress === 1 ? 'rgba(52,211,153,0.15)' : 'rgba(255,153,0,0.15)',
                color: dailyProgress === 1 ? '#34D399' : '#FF9900',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}>
                {dailyTasks.filter(t => t.completed).length}/{dailyTasks.length}
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', height: '6px', marginBottom: '1rem', overflow: 'hidden' }}>
              <div style={{
                width: `${dailyProgress * 100}%`,
                height: '100%',
                background: dailyProgress === 1 ? 'linear-gradient(90deg, #34D399, #10B981)' : 'linear-gradient(90deg, #FF9900, #FF6600)',
                borderRadius: '99px',
                transition: 'width 0.4s ease',
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {dailyTasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => toggleDailyTask(task.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.6rem 0.8rem',
                    background: task.completed ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${task.completed ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '8px',
                    color: task.completed ? '#34D399' : '#CBD5E1',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.88rem',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    width: '100%',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    border: `2px solid ${task.completed ? '#34D399' : '#475569'}`,
                    background: task.completed ? '#34D399' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    color: '#fff',
                    flexShrink: 0,
                  }}>
                    {task.completed && '✓'}
                  </span>
                  {task.label}
                </button>
              ))}
            </div>
          </section>

          {/* CV Readiness Score */}
          <section style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 1rem' }}>🎯 CV Readiness Score</h3>

            {/* Score gauge */}
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: `conic-gradient(#FF9900 ${(cvScore / cvTotal) * 360}deg, rgba(255,255,255,0.06) 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                  <span style={{ fontWeight: 800, fontSize: '1.4rem', color: '#FF9900' }}>{cvScore}</span>
                  <span style={{ fontSize: '0.6rem', color: '#64748B' }}>/ {cvTotal} pts</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {CV_ITEMS.map(item => (
                <div key={item.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.45rem 0.6rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: item.done ? '#34D399' : '#64748B',
                }}>
                  <span>{item.icon}</span>
                  <span style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none' }}>{item.label}</span>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: item.done ? '#34D399' : '#475569',
                  }}>
                    {item.done ? '✅' : `+${item.points}`}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Salary Target */}
          <section style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 1rem' }}>💰 Salary Trajectory</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SALARY_MILESTONES.map((m, i) => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '85px', fontSize: '0.7rem', color: '#94A3B8', textAlign: 'right', flexShrink: 0 }}>
                    £{(m.value / 1000).toFixed(0)}k
                  </div>
                  <div style={{ flex: 1, height: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      width: i === 0 ? '100%' : '0%',
                      height: '100%',
                      background: `linear-gradient(90deg, ${m.color}88, ${m.color})`,
                      borderRadius: '6px',
                      transition: 'width 1s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '0.5rem',
                    }}>
                      {i === 0 && <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#fff' }}>NOW</span>}
                    </div>
                    {i > 0 && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '0.5rem',
                        fontSize: '0.7rem',
                        color: '#475569',
                      }}>
                        {m.label}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.75rem', textAlign: 'center' }}>
              Each cert unlocks the next salary tier 🔓
            </p>
          </section>
        </div>
      </div>

      {/* Responsive override for mobile */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JobHuntView;
