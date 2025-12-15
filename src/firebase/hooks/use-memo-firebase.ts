'use client';

import { useMemo } from 'react';
import type { Query, DocumentReference } from 'firebase/firestore';

type FirebaseRef = Query | DocumentReference | null;

export function useMemoFirebase<T extends FirebaseRef>(
  factory: () => T,
  deps: React.DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
