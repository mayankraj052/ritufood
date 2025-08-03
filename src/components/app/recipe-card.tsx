import Image from 'next/image';
import { Heart, ChefHat, Leaf, MapPin } from 'lucide-react';
import type { Recipe } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite }: RecipeCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image}
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={recipe.imageHint}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(recipe.id);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`h-6 w-6 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
          </Button>
        </div>
        <div className="p-6 pb-2">
          <CardTitle className="font-headline text-2xl">{recipe.title}</CardTitle>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline"><Leaf className="mr-1 h-3 w-3" />{recipe.season}</Badge>
            <Badge variant="outline"><ChefHat className="mr-1 h-3 w-3" />{recipe.mealType}</Badge>
            <Badge variant="outline"><MapPin className="mr-1 h-3 w-3" />{recipe.region}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ingredients">
            <AccordionTrigger className="text-base font-medium">Ingredients</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="instructions">
            <AccordionTrigger className="text-base font-medium">Instructions</AccordionTrigger>
            <AccordionContent className="text-muted-foreground whitespace-pre-line">
              {recipe.instructions}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
