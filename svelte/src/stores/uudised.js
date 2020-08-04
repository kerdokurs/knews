import { writable } from 'svelte/store';
import { firestore } from '@/firebase';

const ref = firestore.collection('uudised').orderBy('loodud', 'desc');

const uudised = createStore();

// TODO: Laadi täisandmed ainult vajadusel (uudise avamisel)?

(() => {
  const unsubscribe = uudised.subscribe((data) =>
    data.length == 0 ? fetch() : null
  );
  unsubscribe();
})();

function fetch() {
  ref.get().then((snap) => {
    uudised.set(snap.docs.map((doc) => doc.data()));
  });
}

function createStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    add: (uudis) => update((data) => [...data, uudis]),
    del: (id) => update((data) => data.filter((uudis) => uudis.id !== id)),
    set: (data) => set(data),
  };
}

export { uudised };
