<script>
  import { firestore, serverTimestamp } from '../firebase';

  let uudis = {
    pealkiri: '',
    sisu: ''
  };

  async function onSubmit() {
    uudis.id = uudis.pealkiri
      .toLowerCase()
      .split(' ')
      .join('-');
    uudis.loodud = serverTimestamp();

    await firestore
      .collection('uudised')
      .doc(uudis.id)
      .set(uudis);
    uudis = {};
  }
</script>

<section class="uus-uudis">
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
</section>
