
import React, { useState } from 'react';
import { AppSettings } from '../types';
import { SaveIcon, BellIcon, TrashIcon, CheckCircleIcon } from './Icons';

interface Props {
    settings: AppSettings;
    onSave: (settings: AppSettings) => void;
    onReset: () => void;
}

const SettingsView: React.FC<Props> = ({ settings, onSave, onReset }) => {
    // Local state for form
    const [localSettings, setLocalSettings] = useState(settings);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        onSave(localSettings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        
        if (localSettings.notificationsEnabled && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    };

    const testNotification = () => {
        if (Notification.permission === 'granted') {
            new Notification("CloudFlow Test", { body: "This is how your study reminders will look!" });
        } else {
            alert("Please enable notifications in your browser settings first.");
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8 pb-24 md:pb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Settings & Preferences</h2>
            
            {/* General */}
            <div className="bg-slate-850 p-4 md:p-8 rounded-xl border border-slate-700">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>👤</span> Profile Settings
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-slate-400 mb-2 font-medium">Display Name</label>
                        <input 
                            type="text" 
                            value={localSettings.username}
                            onChange={e => setLocalSettings({...localSettings, username: e.target.value})}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-aws-orange focus:outline-none focus:ring-1 focus:ring-aws-orange transition"
                            placeholder="e.g. Future Architect"
                        />
                        <p className="text-xs text-slate-500 mt-2">This is how the AI Coach will address you.</p>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-slate-850 p-4 md:p-8 rounded-xl border border-slate-700">
                <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BellIcon className="w-5 h-5 md:w-6 md:h-6 text-aws-orange" /> Notifications
                </h3>
                <div className="space-y-6 md:space-y-8">
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                        <div>
                            <div className="text-white font-medium text-base md:text-lg">Daily Study Reminders</div>
                            <div className="text-xs md:text-sm text-slate-400 mt-1">Receive a browser notification when it's time.</div>
                        </div>
                        <button 
                            onClick={() => setLocalSettings(s => ({...s, notificationsEnabled: !s.notificationsEnabled}))}
                            className={`w-12 h-7 md:w-14 md:h-8 rounded-full transition-colors relative ${localSettings.notificationsEnabled ? 'bg-aws-orange' : 'bg-slate-700'}`}
                        >
                            <div className={`absolute top-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white transition-all shadow-md ${localSettings.notificationsEnabled ? 'left-6 md:left-7' : 'left-1'}`}></div>
                        </button>
                    </div>

                    <div className={`transition-all duration-300 ${localSettings.notificationsEnabled ? 'opacity-100 max-h-96' : 'opacity-50 max-h-96 blur-[1px] pointer-events-none'}`}>
                         <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
                             <div className="flex-1">
                                <label className="block text-sm text-slate-400 mb-2 font-medium">Reminder Time</label>
                                <input 
                                    type="time" 
                                    value={localSettings.reminderTime}
                                    onChange={e => setLocalSettings({...localSettings, reminderTime: e.target.value})}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-aws-orange focus:outline-none"
                                />
                             </div>
                             <div className="md:pb-1">
                                <button onClick={testNotification} className="text-sm text-aws-orange hover:text-white font-medium hover:underline transition">
                                    Send Test Notification
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-950/20 p-4 md:p-8 rounded-xl border border-red-900/30">
                <h3 className="text-lg md:text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                    <TrashIcon className="w-5 h-5 md:w-6 md:h-6" /> Danger Zone
                </h3>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="text-xs md:text-sm text-red-200/70">
                        Resetting will delete all completed lessons, notes, and XP progress.
                    </div>
                    <button 
                        onClick={() => { if(confirm("Are you sure you want to completely reset your progress? This cannot be undone.")) onReset(); }}
                        className="w-full md:w-auto bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-lg font-medium transition border border-red-600/20 whitespace-nowrap text-sm"
                    >
                        Reset Progress
                    </button>
                </div>
            </div>

            {/* Save Action */}
            <div className="fixed bottom-20 md:bottom-10 right-4 md:right-10 z-40">
                <button 
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold transition shadow-2xl transform hover:-translate-y-1 text-sm md:text-base
                        ${saved ? 'bg-green-500 text-white' : 'bg-aws-orange hover:bg-orange-400 text-slate-900'}`}
                >
                    {saved ? <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6" /> : <SaveIcon className="w-5 h-5 md:w-6 md:h-6" />}
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>
        </div>
    )
}
export default SettingsView;
