<script>
  import Login from '@/Login.svelte';

  import { user } from '@/stores/user';
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

  .right {
    float: right;
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
</style>

<nav class="nav">
  <ul class="content">
    <li>
      <a href="/">kNews</a>
    </li>
    <li class="right">
      <Login />
    </li>
    {#if $user && $user.editor}
      <li class="right">
        <a href="/uus">Uus</a>
      </li>
    {/if}
  </ul>
</nav>
