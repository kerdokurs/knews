<script>
  import { firestore } from '@/firebase';

  import { uudised } from '@/stores/uudised';

  import UusUudis from './UusUudis.svelte';

  const urlRegex = new RegExp(
    /<a href="https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)" target="_blank">([a-zA-Z -]*)<\/a>/,
    'g'
  );
  const imgRegex = new RegExp(
    /<img src="https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)" alt="([a-zA-Z -]*)" width="\d*" height="\d*"><\/img>/,
    'g'
  );
</script>

<style>
  .uudised-grid {
    display: grid;
  }

  .uudis-card {
    max-width: 100%;
    padding: 10px;
    margin: 10px;
    border: 1px solid #d1d1d1;
    border-radius: 3px;
  }

  .uudis-title {
    font-size: 1.6em;
    font-family: Recursive, sans-serif;
    overflow-wrap: break-word;
  }

  .uudis-title a {
    color: #000;
    text-decoration: none;
  }

  .uudis-title a:hover {
    border-bottom: 1px solid #000;
  }

  .uudis-sisu {
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
    max-height: 100px;
  }

  .uudis-metadata {
    font-size: 0.75em;
    margin-bottom: 0 !important;
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

<svelte:head>
  <title>Uudised - kNews</title>
</svelte:head>

<section class="uudised">
  <div class="uudised-grid">
    {#each $uudised as uudis}
      <div class="uudis-card">
        <span class="uudis-title">
          <a href={`/uudis/${uudis.id}`}>{uudis.pealkiri}</a>
        </span>
        <br />
        <span class="uudis-sisu">
          {uudis.sisu
            .replace(/\<br\>/gi, ' ')
            .replace(urlRegex, '$3')
            .replace(imgRegex, '$3')
            .substring(0, 200) + '...'}
        </span>
        <div class="uudis-metadata">
          <span>Kommentaare: {uudis.kommentaare}</span>
          <br />
          <span>Autor: {uudis.autor.displayName}</span>
        </div>
      </div>
    {/each}
  </div>
</section>
