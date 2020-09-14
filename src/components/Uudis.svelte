<script>
  export let id;
  export let pealkiri;
  export let sisu;
  export let kommentaare;
  export let autor;
</script>

<style>
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
</style>

<article class="uudis-card">
  <span class="uudis-title"> <a href={`/uudis/${id}`}>{pealkiri}</a> </span>
  <br />
  <span class="uudis-sisu"> {sisu.substring(0, 200) + '...'} </span>
  <div class="uudis-metadata">
    <span>Kommentaare: {kommentaare}</span>
    <br />
    <span>Autor: {autor.displayName}</span>
  </div>
</article>
