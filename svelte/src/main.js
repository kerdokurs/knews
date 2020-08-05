import App from './App.svelte';

const app = new App({
  target: document.body,
});

export default app;

// TODO
/*
  ! (!) Circular dependency
  ! src\App.svelte -> src\routes.js -> src\Home.svelte -> src\uudised\Uudised.svelte -> src\App.svelte
*/
//* Paranda navigatsiooniriba.
