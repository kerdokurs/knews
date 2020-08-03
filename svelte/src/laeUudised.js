import { uudised } from './stores/uudised';
import { firestore } from './firebase';

const ref = firestore.collection('uudised').orderBy('loodud', 'desc').limit(10);

const init = () => {
  ref.get().then((snap) => {
    uudised.set(snap.docs.map((doc) => doc.data()));
  });
};

(() => {
  const unsubscribe = uudised.subscribe((data) => {
    if (data.length == 0) init();
  });
  unsubscribe();
})();

export const laeUudised = init;
