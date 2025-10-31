export type Tweet = {
  id: string;
  author: string;
  handle: string;
  avatarUrl?: string;
  content: string;
  createdAt: string; // ISO string
  likes: number;
  likedByMe: boolean;
  replies: Tweet[];
};
