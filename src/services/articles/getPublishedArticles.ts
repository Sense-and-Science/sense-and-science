import { doc, getDoc, getDocsFromServer, orderBy, query, where } from 'firebase/firestore';

import { articleCollection, userCollection } from '@/firebase';
import { BlogArticleBrief, BlogArticleStatus, BlogUser } from '@/types';

export async function getPublishedArticles() {
  let result: BlogArticleBrief[] | null = null,
    error = null;
  try {
    const articlesQuery = query(
      articleCollection,
      where('status', '==', BlogArticleStatus.PUBLISHED),
      orderBy('updatedAt', 'desc')
    );
    const snapshot = await getDocsFromServer(articlesQuery);
    const articles: BlogArticleBrief[] = [];

    const alreadyGotUsers: (BlogUser & { id: string })[] = [];

    for (const ds of snapshot.docs) {
      const applicationData = ds.data();
      const userId = applicationData.userId;

      let isUserAlreadyGot = alreadyGotUsers.find((u) => u.id === userId);
      if (!isUserAlreadyGot) {
        const userDocRef = doc(userCollection, userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          isUserAlreadyGot = { ...userDoc.data(), id: userDoc.id };
          alreadyGotUsers.push(isUserAlreadyGot);
        }
      }

      if (isUserAlreadyGot) {
        const data: BlogArticleBrief = {
          authorName: `${isUserAlreadyGot.firstName} ${isUserAlreadyGot.lastName}`,
          authorAvatar: isUserAlreadyGot.avatarUrl,
          userId,
          id: ds.id,
          coverImage: applicationData.coverImage,
          description: applicationData.description,
          slug: applicationData.slug,
          title: applicationData.title,
          updatedAt: applicationData.updatedAt,
        };
        articles.push(data);
      }
    }
    result = articles;
  } catch (e) {
    console.log((e as Error).message);
    error = e;
  }
  return { result, error };
}
