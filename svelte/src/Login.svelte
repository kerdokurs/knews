<script>
  import { auth, googleProvider } from '@/firebase';
  import { uid, displayName } from '@/stores/user';

  auth.onAuthStateChanged(user => {
    if (user) {
      uid.set(user.uid);
      displayName.set(user.displayName);
    } else {
      uid.set('');
      displayName.set('');
    }
  });

  function login() {
    auth.signInWithPopup(googleProvider);
  }
</script>

<section class="login">
  {#if $uid}
    <p>Oled sisselogitud kasutajana {$displayName}</p>
    <button on:click={() => auth.signOut()}>Logi välja</button>
  {:else}
    <button on:click={login}>Logi sisse</button>
  {/if}
</section>
