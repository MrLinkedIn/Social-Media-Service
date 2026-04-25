export interface Business {
  id: string;
  userId: string;
  name: string;
  type: string;
  description?: string | null;
  tone: string;
  website?: string | null;
  phone?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
  socialAccounts?: SocialAccount[];
}

export interface SocialAccount {
  id: string;
  businessId: string;
  platform: string;
  accountId: string;
  accountName: string;
  pageId?: string | null;
  pageName?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  platforms: string[];
  status: PostStatus;
  scheduledAt?: Date | null;
  publishedAt?: Date | null;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  analytics?: PostAnalytics | null;
}

export interface PostAnalytics {
  id: string;
  postId: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  impressions: number;
  syncedAt: Date;
}

export type Platform = "facebook" | "instagram" | "twitter";
export type PostStatus = "DRAFT" | "SCHEDULED" | "PUBLISHED" | "FAILED";
export type PostType = "text" | "promotion" | "event" | "tips";
export type BusinessTone =
  | "professional"
  | "friendly"
  | "enthusiastic"
  | "humorous"
  | "inspirational"
  | "educational";
