import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const newUser = functions.auth.user().onCreate((user) => {
  const { displayName, email, uid, photoURL } = user;

  return admin.firestore().collection('kasutajad').doc(uid).set({
    uid,
    email,
    displayName,
    photoURL,
    admin: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
