
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Ingredient, Appliance, UserPreferences, Recipe } from '../types';
import { Sparkles, Clock, ChefHat, Flame } from 'lucide-react';

interface Props {
  inventory: Ingredient[];
  appliances: Appliance[];
  preferences: UserPreferences;
}

const RecipeRecommender: React.FC<Props> = ({ inventory, appliances, preferences }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await geminiService.generateRecipe(inventory, appliances, preferences);
      setRecipe(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="p-2 bg-purple-100 text-purple-700 rounded-lg">👨‍🍳</span>
          AI Meal Ideas
        </h2>
        <button
          onClick={handleGenerate}
          disabled={loading || inventory.length === 0}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2 shadow-lg shadow-purple-200 disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
          ) : (
            <Sparkles size={18} />
          )}
          {loading ? 'Finding Recipes...' : 'Generate Recipe'}
        </button>
      </div>

      {!recipe ? (
        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-slate-100 rounded-2xl">
          <p className="text-slate-400">Click generate to see what you can cook with your current ingredients and appliances!</p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{recipe.title}</h3>
            <p className="text-slate-600">{recipe.description}</p>
          </div>

          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-sm font-medium text-slate-600 whitespace-nowrap">
              <Clock size={16} /> {recipe.timeEstimate}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-sm font-medium text-slate-600 whitespace-nowrap">
              <ChefHat size={16} /> {recipe.difficulty}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-full text-sm font-bold text-orange-600 whitespace-nowrap">
              <Flame size={16} /> {recipe.nutrition.calories} kcal
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-slate-800 mb-3 border-b pb-1">Ingredients</h4>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-3 border-b pb-1">Instructions</h4>
              <ol className="space-y-3">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 text-sm">
                    <span className="font-bold text-blue-500">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeRecommender;
