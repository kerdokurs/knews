<script>
  import { firestore, serverTimestamp } from '../firebase';

  import { uid, displayName } from '@/stores/user';

  export let laeUudised;

  let uudis = {
    pealkiri: '',
    sisu: '',
  };

  async function onSubmit() {
    if (!$uid || !displayName) return;

    uudis.id = uudis.pealkiri.toLowerCase().split(' ').join('-');
    uudis.loodud = serverTimestamp();
    uudis.autor = {
      uid: $uid,
      displayName: $displayName,
    };

    await firestore.collection('uudised').doc(uudis.id).set(uudis);
    uudis = {};
    laeUudised();
  }
</script>

<section class="uus-uudis">
  {#if $uid}
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
      <button type="submit">Lisa</button>
    </form>
  {:else}
    <p>Uudiste lisamiseks pead olema sisselogitud.</p>
  {/if}
</section>
