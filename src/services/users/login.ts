import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

import { auth } from '@/firebase';

export async function login(email: string, password: string) {
  let result: UserCredential | null = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
