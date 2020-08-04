import { writable } from 'svelte/store';
import { firestore } from '@/firebase';

const ref = firestore.collection('rubriigid').orderBy('pealkiri', 'desc');

const rubriigid = createStore();

(() => {
  const unsubscribe = rubriigid.subscribe((data) =>
    data.length == 0 ? fetch() : null
  );
  unsubscribe();
})();

function fetch() {
  ref.get().then((snap) => {
    rubriigid.set(snap.docs.map((doc) => doc.data()));
  });
}

function createStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    add: (rubriik) => update((data) => [...data, rubriik]),
    del: (id) => update((data) => data.filter((rubriik) => rubriik.id !== id)),
    set: (data) => set(data),
    update: (rubriik) =>
      update((data) => [
        ...data.filter((_rubriik) => _rubriik.id !== rubriik.id),
        rubriik,
      ]),
  };
}

export { rubriigid };
