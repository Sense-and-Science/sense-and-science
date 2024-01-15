import { addDoc, and, getDocs, or, query, Timestamp, updateDoc, where } from 'firebase/firestore';

import { articleCollection } from '@/firebase';
import { CreateArticleDTO } from '@/types';
import { BlogArticleStatus } from '@/types/models/article.model';

export async function createArticleDraft(createArticleDTO: CreateArticleDTO) {
  const { userId, content, description, imageIds, title, slug } =
    createArticleDTO;
  let result: true | null = null,
    error = null;
  try {
    const docQueryForPublishedExistence = query(
      articleCollection,
      and(
        where('slug', '==', slug),
        where('status', '!=', BlogArticleStatus.DRAFT)
      )
    );
    const snapshotForPublishedExistence = await getDocs(
      docQueryForPublishedExistence
    );
    if (snapshotForPublishedExistence.docs.length > 0) {
      error = new Error('Title already exists');
      return { result, error };
    }

    const docQueryForDraftedExistence = query(
      articleCollection,
      and(
        where('slug', '==', slug),
        where('status', '==', BlogArticleStatus.DRAFT)
      )
    );
    const snapshotForDraftedExistence = await getDocs(
      docQueryForDraftedExistence
    );

    if (snapshotForDraftedExistence.docs.length > 0) {
      const docRef = snapshotForDraftedExistence.docs[0].ref;
      await updateDoc(docRef, {
        content,
        description,
        imageIds,
        title,
        slug,
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
        status: BlogArticleStatus.DRAFT
      });
    }

    result = true;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
