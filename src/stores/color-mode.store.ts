import { create } from 'zustand';

import { ColorModeStore } from '@/types';

export const useColorModeStore = create<ColorModeStore>((set) => ({
  colorMode: 'light',
  setColorMode: (colorMode: 'light' | 'dark') => set(() => ({ colorMode })),
}));
