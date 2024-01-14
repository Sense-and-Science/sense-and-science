import { doc, updateDoc } from 'firebase/firestore';

import { authorApplicationCollection, userCollection } from '@/firebase';
import { BlogAuthorApplicationStatus, BlogUserRole } from '@/types';

export async function updateApplicationStatus(
  userId: string,
  applicationId: string,
  status: BlogAuthorApplicationStatus
) {
  let result: true | null = null,
    error = null;
  try {
    const userDoc = doc(userCollection, userId);
    const applicationDoc = doc(authorApplicationCollection, applicationId);

    if (status === BlogAuthorApplicationStatus.APPROVED) {
      await updateDoc(userDoc, {
        role: BlogUserRole.AUTHOR,
      });

      await updateDoc(applicationDoc, {
        status: BlogAuthorApplicationStatus.APPROVED,
      });
    } else {
      await updateDoc(userDoc, {
        role: BlogUserRole.READER,
      });

      await updateDoc(applicationDoc, {
        status: BlogAuthorApplicationStatus.DENIED,
      });
    }
    result = true;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
