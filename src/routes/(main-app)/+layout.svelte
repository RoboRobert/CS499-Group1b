<script lang="ts">
  import "$lib/styles/app.css";
  //import { enhance } from '$app/forms';
  import type { ActionData } from './$types.js';
  //export let data;
  export let form: ActionData;
  export let closed = false;

  // State to control modal visibility
  let showSignInModal = false;
  let showRegModal = false;

  // State to hold results of sign-in and registration
  let signMessage = ''; // Message to display for signin modal
  let regMessage = ''; // Message to display for register modal

  // Function to open the Sign in modal
  const openSignInModal = () => (showSignInModal = true);
  // Function to close the Sign in modal
  const closeSignInModal = () => (showSignInModal = false, signMessage = '');

  // Function to open the Register modal
  const openRegModal = () => (showRegModal = true);
  // Function to close the Register modal
  const closeRegModal = () => (showRegModal = false, regMessage = '');

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
      {#if signMessage}
        <div class="message {signMessage.includes('success') ? 'success' : 'error'}">
          {signMessage}
        </div>
      {/if}
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

<!-- Dialog for success message after signing in -->
<dialog open={form?.logsuccess == true && !closed}>
  <article>
    <header>
      <a href="#close" aria-label="Close" class="close" on:click={() => closed = true}>x</a>
            Success
    </header>
    <p>
      Welcome to Smegol, "{form?.username}"!
    </p>
  </article>
</dialog>

<!-- Dialog for error message after signin failure -->
<dialog open={form?.logsuccess == false && !closed}>
  <article>
    <header>
      <a href="#close" aria-label="Close" class="close" on:click={() => closed = true}>x</a>
            Error
    </header>
    <p>
      Please enter a valid username. User "{form?.username}" does not exist.
    </p>
  </article>
</dialog>

{#if showRegModal}
  <div class="modal-backdrop">
    <!-- Modal Content -->
    <div class="modal-content">
      <h2>Register</h2>
      <form method="POST" action="?/register">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" name="role" required>
            <option value="scorekeeper">Scorekeeper</option>
            <option value="coach">Coach</option>
            <option value="webmaster">Webmaster</option>
          </select>
        </div>
        <div class="modal-actions">
          <button type="button" on:click={closeRegModal} class="cancel-button">Cancel</button>
          <button type="submit" class="sign-in-button">Register</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Dialog for success message after registering -->
<dialog open={form?.regsuccess == true && !closed}>
  <article>
    <header>
      <a href="#close" aria-label="Close" class="close" on:click={() => closed = true}>x</a>
            Success
    </header>
    <p>
      Congratulations on joining Smegol, "{form?.username}"!
    </p>
  </article>
</dialog>

<!-- Dialog for error message after registration failure -->
<dialog open={form?.regsuccess == false && !closed}>
  <article>
    <header>
      <a href="#close" aria-label="Close" class="close" on:click={() => closed = true}>x</a>
            Error
    </header>
    <p>
      Account with username "{form?.username}" already exists.
    </p>
  </article>
</dialog>

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

  .signIn {
    margin-left:auto;
  }

  .close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  background: none;
}

.close:hover {
  cursor: pointer;
  color: red;
}
</style>
