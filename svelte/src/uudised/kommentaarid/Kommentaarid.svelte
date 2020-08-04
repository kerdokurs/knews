<script>
  import { firestore, analytics } from '@/firebase';

  import { user } from '@/stores/user';

  import { collectionData } from 'rxfire/firestore';
  import { startWith } from 'rxjs/operators';

  import moment from 'moment'; //TODO: Lisa üldine koht koos keele jms-ga.
  import 'moment/locale/et';
  moment.locale('et');

  import UusKommentaar from './UusKommentaar.svelte';

  export let id;

  const ref = firestore
    .collection('uudised')
    .doc(id)
    .collection('kommentaarid')
    .orderBy('loodud', 'desc');

  const kommentaarid = collectionData(ref).pipe(startWith([]));

  async function kustuta(kommentaarId) {
    await firestore
      .collection('uudised')
      .doc(id)
      .collection('kommentaarid')
      .doc(kommentaarId)
      .delete();

    analytics.logEvent('remove_comment', { name: 'Kommentaar kustutatud' });
  }

  //TODO: Reaktiivsed kommentaarid?
</script>

<style>
  .kommentaarid {
    margin-top: 20px;
  }

  .kommentaar {
    width: 100%;
    border: 1px solid #d1d1d1;
    border-radius: 3px;
    padding: 10px;
  }

  .kommentaar-title {
    font-size: 1.6em;
  }

  .kommentaar-sisu {
    margin-top: 5px;
  }

  .kommentaar-metadata {
    margin-top: 5px;
    font-size: 0.9em;
  }

  .kustuta {
    cursor: pointer;
    color: red;
  }
</style>

<section class="kommentaarid">
  <h5>Kommentaarid</h5>
  {#if $kommentaarid.length > 0}
    {#each $kommentaarid as kommentaar}
      <div class="kommentaar" id={kommentaar.id}>
        <span class="kommentaar-title">{kommentaar.pealkiri}</span>
        <br />
        <span class="kommentaar-sisu">{kommentaar.sonum}</span>
        <div class="kommentaar-metadata">
          <span>Autor: {kommentaar.autor.displayName}</span>
          <span>
            <br />
            Lisatud: {kommentaar.loodud ? moment(kommentaar.loodud.toDate()).fromNow() : 'mõni sekund tagasi'}
          </span>
          {#if $user && kommentaar.autor.uid === $user.uid}
            <br />
            <span class="kustuta" on:click={kustuta(kommentaar.id)}>
              Kustuta
            </span>
          {/if}
        </div>
      </div>
    {/each}
  {:else}
    <p>Kommentaarid puuduvad</p>
  {/if}
  <UusKommentaar {id} />
</section>
