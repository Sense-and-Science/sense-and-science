import { UserCredential } from 'firebase/auth';

import { BlogUser } from '../';

export type AuthStore = {
  user: UserCredential['user'] | null;
  profile: BlogUser | null;
  setUser: (user: UserCredential['user'], profile: BlogUser) => void;
  removeUser: () => void;
};
