// app/providers.tsx
'use client';

import React from 'react';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    text: {
      primary: 'var(--text-primary)',
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider resetCSS theme={customTheme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
