import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { auth, userCollection } from '@/firebase';
import { BlogUserRole, CreateUserDTO } from '@/types';
import { uploadFile } from '@/utils';

export async function createUser(createUserDto: CreateUserDTO) {
  const { avatar, contactNo, email, firstName, lastName, password } =
    createUserDto;

  let avatarData = {
    id: undefined,
    url: undefined,
    thumbnailUrl: undefined,
  } as {
    id: string | undefined;
    url: string | undefined;
    thumbnailUrl: string | undefined;
  };

  if (avatar) {
    const avatarUploadResult = await uploadFile(uuid(), avatar);
    if (avatarUploadResult) {
      avatarData = avatarUploadResult;
    }
  }

  let result: UserCredential | null = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    const userId = result.user.uid;
    const newUserRef = doc(userCollection, userId);
    await setDoc(newUserRef, {
      avatarUrl: avatarData.url,
      avatarId: avatarData.id,
      avatarThumbnailUrl: avatarData.thumbnailUrl,
      contactNo,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      email,
      firstName,
      lastName,
      role: BlogUserRole.READER,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
