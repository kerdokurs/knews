<script>
  import { firestore, serverTimestamp, analytics } from '@/firebase';

  import { user } from '@/stores/user';

  let kommentaar = {
    pealkiri: '',
    sonum: '',
  };

  export let id;

  async function onSubmit() {
    if (!$user) return;

    analytics.logEvent('add_comment', { name: 'Uus kommentaar' });

    const doc = firestore
      .collection('uudised')
      .doc(id)
      .collection('kommentaarid')
      .doc();

    kommentaar.id = doc.id;
    kommentaar.autor = {
      uid: $user.uid,
      displayName: $user.displayName,
    };
    kommentaar.loodud = serverTimestamp();
    kommentaar.uudis = { id };

    await doc.set(kommentaar);
    kommentaar = {};
  }
</script>

<section class="uus-kommentaar">
  {#if !$user}
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
