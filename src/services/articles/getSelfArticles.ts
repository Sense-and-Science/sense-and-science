import { getDocsFromServer, orderBy, query, where } from 'firebase/firestore';

import { articleCollection } from '@/firebase';
import { BlogArticleCompund } from '@/types';

export async function getSelfArticles(
  userId: string,
  authorName: string,
  authorContactNo: string
) {
  let result: BlogArticleCompund[] | null = null,
    error = null;
  try {
    const articlesQuery = query(
      articleCollection,
      where('userId', '==', userId),
      orderBy('createdAt')
    );
    const snapshot = await getDocsFromServer(articlesQuery);
    console.log('Got snapshot with ', snapshot.docs.length, ' docs');
    const articles: BlogArticleCompund[] = [];
    for (const ds of snapshot.docs) {
      const applicationData = ds.data();
      const data: BlogArticleCompund = {
        ...applicationData,
        authorContactNo,
        authorName,
        authorAvatar: "",
        userId,
        id: ds.id,
      };
      articles.push(data);
    }
    result = articles;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
