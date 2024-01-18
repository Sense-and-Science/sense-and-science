import {
    addDoc, and, getDoc, getDocs, query, Timestamp, updateDoc, where
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { articleCollection } from '@/firebase';
import { CreateArticleDTO } from '@/types';
import { BlogArticleStatus } from '@/types/models/article.model';
import { uploadFile } from '@/utils';

export async function createArticle(createArticleDTO: CreateArticleDTO) {
  const { userId, content, description, imageIds, title, slug, coverImage } =
    createArticleDTO;
  let result: true | null = null,
    error = null;
  try {
    let coverImageData = {
      id: undefined,
      coverImageUrl: undefined,
      coverImageThumbnailUrl: undefined,
    } as {
      id: string | undefined;
      coverImageUrl: string | undefined;
      coverImageThumbnailUrl: string | undefined;
    };

    if (coverImage) {
      const coverImageUploadResult = await uploadFile(uuid(), coverImage);
      if (coverImageUploadResult) {
        coverImageData = {
          id: coverImageUploadResult.id,
          coverImageThumbnailUrl: coverImageUploadResult.thumbnailUrl,
          coverImageUrl: coverImageUploadResult.url,
        };
      }
    }

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
        coverImage: coverImageData.coverImageUrl
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
        coverImage: coverImageData.coverImageUrl
      });
    }
    result = true;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
