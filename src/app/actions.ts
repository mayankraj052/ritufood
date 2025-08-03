'use server';

import { suggestRecipeFromQuery, SuggestRecipeFromQueryInput, SuggestRecipeFromQueryOutput } from '@/ai/flows/suggest-recipe-from-query';
import type { Recipe } from '@/lib/data';

// A helper type to bridge the AI output with our frontend Recipe type
type AiRecipeSuggestion = Omit<Recipe, 'id' | 'image' | 'imageHint' | 'region' | 'mealType'> & {
  season: string;
}

export async function getAiRecipeSuggestion(input: SuggestRecipeFromQueryInput): Promise<Recipe[]> {
  try {
    const result = await suggestRecipeFromQuery(input);
    if (!result || !result.suggestions) {
      return [];
    }

    // Adapt the AI output to the Recipe type used in the frontend
    const adaptedRecipes: Recipe[] = result.suggestions.map((suggestion: any) => ({
      id: 0, // ID will be assigned on the client
      title: suggestion.title,
      image: 'https://placehold.co/600x400', // Default placeholder
      imageHint: suggestion.title.toLowerCase().split(' ').slice(0,2).join(' '),
      season: suggestion.season,
      mealType: 'Dinner', // Default value as AI doesn't provide it
      region: 'North', // Default value as AI doesn't provide it
      ingredients: suggestion.ingredients,
      instructions: suggestion.instructions,
    }));

    return adaptedRecipes;
  } catch (error) {
    console.error("Error fetching AI recipe suggestions:", error);
    return [];
  }
}
