'use server';
/**
 * @fileOverview An AI agent that suggests recipes based on a natural language query, 
 * considering seasonal ingredients.
 *
 * - suggestRecipeFromQuery - A function that suggests recipes based on a query.
 * - SuggestRecipeFromQueryInput - The input type for the suggestRecipeFromQuery function.
 * - SuggestRecipeFromQueryOutput - The return type for the suggestRecipeFromQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRecipeFromQueryInputSchema = z.object({
  query: z.string().describe('The natural language query for recipe suggestions.'),
  season: z.string().describe('The current season (e.g., Summer, Winter, Monsoon, Spring).'),
  availableIngredients: z.array(z.string()).optional().describe('List of available ingredients to consider'),
});
export type SuggestRecipeFromQueryInput = z.infer<typeof SuggestRecipeFromQueryInputSchema>;

const SuggestRecipeFromQueryOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      title: z.string().describe('The title of the recipe.'),
      ingredients: z.array(z.string()).describe('The list of ingredients for the recipe.'),
      instructions: z.string().describe('The cooking instructions for the recipe.'),
      season: z.string().describe('The season the recipe is best suited for'),
    })
  ).describe('A list of suggested recipes.'),
});
export type SuggestRecipeFromQueryOutput = z.infer<typeof SuggestRecipeFromQueryOutputSchema>;

export async function suggestRecipeFromQuery(input: SuggestRecipeFromQueryInput): Promise<SuggestRecipeFromQueryOutput> {
  return suggestRecipeFromQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRecipeFromQueryPrompt',
  input: {schema: SuggestRecipeFromQueryInputSchema},
  output: {schema: SuggestRecipeFromQueryOutputSchema},
  prompt: `You are a helpful AI cooking assistant specializing in Indian cuisine.  A user will provide you with a natural language query, along with the current season, and a list of ingredients that they have available.

You should respond with recipe suggestions that are relevant to the query, suitable for the specified season, and make use of the provided ingredients if possible.

Respond with a JSON array of recipe suggestions. Each recipe should include a title, a list of ingredients, instructions, and the season it is best suited for.

Here is the user's query: {{{query}}}

The current season is: {{{season}}}

Ingredients available: {{#if availableIngredients}}{{#each availableIngredients}}- {{{this}}}\n{{/each}}{{else}}None{{/if}}
`,
});

const suggestRecipeFromQueryFlow = ai.defineFlow(
  {
    name: 'suggestRecipeFromQueryFlow',
    inputSchema: SuggestRecipeFromQueryInputSchema,
    outputSchema: SuggestRecipeFromQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
