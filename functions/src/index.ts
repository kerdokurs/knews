import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const uusKommentaar = functions.firestore
  .document('uudised/{uudis}/kommentaarid/{kommentaar}')
  .onCreate((snap, context) => {
    const data: any = snap.data();

    const { uudis } = data;
    const { id } = uudis;

    return db
      .collection('uudised')
      .doc(id)
      .update({ kommentaare: admin.firestore.FieldValue.increment(1) });
  });

export const kustutatudKommentaar = functions.firestore
  .document('uudised/{uudis}/kommentaarid/{kommentaar}')
  .onDelete((snap, context) => {
    const data: any = snap.data();

    const { uudis } = data;
    const { id } = uudis;

    return db
      .collection('uudised')
      .doc(id)
      .update({ kommentaare: admin.firestore.FieldValue.increment(-1) });
  });

export const uusKasutaja = functions.auth.user().onCreate((user) => {
  const { displayName, email, uid, photoURL } = user;

  return db.collection('kasutajad').doc(uid).set({
    uid,
    email,
    displayName,
    photoURL,
    admin: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
