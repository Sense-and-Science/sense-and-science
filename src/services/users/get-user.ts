import { doc, DocumentData, DocumentSnapshot, getDoc } from 'firebase/firestore';

import { userCollection } from '@/firebase';
import { BlogUser } from '@/types';

export async function getUser(userId: string) {
  let result: BlogUser | null = null,
    error = null;
  try {
    const userRef = doc(userCollection, userId);
    const user = await getDoc(userRef);
    if (!user) {
      throw new Error('User retrieval failed');
    }
    result = user.data() || null;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
