<script>
  import { firestore } from '@/firebase';

  import { uudised } from '@/stores/uudised';
  import { laeUudised } from '@/laeUudised';

  import { uid } from '@/stores/user';

  import UusUudis from './UusUudis.svelte';

  async function kustuta(uudisId) {
    await firestore.collection('uudised').doc(uudisId).delete();
    laeUudised();
  }
</script>

<svelte:head>
  <title>Uudised - kNews</title>
</svelte:head>

<section class="uudised">
  <div class="uudised-grid">
    {#each $uudised as uudis}
      <div class="uudis">
        <h3>
          <a href={`/uudis/${uudis.id}`}>{uudis.pealkiri}</a>
        </h3>
        <span>Kommentaare: {uudis.kommentaare}</span>
        <p>
          {uudis.sisu.length > 40 ? uudis.sisu.substring(0, 40) + '...' : uudis.sisu}
        </p>
        {#if uudis.autor.uid === $uid}
          <button on:click={kustuta(uudis.id)}>Kustuta</button>
        {/if}
      </div>
    {/each}
  </div>
</section>
<UusUudis {laeUudised} />
