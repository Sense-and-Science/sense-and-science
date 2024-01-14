import { cert, getApps, initializeApp } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.PRIVATE_FIREBASE_PROJECT_ID,
    clientEmail: process.env.PRIVATE_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_FIREBASE_PRIVATE_KEY,
  }),
};

export function initAdminApp() {
  if (getApps().length <= 0) {
    return initializeApp(firebaseAdminConfig);
  }
  return getApps()[0]
}
