<script>
  import { rubriigid } from '@/stores/rubriigid';
</script>

<style>
  ul {
    list-style-type: none;
  }
</style>

<svelte:head>
  <title>Rubriigid - kNews</title>
</svelte:head>

<section class="rubriigid">
  {#if $rubriigid.length > 0}
    <ul>
      {#each $rubriigid as rubriik}
        <li>
          <a href={`/rubriik/${rubriik.id}`}>{rubriik.pealkiri}</a>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Rubriike pole</p>
  {/if}
</section>
