import { addDoc, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { authorApplicationCollection, firestore, userCollection } from '@/firebase';
import { BlogAuthorApplicationStatus, BlogUserRole, CreateAuthorApplicationDTO } from '@/types';

export async function createAuthorApplication(
  createAuthorApplicationDto: CreateAuthorApplicationDTO
) {
  const { userId, reason } = createAuthorApplicationDto;
  let result: true | null = null,
    error = null;
  try {
    const userDoc = doc(userCollection, userId);
    await updateDoc(userDoc, {
      role: BlogUserRole.REQUESTED_TO_BE_AUTHOR,
    });

    await addDoc(authorApplicationCollection, {
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      reason,
      userId,
      status: BlogAuthorApplicationStatus.PENDING,
    });
    result = true;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
