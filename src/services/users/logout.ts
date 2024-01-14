import { signOut } from 'firebase/auth';

import { auth } from '@/firebase';

export async function logout() {
  return signOut(auth);
}
