import {
    addDoc, and, getDoc, getDocs, query, Timestamp, updateDoc, where
} from 'firebase/firestore';

import { articleCollection } from '@/firebase';
import { CreateArticleDTO } from '@/types';
import { BlogArticleStatus } from '@/types/models/article.model';

export async function createArticle(createArticleDTO: CreateArticleDTO) {
  const { userId, content, description, imageIds, title, slug } =
    createArticleDTO;
  let result: true | null = null,
    error = null;
  try {
    const docQueryForPublished = query(
      articleCollection,
      and(
        where('slug', '==', slug),
        where('status', '!=', BlogArticleStatus.DRAFT)
      )
    );

    const snapshotForPublished = await getDocs(docQueryForPublished);
    if (snapshotForPublished.docs.length > 0) {
      error = new Error('Title already exists');
      return { result, error };
    }

    const docQueryForDrafted = query(
      articleCollection,
      and(
        where('slug', '==', slug),
        where('status', '==', BlogArticleStatus.DRAFT)
      )
    );
    const snapshotForDrafted = await getDocs(docQueryForDrafted);

    if (snapshotForDrafted.docs.length > 0) {
      const docRef = snapshotForDrafted.docs[0].ref;
      await updateDoc(docRef, {
        content,
        description,
        imageIds,
        title,
        slug,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        userId,
        status: BlogArticleStatus.PENDING,
      });
    } else {
      await addDoc(articleCollection, {
        content,
        description,
        imageIds,
        title,
        slug,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        userId,
        status: BlogArticleStatus.PENDING,
      });
    }
    result = true;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
