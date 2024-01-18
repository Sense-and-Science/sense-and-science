import { collection, CollectionReference, DocumentData } from 'firebase/firestore';

import { BlogAuthorApplication, BlogUser } from '@/types';
import { BlogArticle } from '@/types/models/article.model';

import { firestore } from './config';

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};
export const userCollection = createCollection<BlogUser>('users');
export const authorApplicationCollection = createCollection<BlogAuthorApplication>('author-applications')
export const articleCollection = createCollection<BlogArticle>('articles')