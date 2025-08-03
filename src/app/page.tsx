'use client';

import { useState, useMemo, useTransition } from 'react';
import { FlameKindlingIcon, Heart, Search, Sparkles, Soup } from 'lucide-react';

import { allRecipes, seasonalIngredients, type Recipe, Seasons, MealTypes } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/use-favorites';
import { RecipeCard } from '@/components/app/recipe-card';
import { Header } from '@/components/app/header';
import { getAiRecipeSuggestion } from '@/app/actions';
import { AISuggestionDialog } from '@/components/app/ai-suggestion-dialog';

export default function Home() {
  const [season, setSeason] = useState<typeof Seasons[number]>('Summer');
  const [mealType, setMealType] = useState<typeof MealTypes[number]>('All');
  const [aiQuery, setAiQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [aiSuggestions, setAiSuggestions] = useState<Recipe[]>([]);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const handleAiSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    startTransition(async () => {
      const result = await getAiRecipeSuggestion({ query: aiQuery, season });
      const suggestionsWithIds = result.map((r, i) => ({ ...r, id: Date.now() + i }));
      setAiSuggestions(suggestionsWithIds);
      setIsAiDialogOpen(true);
    });
  };

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => {
      const seasonMatch = season === 'All' || recipe.season === season;
      const mealTypeMatch = mealType === 'All' || recipe.mealType === mealType;
      return seasonMatch && mealTypeMatch;
    });
  }, [season, mealType]);

  const favoriteRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => favorites.includes(recipe.id));
  }, [favorites]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-12">
          {/* Left Column */}
          <aside className="space-y-8 md:col-span-4 lg:col-span-3">
            {/* Filters */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Find a Recipe</CardTitle>
                <CardDescription>Filter by season and meal type.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Season</label>
                  <Select value={season} onValueChange={(value) => setSeason(value as typeof Seasons[number])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a season" />
                    </SelectTrigger>
                    <SelectContent>
                      {Seasons.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meal Type</label>
                  <Select value={mealType} onValueChange={(value) => setMealType(value as typeof MealTypes[number])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      {MealTypes.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                  <Sparkles className="text-primary" />
                  AI Assistant
                </CardTitle>
                <CardDescription>Get instant recipe ideas.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAiSearch} className="flex flex-col gap-4">
                  <Input
                    placeholder="e.g., south indian summer lunch"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                  />
                  <Button type="submit" disabled={isPending}>
                    {isPending ? 'Thinking...' : 'Ask Gemini'}
                    <Search className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Seasonal Ingredients */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">What's in Season?</CardTitle>
                <CardDescription>
                  Peak ingredients for <span className="font-semibold text-primary">{season}</span>.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {seasonalIngredients[season].map((ingredient) => (
                  <Badge key={ingredient} variant="secondary" className="bg-green-100 text-green-800">
                    {ingredient}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Right Column */}
          <div className="md:col-span-8 lg:col-span-9">
            <section id="recipes">
              <h2 className="mb-6 font-headline text-3xl font-bold tracking-tight">
                {season} {mealType !== 'All' ? mealType : ''} Recipes
              </h2>
              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} isFavorite={isFavorite(recipe.id)} onToggleFavorite={toggleFavorite} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No recipes found. Try changing your filters.</p>
              )}
            </section>

            {favoriteRecipes.length > 0 && (
              <section id="favorites" className="mt-12">
                <h2 className="mb-6 flex items-center gap-3 font-headline text-3xl font-bold tracking-tight">
                  <Heart className="text-red-500" />
                  My Favorites
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {favoriteRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} isFavorite={isFavorite(recipe.id)} onToggleFavorite={toggleFavorite} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t bg-card py-6">
        <div className="container mx-auto flex items-center justify-center gap-2 px-4 text-sm text-muted-foreground">
          <Soup size={16} />
          <p>Ritu AI Cook - Your Seasonal Indian Kitchen Companion</p>
        </div>
      </footer>
      
      <AISuggestionDialog
        isOpen={isAiDialogOpen}
        onOpenChange={setIsAiDialogOpen}
        suggestions={aiSuggestions}
        query={aiQuery}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}