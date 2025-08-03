import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Ritu AI Cook',
  description: 'An AI-powered seasonal cooking assistant for Indian cuisine.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-body antialiased">
      {children}
      <Toaster />
    </div>
  );
}
