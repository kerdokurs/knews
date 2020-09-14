<script>
  import { firestore, serverTimestamp, analytics } from '@/firebase';
  import { navigateTo } from 'svelte-router-spa';
  import { v4 as uuid } from 'uuid';

  import { uudised } from '@/stores/uudised';
  import { user } from '@/stores/user';
  import { rubriigid } from '@/stores/rubriigid';

  const urlRegex = new RegExp(
    /<link>\[([a-zA-Z -]*)\]\((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\)/,
    'g'
  );
  const imgRegex = new RegExp(
    /<img>\[([a-zA-Z -]*)\]\((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\)\{(\d+),?(\d+)?\}/,
    'g'
  );

  let uudis = {
    pealkiri: '',
    sisu: '',
    rubriik: $rubriigid[0],
  };

  async function onSubmit() {
    if (!$user) return;

    const doc = firestore.collection('uudised').doc();

    uudis.id = doc.id;
    uudis.sisu = uudis.sisu
      .replace(/\n/gi, '<br>')
      .replace(urlRegex, '<a href="$2" target="_blank">$1</a>')
      .replace(
        imgRegex,
        '<img src="$2" alt="$1" width="$5" height="$6"></img>'
      );
    uudis.loodud = serverTimestamp();
    uudis.autor = {
      uid: $user.uid,
      displayName: $user.displayName,
    };
    uudis.kommentaare = 0;
    uudis.rubriik = {
      id: uudis.rubriik.id,
      pealkiri: uudis.rubriik.pealkiri,
    };

    await doc.set(uudis);
    analytics.logEvent('add_new', { name: 'Uus uudis' });
    uudised.add(uudis);
    uudis = {};
    navigateTo(`uudis/${doc.id}`);
  }
</script>

<svelte:head>
  <title>Uus uudis - kNews</title>
</svelte:head>

<section class="uus-uudis">
  {#if $user && $user.editor}
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
      <div class="row">
        <div class="four columns">
          <label for="rubriik">Rubriik</label>
          <select
            id="rubriik"
            class="u-full-width"
            required
            bind:value={uudis.rubriik}>
            {#each $rubriigid as rubriik}
              <option value={rubriik}>{rubriik.pealkiri}</option>
            {/each}
          </select>
        </div>
      </div>
      <button type="submit">Lisa</button>
    </form>
  {:else}
    <p>Uudiste lisamiseks pead olema toimetaja.</p>
  {/if}
</section>
