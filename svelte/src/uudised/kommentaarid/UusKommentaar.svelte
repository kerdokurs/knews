<script>
  import { firestore, serverTimestamp } from '@/firebase';

  import { uid, displayName } from '@/stores/user';

  let kommentaar = {
    pealkiri: '',
    sonum: '',
  };

  export let id;

  async function onSubmit() {
    if (!uid || !displayName) return;

    const doc = firestore
      .collection('uudised')
      .doc(id)
      .collection('kommentaarid')
      .doc();

    kommentaar.id = doc.id;
    kommentaar.autor = {
      uid: $uid,
      displayName: $displayName,
    };
    kommentaar.loodud = serverTimestamp();
    kommentaar.uudis = { id };

    await doc.set(kommentaar);
    kommentaar = {};
  }
</script>

<section class="uus-kommentaar">
  {#if !$uid}
    <p>Kommentaaride lisamiseks pead olema sisselogitud.</p>
  {:else}
    <form on:submit|preventDefault={onSubmit}>
      <div class="row">
        <div class="six columns">
          <label for="pealkiri">Pealkiri</label>
          <input
            type="text"
            id="pealkiri"
            class="u-full-width"
            required
            bind:value={kommentaar.pealkiri} />
        </div>
      </div>
      <div class="row">
        <div class="six columns">
          <label for="sonum">Sõnum</label>
          <textarea
            id="sonum"
            cols="30"
            rows="10"
            class="u-full-width"
            required
            bind:value={kommentaar.sonum} />
        </div>
      </div>
      <button type="submit">Lisa kommentaar</button>
    </form>
  {/if}
</section>
