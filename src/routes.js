import Home from '@/Home.svelte';

import Uudis from '@/uudised/Uudis.svelte';
import UusUudis from '@/uudised/UusUudis.svelte';
import Redigeeri from '@/uudised/Redigeeri.svelte';

import Rubriigid from '@/rubriigid/Rubriigid.svelte';
import Rubriik from '@/rubriigid/Rubriik.svelte';
import UusRubriik from '@/rubriigid/UusRubriik.svelte';

import E404 from '@/E404.svelte';

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
    name: 'redigeeri/:id',
    component: Redigeeri,
  },
  {
    name: 'rubriigid',
    component: Rubriigid,
  },
  {
    name: 'rubriik/:id',
    component: Rubriik,
  },
  {
    name: 'uus',
    nestedRoutes: [
      {
        name: 'uudis',
        component: UusUudis,
      },
      {
        name: 'rubriik',
        component: UusRubriik,
      },
    ],
  },
  {
    name: '404',
    component: E404,
  },
];

export { routes };
