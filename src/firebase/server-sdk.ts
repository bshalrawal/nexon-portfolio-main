'use server';

import admin from 'firebase-admin';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

const serviceKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceKey) {
  // We are throwing an error here because the key is required for server-side operations.
  // Not having it indicates a serious configuration issue that should halt execution.
  throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please add it to your .env file.');
}

const serviceAccount = JSON.parse(serviceKey);

function initializeAdminApp() {
  if (!getApps().length) {
    return initializeApp({
      credential: cert(serviceAccount),
    });
  }
  return admin.app();
}

const adminApp = initializeAdminApp();
const firestore = getFirestore(adminApp);

export { adminApp, firestore };
