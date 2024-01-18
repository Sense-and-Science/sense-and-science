import { doc, getDoc, getDocs, query, where } from 'firebase/firestore';

import { articleCollection, userCollection } from '@/firebase';
import { BlogArticleCompund } from '@/types';

export async function getPublishedArticleBySlug(slug: string) {
  let result: BlogArticleCompund | null = null;
  let error: Error | null = null;

  try {
    const queryForArticle = query(articleCollection, where('slug', '==', slug));
    const articleSnapshot = await getDocs(queryForArticle);
    if (articleSnapshot.docs.length == 1) {
      const articleDoc = articleSnapshot.docs[0];
      const article = articleDoc.data();
      const userId = article.userId;
      const userDoc = await getDoc(doc(userCollection, userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        result = {
          ...article,
          authorName: `${userData.firstName} ${userData.lastName}`,
          authorAvatar: userData.avatarUrl,
          authorContactNo: userData.contactNo,
          id: articleDoc.id,
        };

      }
    }
  } catch (e) {
    error = e as Error;
  }
  return { result, error };
}
