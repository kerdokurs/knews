<script>
  import { auth, googleProvider, firestore, analytics } from '@/firebase';
  import { user } from '@/stores/user';

  auth.onAuthStateChanged(async (_user) => {
    if (_user) {
      const { uid, displayName } = _user;
      const userRecord = await firestore.collection('kasutajad').doc(uid).get();
      const { editor } = userRecord.data();
      user.set({ uid, displayName, editor });
    } else {
      user.set(null);
    }
  });

  function login() {
    analytics.logEvent('login', { name: 'Sisse logimine' });
    auth.signInWithPopup(googleProvider);
  }

  // TODO: Hiire peal hoidmisel näita menüüd vms.
</script>

<style>
  span {
    cursor: pointer;
  }
</style>

{#if $user}
  <span on:click={() => auth.signOut()}>{$user.displayName}</span>
{:else}
  <span on:click={login}>Logi sisse</span>
{/if}
