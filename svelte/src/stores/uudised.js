import { writable } from 'svelte/store';

export const uudised = writable([]); //TODO: Ära lae kõiki uudiseid uuesti uue uudise lisamisel ja eemaldamisel!
