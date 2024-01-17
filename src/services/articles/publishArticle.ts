import { doc, updateDoc } from 'firebase/firestore';

import { articleCollection } from '@/firebase';
import { BlogArticleCompund, BlogArticleStatus } from '@/types';

export async function publishArticle(articleId: string) {
  let result: BlogArticleCompund[] | null = null,
    error = null;

  const articleRef = doc(articleCollection, articleId);
  try {
    await updateDoc(articleRef, {
      status: BlogArticleStatus.PUBLISHED,
    });
  } catch (e) {
    error = e;
  }
  return { result, error };
}
