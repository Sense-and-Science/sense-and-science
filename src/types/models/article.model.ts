import { Timestamp } from 'firebase/firestore';

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
}

export interface BlogArticleCompund extends BlogArticle {
  authorName: string;
  authorContactNo: string;
  id: string;
}
