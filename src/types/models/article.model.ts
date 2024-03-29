import { Timestamp } from 'firebase/firestore';
import { type } from 'os';

export enum BlogArticleStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  PENDING_UPDATE = 'PENDING_UPDATE',
  UNPUBLISHED = 'UNPUBLISHED',
}

export interface BlogArticle {
  title: string;
  slug: string;
  description: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status?: BlogArticleStatus;
  content: string;
  imageIds: string[];
  coverImage?: string
}

export interface BlogArticleCompund extends BlogArticle {
  authorName: string;
  authorContactNo: string;
  id: string;
  authorAvatar: string | undefined
}


export type BlogArticleBrief = Omit<BlogArticleCompund, "content" | "createdAt" | "status" | "imageIds" | "authorContactNo">
