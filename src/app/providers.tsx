// app/providers.tsx
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';

const customTheme = extendTheme({
  colors: {
    text: {
      primary: 'var(--text-primary)',
    },
  },
});

export default function Providers({ children }: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}