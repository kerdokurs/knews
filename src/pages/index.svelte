<script>
  import uudised from '@/stores/uudised';
  import Uudis from '@/components/Uudis.svelte';
</script>

<style>
  .uudised-grid {
    display: grid;
  }

  @media (min-width: 400px) {
    .uudised-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media (min-width: 750px) {
    .uudised-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section class="uudised">
  <div class="uudised-grid">
    {#each $uudised as uudis}
      <Uudis {...uudis} />
    {/each}
  </div>
</section>
