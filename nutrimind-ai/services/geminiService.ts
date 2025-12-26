
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, UserPreferences, Ingredient, Appliance } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateRecipe(
    inventory: Ingredient[], 
    appliances: Appliance[], 
    preferences: UserPreferences
  ): Promise<Recipe> {
    const availableIngredients = inventory.map(i => `${i.quantity} ${i.unit} ${i.name}`).join(', ');
    const availableAppliances = appliances.filter(a => a.available).map(a => a.name).join(', ');
    
    const prompt = `Act as a world-class nutritionist and Michelin chef. Generate a personalized recipe based on:
    Available Ingredients: ${availableIngredients}
    AVAILABLE APPLIANCES (STRICTLY ONLY USE THESE): ${availableAppliances}
    DIETARY CONSTRAINTS: ${preferences.dietaryRestrictions.join(', ')}
    ALLERGIES: ${preferences.allergies.join(', ')}
    CUISINE PREFERENCES: ${preferences.cuisines.join(', ')}
    FLAVOR PROFILE: ${preferences.flavors.join(', ')}
    HEALTH GOAL: ${preferences.healthGoals} (Adjust macro ratios accordingly: weight-loss=low carb/high fiber, muscle-gain=high protein/moderate carb, maintenance=balanced).
    
    Only use available ingredients where possible. Suggest 1-2 missing items only if necessary to complete a high-quality meal.`;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
            nutrition: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fat: { type: Type.NUMBER }
              }
            },
            timeEstimate: { type: Type.STRING },
            difficulty: { type: Type.STRING }
          }
        }
      }
    });

    const responseText = response.text || "{}";
    return JSON.parse(responseText.trim()) as Recipe;
  }

  async parseMealLog(text: string): Promise<any> {
    const prompt = `Analyze this meal description and provide estimated nutritional values and identify the most likely meal type (breakfast, lunch, dinner, or snack): "${text}"`;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            type: { type: Type.STRING },
            nutrition: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fat: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    });

    const responseText = response.text || "{}";
    return JSON.parse(responseText.trim());
  }
}

export const geminiService = new GeminiService();
