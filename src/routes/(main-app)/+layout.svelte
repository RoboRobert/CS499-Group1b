<script lang="ts">
  import { enhance } from "$app/forms";
  import {page} from "$app/stores";
  import "$lib/styles/app.css";
  import type { SubmitFunction } from "./$types";
  

  // State to control modal visibility
  let showSignInModal = false;
  let showRegModal = false;

  // Function to open the Sign in modal
  const openSignInModal = () => (showSignInModal = true);
  // Function to close the Sign in modal
  const closeSignInModal = () => (showSignInModal = false);

  // Function to open the Register modal
  const openRegModal = () => (showRegModal = true);
  // Function to close the Register modal
  const closeRegModal = () => (showRegModal = false);

  const submitUpdateTheme: SubmitFunction = ({ action }) => {
    const theme = action.searchParams.get('theme');
    if(theme){
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
</script>

<nav>
  <div class="navLeft">
    <img class="smegol" src="/LOGO_CIRCLE.png" alt="Project Logo" />
    <a href="/">Home</a>
    <a href="/rosters ">Rosters</a>
    <a href="/pastgames ">Past Games</a>
    <a href="/run/1">Run Mode</a>
  </div> 
  <div>
    <ul>
      <li>
        <button> Set Theme</button>
        <ul>
          <form method="POST" use:enhance={submitUpdateTheme}>
            <li>
              <button formaction="/?/setTheme&theme=dark&redirectTo={$page.url.pathname}">Dark</button>
            </li>
            <li>
              <button formaction="/?/setTheme&theme=light&redirectTo={$page.url.pathname}">Light</button>
            </li>
          </form>
        </ul>
      </li>
    </ul>
  </div>
  <div class="buttons">
    <button on:click={openRegModal} type="button">Register</button>
    <button on:click={openSignInModal} type="button">Sign In</button>
  </div>

 

</nav>

<!-- Modal Backdrop -->
{#if showSignInModal}
  <div class="modal-backdrop">
    <!-- Modal Content -->
    <div class="modal-content">
      <h2>Sign In</h2>
      <form method="POST" action = "?/login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div class="modal-actions">
          <button type="button" on:click={closeSignInModal} class="cancel-button">Cancel</button>
          <button type="submit" class="sign-in-button">Sign In</button>
        </div>
      </form>
    </div>
  </div>
{/if}

{#if showRegModal}
  <div class="modal-backdrop">
    <!-- Modal Content -->
    <div class="modal-content">
      <h2>Register</h2>
      <form method="POST" action = "?/register">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div class="form-group">
          <label for="key">Key:</label>
          <input type="key" id="key" name="key" required />
        </div>
        <div class="modal-actions">
          <button type="button" on:click={closeRegModal} class="cancel-button">Cancel</button>
          <button type="submit" class="sign-in-button">Register</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<slot></slot>

<style>
  nav{ 
    height: 50px;
  }

  .smegol {
    height: 100%;
  }

  .navLeft {
    display: flex;
    margin-right: 20px
  }

 
</style>
