import { doc, getDoc, getDocsFromServer, orderBy, query, where } from 'firebase/firestore';

import { articleCollection, userCollection } from '@/firebase';
import { BlogArticleCompund, BlogArticleStatus } from '@/types';

export async function getPendingArticles(
) {
  let result: BlogArticleCompund[] | null = null,
    error = null;
  try {
    const articlesQuery = query(
      articleCollection,
      where('status', '==', BlogArticleStatus.PENDING),
      orderBy('createdAt')
    );
    const snapshot = await getDocsFromServer(articlesQuery);
    const articles: BlogArticleCompund[] = [];
    for (const ds of snapshot.docs) {
      const applicationData = ds.data();
      const userId = applicationData.userId

      const userDocRef = doc(userCollection, userId)
      const userDoc = await getDoc(userDocRef)
      if(userDoc.exists()) {
        const userData = userDoc.data()
        const data: BlogArticleCompund = {
            ...applicationData,
            authorContactNo: userData.contactNo,
            authorName: `${userData.firstName} ${userData.lastName}`,
            authorAvatar: userData.avatarUrl,
            userId,
            id: ds.id,
          };
          articles.push(data);
      }

    }
    result = articles;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
