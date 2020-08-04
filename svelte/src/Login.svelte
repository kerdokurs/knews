<script>
  import { login, logout } from '@/firebase';
  import { user } from '@/stores/user';

  // TODO: Hiire peal hoidmisel näita menüüd vms.
</script>

<style>
  span {
    cursor: pointer;
  }
</style>

{#if $user}
  <span on:click={logout}>{$user.displayName}</span>
{:else}
  <span on:click={login}>Logi sisse</span>
{/if}
