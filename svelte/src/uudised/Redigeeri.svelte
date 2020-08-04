<script>
  import { firestore, serverTimestamp } from '@/firebase';
  import { uudised } from '@/stores/uudised';
  import { navigateTo } from 'svelte-router-spa';

  export let currentRoute;

  const id = currentRoute.namedParams.id;
  $: uudis = $uudised.filter((uudis) => uudis.id === id)[0];

  async function onSubmit() {
    if (!uudis) return;

    await firestore
      .collection('uudised')
      .doc(id)
      .update({ ...uudis, muudetud: serverTimestamp() });
    uudised.update({ ...uudis, muudetud: serverTimestamp() });
    navigateTo(`/uudis/${id}`);
  }

  function cancel() {
    if (!uudis) return;

    navigateTo(`/uudis/${id}`);
  }
</script>

<section class="redigeeri-uudis">
  {#if uudis}
    <form on:submit|preventDefault={onSubmit}>
      <div class="row">
        <div class="six columns">
          <label for="pealkiri">Pealkiri</label>
          <input
            type="text"
            id="pealkiri"
            class="u-full-width"
            placeholder="Pealkiri"
            required
            bind:value={uudis.pealkiri} />
        </div>
      </div>
      <div class="row">
        <div class="twelve columns">
          <label for="sisu">Sisu</label>
          <textarea
            id="sisu"
            class="u-full-width"
            cols="30"
            rows="10"
            placeholder="Sisu"
            required
            bind:value={uudis.sisu} />
        </div>
      </div>
      <button type="submit">Salvesta</button>
      <button on:click={cancel}>Tühista</button>
    </form>
  {/if}
</section>
