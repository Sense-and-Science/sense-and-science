import { doc, getDoc, getDocs, or, query, where } from 'firebase/firestore';

import { userCollection } from '@/firebase';
import { BlogUserCompound, BlogUserRole } from '@/types';

export async function getAuthors() {
  let result: BlogUserCompound[] | null = null,
    error = null;
  try {
    const authorQuery = query(
      userCollection,
      or(
        where('role', '==', BlogUserRole.AUTHOR),
        where('role', '==', BlogUserRole.ADMIN)
      )
    );
    const authorSanpshot = await getDocs(authorQuery);

    const authors: BlogUserCompound[] = [];
    authorSanpshot.forEach((as) => {
      const authorId = as.id;
      const authorData = as.data();
      authors.push({
        ...authorData,
        id: authorId,
      });
    });

    result = authors;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
