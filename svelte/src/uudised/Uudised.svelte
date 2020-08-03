<script>
  import { uudised } from '../stores/uudised';
  import '../laeUudised';

  import UusUudis from './UusUudis.svelte';
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
        <p>
          {uudis.sisu.length > 40 ? uudis.sisu.substring(0, 40) + '...' : uudis.sisu}
        </p>
      </div>
    {/each}
  </div>
</section>
<UusUudis />
