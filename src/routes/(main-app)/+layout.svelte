<script lang="ts">
  import "$lib/styles/app.css";
  import type { SubmitFunction } from "./$types";
//import { enhance } from '$app/forms';
  import ThemeSwitch from "$lib/components/general/ThemeSwitch.svelte";
  import type { ActionData } from "./$types.js";

  export let form: ActionData;
  export let closed = false;

  // const themeParam = searchParams;
  let darkMode = false; // Default to light mode

  // State to control modal visibility
  let showSignInModal = false;
  let showRegModal = false;

  // State to hold results of sign-in and registration
  let signMessage = ""; // Message to display for signin modal
  let regMessage = ""; // Message to display for register modal

  // Function to open the Sign in modal
  const openSignInModal = () => (showSignInModal = true);
  // Function to close the Sign in modal
  const closeSignInModal = () => ((showSignInModal = false), (signMessage = ""));

  // Function to open the Register modal
  const openRegModal = () => (showRegModal = true);
  // Function to close the Register modal
  const closeRegModal = () => ((showRegModal = false), (regMessage = ""));

  let showThemeOptions = false;
  // Function to open the Register modal
  const openThemeOptions = () => (showThemeOptions = !showThemeOptions);

  const submitUpdateTheme: SubmitFunction = ({ action }) => {
    const theme = action.searchParams.get("theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      darkMode = theme === "dark";
    }
  };
</script>

<nav>
  <div class="navLeft">
    <img class="smegol" src="/LOGO_CIRCLE.png" alt="Project Logo" />

    <a href="/">Home</a>
    <a href="/rosters ">Rosters</a>
    <a href="/pastgames ">Past Games</a>
    <a data-sveltekit-reload href="/run/">Run Mode</a>
  </div>
  <div>
    <!-- <ul> -->

    <!-- </ul> -->
  </div>
  <div class="navRight">
    <ThemeSwitch></ThemeSwitch>

    <section class="buttons">
      <button onclick={openRegModal} type="button">Register</button>
      <button onclick={openSignInModal} type="button">Sign In</button>
    </section>
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
      <form method="POST" action="?/login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div class="modal-actions">
          <button type="button" onclick={closeSignInModal} class="cancel-button">Cancel</button>
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
      <a href="#close" aria-label="Close" class="close" onclick={() => (closed = true)}>x</a>
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
      <a href="#close" aria-label="Close" class="close" onclick={() => (closed = true)}>x</a>
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
            <option value="score-keeper">Scorekeeper</option>
            <option value="coach">Coach</option>
            <option value="admin">Webmaster</option>
          </select>
        </div>
        <div class="modal-actions">
          <button type="button" onclick={closeRegModal} class="cancel-button">Cancel</button>
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
      <a href="#close" aria-label="Close" class="close" onclick={() => (closed = true)}>x</a>
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
      <a href="#close" aria-label="Close" class="close" onclick={() => (closed = true)}>x</a>
      Error
    </header>
    <p>
      Account with username "{form?.username}" already exists.
    </p>
  </article>
</dialog>

<slot></slot>

<style>
  nav {
    height: 50px;
  }

  .smegol {
    height: 100%;
  }

  .navLeft {
    display: flex;
    margin-right: 20px;
  }
  /* .signIn {
    margin-left:auto;
  } */

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
