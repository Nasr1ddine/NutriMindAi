
import React from 'react';
import { 
  ShieldCheck, 
  Server, 
  Cpu, 
  Database, 
  Layout, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Code2,
  TrendingUp,
  Target,
  Users,
  Brain,
  Zap,
  BarChart4
} from 'lucide-react';

const Blueprint: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16">
      {/* 1. Executive Summary */}
      <section id="executive-summary" className="relative">
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-50 rounded-full -z-10" />
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          NutriMind AI <span className="text-blue-600">Product Blueprint</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
          An implementation-ready master document for a Python-FastAPI / Flutter nutrition ecosystem, leveraging Bayesian inference, 
          reinforcement learning, and multimodal LLMs to solve kitchen management and metabolic optimization.
        </p>
      </section>

      {/* 5. AI/ML Deep Intelligence Design */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="text-purple-600" size={32} />
          <h2 className="text-3xl font-bold text-slate-900">5. Deep Intelligence Architecture</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-900 rounded-3xl text-white shadow-xl border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-blue-400" size={20} />
              <h3 className="font-bold text-xl">Recommendation Engine</h3>
            </div>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <span className="text-blue-300 font-bold">Collaborative Filtering:</span> Matches user patterns against global high-success health profiles.
              </li>
              <li>
                <span className="text-blue-300 font-bold">Vector Embeddings:</span> Uses Pinecone to store "Flavor Vectors" (e.g., Spicy + Umami + Fast-Prep) for semantic discovery.
              </li>
              <li>
                <span className="text-blue-300 font-bold">Novelty Injector:</span> Multi-armed bandit algorithms prevent "Menu Fatigue" by introducing 15% novelty items weekly.
              </li>
            </ul>
          </div>

          <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <BarChart4 className="text-emerald-600" size={20} />
              <h3 className="font-bold text-xl">Pantry Intelligence</h3>
            </div>
            <ul className="space-y-4 text-sm text-slate-600">
              <li>
                <span className="text-emerald-600 font-bold">Consumption Modeling:</span> Time-series analysis (ARIMA) predicts ingredient run-out dates based on historical velocity.
              </li>
              <li>
                <span className="text-emerald-600 font-bold">Bayesian Substitution:</span> Calculates the probability of recipe success when swapping ingredients (e.g., Greek Yogurt vs Kefir).
              </li>
              <li>
                <span className="text-emerald-600 font-bold">Waste Detection:</span> ML detects items with low usage frequency relative to expiry, triggering "Hero Recipes" to save ingredients.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Health & Behavioral Intelligence */}
      <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl -z-0" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-900">6. Metabolic Optimization</h2>
            <p className="text-blue-700 leading-relaxed">
              Our system moves beyond simple calorie counting into **Dynamic Predictive Modeling**.
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-xs">AI</div>
                <p className="text-sm text-blue-800">**Behavioral Prediction:** Identifies high-risk skip windows (e.g., "Mondays at 1 PM") and sends preventative micro-reminders.</p>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-xs">AI</div>
                <p className="text-sm text-blue-800">**Macro Balancing:** Reinforcement learning adjusts the next meal's suggestions based on breakfast/lunch performance.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-blue-200">
            <p className="font-mono text-[10px] text-blue-600 uppercase tracking-widest mb-4">Core Model Logic</p>
            <code className="text-xs text-blue-900 whitespace-pre">
{`Predictive_Intake = f(History, Circadian, Workout_Load)
Target_Correction = Goal_Target - Current_State

# Thompson Sampling for Recommendation
Selection = ArgMax(Beta_Distribution(Success_Rate))`}
            </code>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Server className="text-blue-600" size={32} />
          <h2 className="text-3xl font-bold text-slate-900">3. System Architecture</h2>
        </div>
        <div className="bg-slate-900 rounded-3xl p-8 text-blue-400 font-mono text-sm leading-loose shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-white font-bold border-b border-white/10 pb-2">Client Tier (Flutter)</p>
              <p>• State Management: Bloc/Provider</p>
              <p>• UI Components: Material 3 / Custom Design System</p>
              <p>• Local Storage: Hive (Offline Support)</p>
            </div>
            <div className="space-y-4">
              <p className="text-white font-bold border-b border-white/10 pb-2">API Gateway (Python/FastAPI)</p>
              <p>• Auth: OAuth2 + JWT (FastAPI-Users)</p>
              <p>• Documentation: Auto-generated OpenAPI (Swagger)</p>
              <p>• Tasks: Celery + Redis (Background Image Processing)</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-white font-bold mb-4">Data Persistence</p>
            <p>PostgreSQL (Relational) ⟷ Pinecone (Vector Search) ⟷ Redis (Inventory Cache)</p>
          </div>
        </div>
      </section>

      {/* 4. Database Schema */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Database className="text-blue-600" size={32} />
          <h2 className="text-3xl font-bold text-slate-900">4. Database Schema</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 font-bold text-slate-700 border-b">Entity</th>
                <th className="p-4 font-bold text-slate-700 border-b">Core Fields</th>
                <th className="p-4 font-bold text-slate-700 border-b">Relationships</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b">
                <td className="p-4 font-semibold">UserProfiles</td>
                <td className="p-4 text-slate-600 italic">id, goals_json, allergies_arr, daily_cal_limit, workout_times, flavor_pref_id</td>
                <td className="p-4 text-blue-600">1:M Logs, 1:1 Kitchen</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold">Inventory</td>
                <td className="p-4 text-slate-600 italic">id, kitchen_id, ing_name, usage_freq, predicted_empty_date, last_stocked</td>
                <td className="p-4 text-blue-600">M:1 Kitchen</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold">Meals</td>
                <td className="p-4 text-slate-600 italic">id, user_id, title, macros_json, sentiment_score, appliance_type</td>
                <td className="p-4 text-blue-600">M:1 User</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-slate-100">
        <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">DOCUMENT ID: NM-ARCH-2025-V2.0 | INTEL-ENABLED ARCHITECTURE</p>
      </footer>
    </div>
  );
};

export default Blueprint;
