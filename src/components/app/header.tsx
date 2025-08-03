import { Soup } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Soup className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl font-bold text-gray-800">
            Ritu <span className="text-primary">AI</span> Cook
          </h1>
        </div>
      </div>
    </header>
  );
}
