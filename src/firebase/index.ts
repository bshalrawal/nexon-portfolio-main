import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

import firebaseConfig from './config';
import { FirebaseProvider, useFirebase, useAuth as useFirebaseAuth, useFirestore as useFirebaseFirestore, useFirebaseApp } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useUser } from './auth/use-user';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { useMemoFirebase } from './hooks/use-memo-firebase';

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

function initializeFirebase() {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    firestore = getFirestore(app);
  } else {
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
  }
  return { app, auth, firestore };
}

// This is the main hook for authentication.
// It combines the auth instance with the user state.
function useAuth() {
  const authInstance = useFirebaseAuth();
  const { user, loading } = useUser();
  return { auth: authInstance, user, loading };
}


function useFirestore() {
    return useFirebaseFirestore();
}

export {
  initializeFirebase,
  FirebaseProvider,
  FirebaseClientProvider,
  useFirebase,
  useFirebaseApp,
  useAuth,
  useFirestore,
  useUser,
  useCollection,
  useDoc,
  useMemoFirebase,
};
