
import React, { useState } from 'react';
import { 
  AppSection, 
  Ingredient, 
  Appliance, 
  UserPreferences, 
  MealLog,
  IntelligenceInsight
} from './types';
import Blueprint from './components/Blueprint';
import InventoryManager from './components/InventoryManager';
import ApplianceManager from './components/ApplianceManager';
import PreferencesManager from './components/PreferencesManager';
import MealTracker from './components/MealTracker';
import RecipeRecommender from './components/RecipeRecommender';
import IntelligenceInsights from './components/IntelligenceInsights';
import { 
  LayoutDashboard, 
  ShoppingBasket, 
  UtensilsCrossed, 
  FileText, 
  Settings,
  Heart,
  Sparkles,
  UserCircle,
  Brain,
  TrendingDown,
  Activity,
  // Added Zap to imports to fix the error on line 220
  Zap
} from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.BLUEPRINT);
  
  // App State
  const [inventory, setInventory] = useState<Ingredient[]>([
    { id: '1', name: 'Eggs', quantity: '6', unit: 'pcs', usageFrequency: 14, predictedStockLevel: 0.15 },
    { id: '2', name: 'Spinach', quantity: '200', unit: 'g', usageFrequency: 2, predictedStockLevel: 0.8 },
    { id: '3', name: 'Avocado', quantity: '1', unit: 'pcs', usageFrequency: 3, predictedStockLevel: 0.4 },
    { id: '4', name: 'Chicken Breast', quantity: '400', unit: 'g', usageFrequency: 5, predictedStockLevel: 0.9 }
  ]);
  
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: '1', name: 'Stove', available: true, type: 'heating' },
    { id: '2', name: 'Oven', available: true, type: 'heating' },
    { id: '3', name: 'Microwave', available: true, type: 'heating' },
    { id: '4', name: 'Air Fryer', available: true, type: 'heating' }
  ]);
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryRestrictions: ['Keto-friendly'],
    allergies: ['Peanuts'],
    cuisines: ['Asian', 'Mediterranean'],
    flavors: ['Umami', 'Spicy'],
    healthGoals: 'maintenance',
    dailyCalorieTarget: 2200,
    preferredComplexity: 'Medium'
  });

  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);

  const [aiInsights] = useState<IntelligenceInsight[]>([
    { id: '1', type: 'inventory', title: 'Running Low: Eggs', description: 'Based on your 2-week history, you will run out of eggs tomorrow morning.', priority: 'high' },
    { id: '2', type: 'behavior', title: 'Lunch Anomaly Detected', description: 'You usually skip lunch on Mondays. We suggest a 5-min prep meal for tomorrow.', priority: 'medium' },
    { id: '3', type: 'health', title: 'Weekend Protein Drop', description: 'Historical data shows a 30% drop in protein on Saturdays. Adjusted weekend plans generated.', priority: 'low' },
    { id: '4', type: 'waste', title: 'Spinach Expiry Risk', description: 'Usage frequency is low for this item. Suggested "Waste-Hero" recipe: Spinach Smoothie.', priority: 'medium' }
  ]);

  // Handlers
  const handleAddIngredient = (item: Omit<Ingredient, 'id'>) => {
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    setInventory(prev => [...prev, newItem]);
  };

  const handleRemoveIngredient = (id: string) => {
    setInventory(prev => prev.filter(i => i.id !== id));
  };

  const handleAddAppliance = (name: string) => {
    const newApp: Appliance = { id: Date.now().toString(), name, available: true, type: 'heating' };
    setAppliances(prev => [...prev, newApp]);
  };

  const handleToggleAppliance = (id: string) => {
    setAppliances(prev => prev.map(a => a.id === id ? { ...a, available: !a.available } : a));
  };

  const handleRemoveAppliance = (id: string) => {
    setAppliances(prev => prev.filter(a => a.id !== id));
  };

  const handleLogMeal = (log: MealLog) => {
    setMealLogs(prev => [...prev, log]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-slate-900 text-white flex flex-col p-4 md:sticky md:top-0 md:h-screen shadow-2xl z-20">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Heart className="fill-white text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">NutriMind<span className="text-blue-400 italic">AI</span></span>
        </div>

        <div className="space-y-1 flex-1">
          <button 
            onClick={() => setActiveSection(AppSection.BLUEPRINT)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSection === AppSection.BLUEPRINT ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <FileText size={20} /> Architecture
          </button>
          
          <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Core Engine</div>
          
          <button 
            onClick={() => setActiveSection(AppSection.DASHBOARD)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSection === AppSection.DASHBOARD ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          
          <button 
            onClick={() => setActiveSection(AppSection.AI_BRAIN)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSection === AppSection.AI_BRAIN ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <Brain size={20} /> AI Brain
          </button>

          <button 
            onClick={() => setActiveSection(AppSection.INVENTORY)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSection === AppSection.INVENTORY ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <ShoppingBasket size={20} /> Pantry Sync
          </button>

          <button 
            onClick={() => setActiveSection(AppSection.PREFERENCES)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSection === AppSection.PREFERENCES ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <UserCircle size={20} /> Bio Profiles
          </button>

          <button 
            onClick={() => setActiveSection(AppSection.RECOMMENDATIONS)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSection === AppSection.RECOMMENDATIONS ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <UtensilsCrossed size={20} /> Smart Recs
          </button>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-xl mb-4 text-[10px] space-y-2">
            <div className="flex justify-between items-center text-slate-500 uppercase font-bold">
              <span>Cloud Latency</span>
              <span className="text-emerald-500">22ms</span>
            </div>
            <div className="flex justify-between items-center text-slate-500 uppercase font-bold">
              <span>ML Load</span>
              <span className="text-amber-500">14%</span>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition">
            <Settings size={20} /> Config
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800 capitalize tracking-tight">
              {activeSection.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
               <Activity size={14} className="text-blue-500" />
               <span className="text-xs font-bold text-slate-600">Model: Gemini-3-Pro</span>
             </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white shadow-md flex items-center justify-center text-white font-bold">
              AK
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
          {activeSection === AppSection.BLUEPRINT && <Blueprint />}

          {activeSection === AppSection.DASHBOARD && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MealTracker logs={mealLogs} onLog={handleLogMeal} />
              <div className="space-y-8">
                {/* Micro Intelligence Insights */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3">
                    <Brain className="text-purple-100 group-hover:text-purple-200 transition-colors" size={48} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <TrendingDown className="text-rose-500" size={18} /> Prediction: Low Inventory
                  </h3>
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl mb-4">
                    <p className="text-sm text-rose-800 font-medium">
                      Critical shortage: **Eggs** (Predicted out: 24h).
                    </p>
                    <p className="text-[10px] text-rose-600 mt-1 uppercase font-bold tracking-widest">Add to shopping list?</p>
                  </div>
                  <button 
                    onClick={() => setActiveSection(AppSection.AI_BRAIN)}
                    className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                  >
                    Explore all 4 AI insights <Sparkles size={12} />
                  </button>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Zap className="text-blue-500" size={18} /> Metabolic Status
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Protein (Goal: 150g)</span>
                        <span className="font-bold text-slate-700">{mealLogs.reduce((s, l) => s + l.nutrition.protein, 0)}g</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${Math.min(100, (mealLogs.reduce((s, l) => s + l.nutrition.protein, 0) / 150) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === AppSection.AI_BRAIN && (
            <IntelligenceInsights insights={aiInsights} />
          )}

          {activeSection === AppSection.INVENTORY && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <InventoryManager 
                  inventory={inventory} 
                  onAdd={handleAddIngredient} 
                  onRemove={handleRemoveIngredient} 
                />
              </div>
              <div className="space-y-8">
                <ApplianceManager 
                  appliances={appliances}
                  onAdd={handleAddAppliance}
                  onToggle={handleToggleAppliance}
                  onRemove={handleRemoveAppliance}
                />
              </div>
            </div>
          )}

          {activeSection === AppSection.PREFERENCES && (
            <PreferencesManager 
              preferences={preferences}
              onUpdate={setPreferences}
            />
          )}

          {activeSection === AppSection.RECOMMENDATIONS && (
            <RecipeRecommender 
              inventory={inventory} 
              appliances={appliances} 
              preferences={preferences} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
