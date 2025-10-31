"use client";

import React from 'react';
import { TweetProvider } from '@/components/TweetProvider';
import TweetComposer from '@/components/TweetComposer';
import TweetList from '@/components/TweetList';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between py-3">
          <div className="text-xl font-bold">Chatter</div>
          <button className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}>
            {theme === 'dark' ? 'Light' : 'Dark'} mode
          </button>
        </div>
      </div>

      <main className="container mx-auto grid gap-6 py-6 md:grid-cols-[1fr_320px]">
        <section>
          <TweetProvider>
            <TweetComposer />
            <Separator className="my-4" />
            <TweetList />
          </TweetProvider>
        </section>

        <aside className="hidden md:block">
          <div className="rounded-xl border p-4">
            <div className="mb-2 text-lg font-semibold">What is Chatter?</div>
            <p className="text-sm text-muted-foreground">A minimal Twitter-like app built with Next.js, Tailwind CSS, and shadcn/ui. Data is stored locally in your browser.</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
