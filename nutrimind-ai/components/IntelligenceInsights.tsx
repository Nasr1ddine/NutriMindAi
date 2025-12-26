
import React from 'react';
import { IntelligenceInsight } from '../types';
import { Brain, AlertCircle, TrendingUp, Calendar, Zap, RefreshCcw } from 'lucide-react';

interface Props {
  insights: IntelligenceInsight[];
}

const IntelligenceInsights: React.FC<Props> = ({ insights }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'waste': return <RefreshCcw className="text-orange-500" size={20} />;
      case 'health': return <TrendingUp className="text-emerald-500" size={20} />;
      case 'behavior': return <Calendar className="text-blue-500" size={20} />;
      case 'inventory': return <AlertCircle className="text-amber-500" size={20} />;
      default: return <Brain className="text-purple-500" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-purple-600 rounded-lg text-white shadow-lg shadow-purple-200">
            <Brain size={24} />
          </div>
          NutriMind AI Brain
        </h2>
        <div className="px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-[10px] font-bold text-purple-600 uppercase tracking-widest animate-pulse">
          Neural Sync: Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div 
            key={insight.id}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${
              insight.priority === 'high' ? 'bg-rose-500' : insight.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
            }`} />
            
            <div className="flex gap-4">
              <div className="mt-1">{getIcon(insight.type)}</div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {insight.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                  {insight.description}
                </p>
              </div>
            </div>
            
            {insight.priority === 'high' && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase">Urgent Action Recommended</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ML Architecture Visualization Placeholder */}
      <div className="mt-8 bg-slate-900 rounded-3xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Zap className="text-blue-500/20" size={100} />
        </div>
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-ping" />
          Active Intelligence Loops
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
          <div className="space-y-2 border-l border-white/10 pl-4">
            <p className="text-blue-400 font-bold uppercase tracking-wider">Predictive Layer</p>
            <p className="text-slate-400">Probabilistic Forecasting [Stock Level: 0.82]</p>
            <p className="text-slate-400">Bayesian Intake Modeling [CI: 95%]</p>
          </div>
          <div className="space-y-2 border-l border-white/10 pl-4">
            <p className="text-purple-400 font-bold uppercase tracking-wider">Behavioral Layer</p>
            <p className="text-slate-400">Reinforcement Habit Loops [Reward: +0.42]</p>
            <p className="text-slate-400">Anomaly Detection [Workout Skips: 2]</p>
          </div>
          <div className="space-y-2 border-l border-white/10 pl-4">
            <p className="text-emerald-400 font-bold uppercase tracking-wider">Optimization Layer</p>
            <p className="text-slate-400">Vectorized Flavor Embedding [Spicy-High]</p>
            <p className="text-slate-400">Constraint-Based Planning [Multi-Tool]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceInsights;
