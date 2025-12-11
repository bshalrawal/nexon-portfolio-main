'use client';

import { useEffect, useState, useRef } from 'react';
import type {
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useDoc(
  ref: DocumentReference | null
) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const refRef = useRef(ref);

  useEffect(() => {
    if (refRef.current === ref && !loading && data) {
      return;
    }
    refRef.current = ref;

    if (!ref) {
      setData(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      ref,
      (doc) => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      async (serverError: any) => {
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setData(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref, data, loading]);

  return { data, loading };
}
