import admin from 'firebase-admin';

import serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://runescore.firebaseio.com'
});

export default admin;
