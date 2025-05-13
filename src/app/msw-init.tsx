// app/msw-init.tsx
'use client';

import { useEffect } from 'react';

export function MSWInit() {
  useEffect(() => {
    console.log("testeeee")
    if (process.env.NODE_ENV === 'development') {
      import('../mocks/browser').then(({ worker }) => {
        worker.start();
      });
    }
  }, []);

  return null;
}
