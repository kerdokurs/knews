<script>
  import { firestore } from '../../firebase';

  import { uid } from '@/stores/user';

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
  }

  //TODO: Reaktiivsed kommentaarid?
</script>

<section class="kommentaarid">
  {#if $kommentaarid.length > 0}
    {#each $kommentaarid as kommentaar}
      <div class="kommentaar" id={kommentaar.id}>
        <h4>{kommentaar.pealkiri}</h4>
        <p>{kommentaar.sonum}</p>
        <p>Autor: {kommentaar.autor.displayName}</p>
        <p>
          Lisatud: {kommentaar.loodud ? moment(kommentaar.loodud.toDate()).fromNow() : 'mõni sekund tagasi'}
        </p>
        {#if kommentaar.autor.uid === $uid}
          <button on:click={kustuta(kommentaar.id)}>Kustuta</button>
        {/if}
      </div>
    {/each}
  {:else}
    <p>Kommentaarid puuduvad</p>
  {/if}
  <UusKommentaar {id} />
</section>
