'use client';

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
