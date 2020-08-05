<script>
  import { user } from '@/stores/user';
  import { rubriigid } from './stores/rubriigid';
  import { login, logout } from './firebase';
  import mobile from 'is-mobile';

  const isMobile = mobile();
</script>

<style>
  .content {
    list-style-type: none;
    margin: 0 auto;
    text-align: center;
    font-family: Recursive, sans-serif;
  }

  li {
    display: inline-block;
    padding: 0;
    margin: 0;
    height: 100%;
    min-width: 80px;
    padding: 10px;
  }

  a {
    color: #111;
    text-decoration: none;
    border-bottom: 1px solid #fff;
  }

  a:hover {
    border-bottom: 1px solid #555;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .dropdown {
    overflow: hidden;
    cursor: pointer;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    margin-top: 10px;
    min-width: 80px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    background-color: #fff;
  }

  .dropdown-content a,
  .dropdown-content span {
    float: none;
    color: #111;
    width: auto;
    min-width: 80px;
    text-decoration: none;
    display: block;
    text-align: center;
    padding: 2px 5px 2px 5px;
    border: none;
  }

  .dropdown-content a:hover,
  .dropdown-content span:hover {
    color: #000;
    border: none;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  @media (min-width: 400px) {
    .content {
      width: 99%;
    }
  }

  @media (min-width: 1000px) {
    .content {
      width: 60%;
    }
  }

  .login {
    cursor: pointer;
  }
</style>

<nav class="nav">
  <ul class="content">
    <li>
      <a href="/">kNews</a>
    </li>
    {#if isMobile}
      {#if $rubriigid.length > 0}
        <li class="left dropdown">
          <span class="dropdown-btn">Rubriigid</span>
          <div class="dropdown-content">
            {#each $rubriigid as rubriik}
              <a href={`/rubriik/${rubriik.id}`}>{rubriik.pealkiri}</a>
            {/each}
          </div>
        </li>
      {/if}
    {:else}
      {#each $rubriigid as rubriik}
        <li>
          <a href={`/rubriik/${rubriik.id}`}>{rubriik.pealkiri}</a>
        </li>
      {/each}
    {/if}
    {#if $user}
      <li class="right dropdown">
        <span class="dropdown-btn">{$user.displayName}</span>
        <div class="dropdown-content">
          {#if $user.editor}
            <a href="/uus/rubriik">Uus rubriik</a>
            <a href="/uus/uudis">Uus uudis</a>
          {/if}
          <span on:click={logout}>Logi välja</span>
        </div>
      </li>
    {:else}
      <li class="right login" on:click={login}>Logi sisse</li>
    {/if}
  </ul>
</nav>
