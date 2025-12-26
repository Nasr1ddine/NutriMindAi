
import React, { useState } from 'react';
import { Ingredient } from '../types';
import { Plus, Trash2, Calendar } from 'lucide-react';

interface Props {
  inventory: Ingredient[];
  onAdd: (item: Omit<Ingredient, 'id'>) => void;
  onRemove: (id: string) => void;
}

const InventoryManager: React.FC<Props> = ({ inventory, onAdd, onRemove }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('g');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && quantity) {
      onAdd({ name, quantity, unit });
      setName('');
      setQuantity('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="p-2 bg-green-100 text-green-700 rounded-lg">📦</span>
        Pantry & Fridge
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Item name (e.g. Eggs)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-20 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select 
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="pcs">pcs</option>
          <option value="ml">ml</option>
          <option value="cups">cups</option>
        </select>
        <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={24} />
        </button>
      </form>

      <div className="space-y-3">
        {inventory.length === 0 ? (
          <p className="text-center text-slate-400 py-4">Your kitchen is empty. Add some ingredients!</p>
        ) : (
          inventory.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group">
              <div>
                <span className="font-medium text-slate-800">{item.name}</span>
                <span className="ml-2 text-sm text-slate-500">{item.quantity} {item.unit}</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onRemove(item.id)}
                  className="text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InventoryManager;
