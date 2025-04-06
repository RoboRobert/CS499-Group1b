<script lang="ts">
  import { enhance } from "$app/forms";
  import {page} from "$app/stores";
  import "$lib/styles/app.css";
  import type { SubmitFunction } from "./$types";
  

  // State to control modal visibility
  let showSignInModal = false;
  let showRegModal = false;

  let showThemeOptions = false;

  // Function to open the Sign in modal
  const openSignInModal = () => (showSignInModal = true);
  // Function to close the Sign in modal
  const closeSignInModal = () => (showSignInModal = false);

  // Function to open the Register modal
  const openRegModal = () => (showRegModal = true);
  // Function to close the Register modal
  const closeRegModal = () => (showRegModal = false);

   // Function to open the Register modal
   const openThemeOptions = () => (showThemeOptions = !showThemeOptions);

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
      <li class="theme-container {showThemeOptions ? 'show' : ''}">
        <button on:click={openThemeOptions}>Set Theme</button>
        {#if showThemeOptions}
          <ul class="theme-options">
            <form method="POST" use:enhance={submitUpdateTheme}>
              <li class="buttons">
                <button formaction="/?/setTheme&theme=dark&redirectTo={$page.url.pathname}">Dark</button>
              </li>
              <li class="buttons">
                <button formaction="/?/setTheme&theme=light&redirectTo={$page.url.pathname}" >Light</button>
              </li>
            </form>
          </ul>
        {/if}
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

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .theme-options {
    display: none;
    position: absolute;
    background-color: var(--clr-surface-a10);
    border: 1px solid var(--clr-surface-a10);
    border-radius: 4px;
    padding: 10px;
    margin-top: 5px;
    z-index: 1000;
  }

  /* Show the theme options when showThemeOptions is true */
  .theme-container.show .theme-options {
    display: block;
  }

  ul li:hover .theme-options {
    display: block;
  }

  
.theme-container button {
  background-color: var(--clr-button);
  color: var(--clr-light-a0);
  padding: 5px 12px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  border-radius: 5px;
}

.theme-container button:hover {
  background-color: var(--clr-button-hover);
}


/* 
  button {
    cursor: pointer;
  } */
 
</style>
