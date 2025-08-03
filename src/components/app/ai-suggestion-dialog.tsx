import { Sparkles } from 'lucide-react';
import type { Recipe } from '@/lib/data';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RecipeCard } from './recipe-card';

interface AISuggestionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  suggestions: Recipe[];
  query: string;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
}

export function AISuggestionDialog({ isOpen, onOpenChange, suggestions, query, isFavorite, onToggleFavorite }: AISuggestionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline text-3xl">
            <Sparkles className="text-primary" />
            AI Recipe Suggestions
          </DialogTitle>
          <DialogDescription>
            Here are some ideas based on your query: "{query}"
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          {suggestions.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {suggestions.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={isFavorite(recipe.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No suggestions found. Try a different query.</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
