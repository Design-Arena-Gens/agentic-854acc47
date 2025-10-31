"use client";

import React from 'react';
import type { Tweet } from '@/types';

const STORAGE_KEY = 'chatter_tweets_v1';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export type TweetContextValue = {
  tweets: Tweet[];
  addTweet: (content: string) => void;
  toggleLike: (id: string) => void;
  addReply: (parentId: string, content: string) => void;
};

export const TweetContext = React.createContext<TweetContextValue | null>(null);

export function useTweets() {
  const ctx = React.useContext(TweetContext);
  if (!ctx) throw new Error('useTweets must be used within TweetProvider');
  return ctx;
}

export function TweetProvider({ children }: { children: React.ReactNode }) {
  const [tweets, setTweets] = React.useState<Tweet[]>([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTweets(JSON.parse(raw));
      else setTweets(getSeedTweets());
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tweets));
    } catch {}
  }, [tweets]);

  const addTweet = (content: string) => {
    const newTweet: Tweet = {
      id: generateId(),
      author: 'You',
      handle: '@you',
      content: content.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      likedByMe: false,
      replies: [],
    };
    setTweets((prev) => [newTweet, ...prev]);
  };

  const toggleLike = (id: string) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, likedByMe: !t.likedByMe, likes: t.likedByMe ? t.likes - 1 : t.likes + 1 }
          : { ...t, replies: toggleLikeInReplies(t.replies, id) }
      )
    );
  };

  const addReply = (parentId: string, content: string) => {
    const reply: Tweet = {
      id: generateId(),
      author: 'You',
      handle: '@you',
      content: content.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      likedByMe: false,
      replies: [],
    };
    setTweets((prev) => prev.map((t) => (t.id === parentId ? { ...t, replies: [reply, ...t.replies] } : { ...t, replies: addReplyInReplies(t.replies, parentId, reply) })));
  };

  return <TweetContext.Provider value={{ tweets, addTweet, toggleLike, addReply }}>{children}</TweetContext.Provider>;
}

function toggleLikeInReplies(list: Tweet[], id: string): Tweet[] {
  return list.map((r) => (r.id === id ? { ...r, likedByMe: !r.likedByMe, likes: r.likedByMe ? r.likes - 1 : r.likes + 1 } : { ...r, replies: toggleLikeInReplies(r.replies, id) }));
}

function addReplyInReplies(list: Tweet[], parentId: string, reply: Tweet): Tweet[] {
  return list.map((r) => (r.id === parentId ? { ...r, replies: [reply, ...r.replies] } : { ...r, replies: addReplyInReplies(r.replies, parentId, reply) }));
}

function getSeedTweets(): Tweet[] {
  const now = new Date();
  return [
    {
      id: generateId(),
      author: 'Ada Lovelace',
      handle: '@ada',
      content: 'Imagining an engine composing music. What could go wrong? ??',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60).toISOString(),
      likes: 2,
      likedByMe: false,
      replies: [],
    },
    {
      id: generateId(),
      author: 'Alan Turing',
      handle: '@aturing',
      content: 'Can machines think? Asking for a friend.',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(),
      likes: 5,
      likedByMe: false,
      replies: [],
    },
  ];
}
