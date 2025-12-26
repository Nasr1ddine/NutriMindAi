
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { MealLog } from '../types';
import { Activity, Search, Utensils } from 'lucide-react';

interface Props {
  logs: MealLog[];
  onLog: (log: MealLog) => void;
}

const MealTracker: React.FC<Props> = ({ logs, onLog }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const result = await geminiService.parseMealLog(input);
      // Fix: Added missing 'type' property to the MealLog object literal.
      const newLog: MealLog = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        // Use the AI generated title or fallback to the user's input
        description: result.title || input,
        type: result.type || 'snack',
        nutrition: {
          calories: result.nutrition?.calories || 0,
          protein: result.nutrition?.protein || 0,
          carbs: result.nutrition?.carbs || 0,
          fat: result.nutrition?.fat || 0,
        }
      };
      onLog(newLog);
      setInput('');
    } catch (e) {
      console.error("Failed to parse meal:", e);
    } finally {
      setLoading(false);
    }
  };

  const totalCalories = logs.reduce((sum, l) => sum + l.nutrition.calories, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="p-2 bg-blue-100 text-blue-700 rounded-lg">🥗</span>
        Smart Tracker
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-xl text-center">
          <p className="text-sm text-slate-500 mb-1">Total Calories</p>
          <p className="text-2xl font-bold text-slate-900">{totalCalories} kcal</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl text-center">
          <p className="text-sm text-slate-500 mb-1">Meals Today</p>
          <p className="text-2xl font-bold text-slate-900">{logs.length}</p>
        </div>
      </div>

      <div className="relative mb-8">
        <textarea
          placeholder="e.g. I had two poached eggs and a slice of avocado toast..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
        />
        <button
          onClick={handleTrack}
          disabled={loading || !input}
          className="absolute bottom-3 right-3 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2"
        >
          {loading ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : null}
          {loading ? 'Analyzing...' : 'Track'}
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-slate-700 flex items-center justify-between">
          Recent Logs
          {logs.length > 0 && <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase tracking-wider">Today</span>}
        </h3>
        
        <div className="max-h-[300px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Utensils className="text-slate-200 mb-2" size={32} />
              <p className="text-slate-400 text-sm italic">Describe what you ate above to begin tracking macros.</p>
            </div>
          ) : (
            logs.slice().reverse().map(log => (
              <div key={log.id} className="flex justify-between items-center p-3 bg-slate-50/50 rounded-lg border border-slate-50">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-medium text-slate-800 truncate" title={log.description}>{log.description}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-900">{log.nutrition.calories} kcal</p>
                  <div className="flex gap-2 text-[9px] font-bold text-slate-500 uppercase">
                    <span>P:{log.nutrition.protein}g</span>
                    <span>C:{log.nutrition.carbs}g</span>
                    <span>F:{log.nutrition.fat}g</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MealTracker;
