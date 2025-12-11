'use client';

import { useEffect, useState, useRef } from 'react';
import type {
  Query,
  DocumentData,
} from 'firebase/firestore';
import { onSnapshot, CollectionReference } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useCollection(
  query: CollectionReference | Query | null,
) {
  const [data, setData] = useState<DocumentData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const queryRef = useRef(query);

  useEffect(() => {
    if (queryRef.current === query && !loading && data) {
      return;
    }
    queryRef.current = query;
    
    if (!query) {
      setData([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docs);
        setLoading(false);
      },
      async (serverError: any) => {
        let path = 'unknown path';
        if (query instanceof CollectionReference) {
          path = query.path;
        } else if ('_query' in query && (query as any)._query?.path) {
            path = (query as any)._query.path.canonical;
        }

        const permissionError = new FirestorePermissionError({
          path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setData([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query, data, loading]);

  return { data, loading };
}
