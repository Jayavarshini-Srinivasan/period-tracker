const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
// Ideally, the path should be in an env var relative to the process
// But for now we use the specific file moved to this directory
const serviceAccountPath = path.join(__dirname, 'period-tracker-53036-firebase-adminsdk-fbsvc-543fac789c.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath))
  });
  console.log('Firebase Admin Initialized successfully');
} catch (error) {
  console.error('Firebase Admin Initialization Error:', error);
}

const db = admin.firestore();

module.exports = { admin, db };
