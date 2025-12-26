
export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  expiryDate?: string;
  category?: 'veg' | 'meat' | 'dairy' | 'spice' | 'other';
  usageFrequency?: number; // Average uses per week
  predictedStockLevel?: number; // 0 to 1 based on forecasting
}

export interface Appliance {
  id: string;
  name: string;
  available: boolean;
  type: 'heating' | 'prep' | 'storage';
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  cuisines: string[];
  flavors: string[]; 
  healthGoals: 'weight-loss' | 'maintenance' | 'muscle-gain';
  dailyCalorieTarget: number;
  workoutTimes?: string[]; // e.g., ["08:00", "18:00"]
  preferredComplexity?: 'Low' | 'Medium' | 'High';
}

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sodium?: number;
  };
  timeEstimate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface IntelligenceInsight {
  id: string;
  type: 'waste' | 'health' | 'behavior' | 'inventory';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export interface MealLog {
  id: string;
  timestamp: number;
  description: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export enum AppSection {
  BLUEPRINT = 'blueprint',
  DASHBOARD = 'dashboard',
  INVENTORY = 'inventory',
  PREFERENCES = 'preferences',
  RECOMMENDATIONS = 'recommendations',
  AI_BRAIN = 'ai-brain'
}
