"use client";

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTweets } from '@/components/TweetProvider';
import { cn } from '@/lib/utils';

export default function TweetComposer({ className }: { className?: string }) {
  const { addTweet } = useTweets();
  const [text, setText] = React.useState('');

  const disabled = text.trim().length === 0 || text.length > 280;

  return (
    <div className={cn('rounded-xl border p-4', className)}>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What is happening?!"
        className="mb-3 min-h-[90px]"
        maxLength={400}
      />
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{280 - text.length} left</div>
        <Button
          disabled={disabled}
          onClick={() => {
            addTweet(text);
            setText('');
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
