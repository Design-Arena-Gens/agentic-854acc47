"use client";

import React from 'react';
import type { Tweet } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Heart } from 'lucide-react';
import { useTweets } from '@/components/TweetProvider';
import { Textarea } from '@/components/ui/textarea';

function timeAgo(iso: string) {
  const delta = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (delta < 60) return `${delta}s`;
  if (delta < 3600) return `${Math.floor(delta / 60)}m`;
  if (delta < 86400) return `${Math.floor(delta / 3600)}h`;
  return `${Math.floor(delta / 86400)}d`;
}

export default function TweetItem({ tweet }: { tweet: Tweet }) {
  const { toggleLike, addReply } = useTweets();
  const [replying, setReplying] = React.useState(false);
  const [replyText, setReplyText] = React.useState('');

  return (
    <div className="flex gap-3 py-4">
      <Avatar className="mt-1" />
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold">{tweet.author}</span>
          <span className="text-muted-foreground">{tweet.handle} ? {timeAgo(tweet.createdAt)}</span>
        </div>
        <div className="whitespace-pre-wrap break-words py-2 text-sm">{tweet.content}</div>
        <div className="flex items-center gap-6 py-1 text-sm text-muted-foreground">
          <button className="inline-flex items-center gap-2 hover:text-foreground" onClick={() => setReplying((v) => !v)}>
            <MessageCircle className="h-4 w-4" />
            <span>{tweet.replies.length}</span>
          </button>
          <button
            className={`inline-flex items-center gap-2 hover:text-foreground ${tweet.likedByMe ? 'text-red-500' : ''}`}
            onClick={() => toggleLike(tweet.id)}
          >
            <Heart className={`h-4 w-4 ${tweet.likedByMe ? 'fill-current' : ''}`} />
            <span>{tweet.likes}</span>
          </button>
        </div>

        {replying && (
          <div className="rounded-lg border p-3">
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Reply..."
              className="mb-2"
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                disabled={replyText.trim().length === 0}
                onClick={() => {
                  addReply(tweet.id, replyText);
                  setReplyText('');
                  setReplying(false);
                }}
              >
                Reply
              </Button>
            </div>
          </div>
        )}

        {tweet.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            <Separator />
            {tweet.replies.map((r) => (
              <div key={r.id} className="flex gap-3">
                <Avatar className="mt-1 h-8 w-8" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold">{r.author}</span>
                    <span className="text-muted-foreground">{r.handle} ? {timeAgo(r.createdAt)}</span>
                  </div>
                  <div className="whitespace-pre-wrap break-words py-1 text-sm">{r.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
