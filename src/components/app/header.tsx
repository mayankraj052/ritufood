import { Soup } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-3">
          <Soup className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
            Ritu AI Cook
          </h1>
        </div>
      </div>
    </header>
  );
}
