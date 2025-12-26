
import React from 'react';
import { UserPreferences } from '../types';
import { Target, Utensils, Zap } from 'lucide-react';

interface Props {
  preferences: UserPreferences;
  onUpdate: (prefs: UserPreferences) => void;
}

const CUISINES = ['Asian', 'Mediterranean', 'Mexican', 'Italian', 'Indian', 'American', 'French'];
const FLAVORS = ['Salty', 'Spicy', 'Sweet', 'Sour', 'Umami', 'Bitter'];

const PreferencesManager: React.FC<Props> = ({ preferences, onUpdate }) => {
  const toggleItem = (list: string[], item: string, key: keyof UserPreferences) => {
    const newList = list.includes(item) 
      ? list.filter(i => i !== item) 
      : [...list, item];
    onUpdate({ ...preferences, [key]: newList });
  };

  return (
    <div className="space-y-8">
      {/* Health Goal Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Target className="text-blue-600" size={24} />
          Primary Health Goal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'weight-loss', label: 'Lose Weight', desc: 'Caloric deficit & high satiety', color: 'bg-rose-50 border-rose-200 text-rose-700' },
            { id: 'maintenance', label: 'Maintain', desc: 'Balanced energy & steady weight', color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { id: 'muscle-gain', label: 'Build Muscle', desc: 'Caloric surplus & high protein', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' }
          ].map((goal) => (
            <button
              key={goal.id}
              onClick={() => onUpdate({ ...preferences, healthGoals: goal.id as any })}
              className={`text-left p-4 rounded-xl border-2 transition ${
                preferences.healthGoals === goal.id 
                ? `${goal.color} scale-[1.02] shadow-md` 
                : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'
              }`}
            >
              <p className="font-bold mb-1">{goal.label}</p>
              <p className="text-xs opacity-80">{goal.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Food Preferences Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Utensils className="text-purple-600" size={24} />
            Cuisine Preferences
          </h2>
          <div className="flex flex-wrap gap-2">
            {CUISINES.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => toggleItem(preferences.cuisines, cuisine, 'cuisines')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  preferences.cuisines.includes(cuisine)
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="text-amber-500" size={24} />
            Flavor Profiles
          </h2>
          <div className="flex flex-wrap gap-2">
            {FLAVORS.map((flavor) => (
              <button
                key={flavor}
                onClick={() => toggleItem(preferences.flavors, flavor, 'flavors')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  preferences.flavors.includes(flavor)
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {flavor}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PreferencesManager;
