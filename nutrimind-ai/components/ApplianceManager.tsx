
import React, { useState } from 'react';
import { Appliance } from '../types';
import { Plus, Power, PowerOff, Trash2 } from 'lucide-react';

interface Props {
  appliances: Appliance[];
  onAdd: (name: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const ApplianceManager: React.FC<Props> = ({ appliances, onAdd, onToggle, onRemove }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name);
      setName('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="p-2 bg-orange-100 text-orange-700 rounded-lg">🔌</span>
        Kitchen Appliances
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add appliance (e.g. Air Fryer)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
        />
        <button className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition">
          <Plus size={20} />
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {appliances.map((app) => (
          <div 
            key={app.id} 
            className={`flex items-center justify-between p-3 rounded-xl border transition ${
              app.available ? 'bg-orange-50/30 border-orange-100' : 'bg-slate-50 border-slate-100 grayscale'
            }`}
          >
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onToggle(app.id)}
                className={`p-1.5 rounded-lg transition ${
                  app.available ? 'bg-orange-100 text-orange-600' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {app.available ? <Power size={16} /> : <PowerOff size={16} />}
              </button>
              <span className={`text-sm font-semibold ${app.available ? 'text-slate-900' : 'text-slate-400'}`}>
                {app.name}
              </span>
            </div>
            <button 
              onClick={() => onRemove(app.id)}
              className="text-slate-300 hover:text-red-500 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplianceManager;
