'use client';
<<<<<<< HEAD

import { useFirebase } from '@/firebase/provider';
import { Auth, User } from 'firebase/auth';

export interface UserHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
  auth: Auth | null;
}

export const useUser = (): UserHookResult => {
  const { user, isUserLoading, userError, auth } = useFirebase();
  return { user, isUserLoading, userError, auth };
};
=======
import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { useAuth as useFirebaseAuth } from '@/firebase/provider';

export function useUser() {
  const auth = useFirebaseAuth();
  const [user, setUser] = useState<User | null>(auth?.currentUser ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  return { user, loading };
}
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
