import { UserCredential } from 'firebase/auth';
import { create } from 'zustand';

import { AuthStore, BlogUser } from '@/types';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  setUser: (user: UserCredential['user'], profile: BlogUser) =>
    set(() => ({ user, profile })),
  removeUser: () => {
    set(() => ({ user: null, profile: null }));
  },
}));
