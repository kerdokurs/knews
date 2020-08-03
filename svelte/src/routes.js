import Home from './Home.svelte';

import Uudis from './uudised/Uudis.svelte';
import E404 from './E404.svelte';

const routes = [
  {
    name: '/',
    component: Home,
  },
  {
    name: 'uudis/:id',
    component: Uudis,
  },
  {
    name: '404',
    component: E404,
  },
];

export { routes };