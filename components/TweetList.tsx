"use client";

import React from 'react';
import { useTweets } from '@/components/TweetProvider';
import TweetItem from '@/components/TweetItem';

export default function TweetList() {
  const { tweets } = useTweets();
  return (
    <div>
      {tweets.map((t) => (
        <div key={t.id} className="border-b">
          <TweetItem tweet={t} />
        </div>
      ))}
    </div>
  );
}
