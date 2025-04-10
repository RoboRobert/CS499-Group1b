<script lang="ts">
  import "$lib/styles/app.css";
  import { enhance } from "$app/forms";
  import {page} from "$app/stores";
  import "$lib/styles/app.css";
  import type { SubmitFunction } from "./$types";
  
  //import { enhance } from '$app/forms';
  import type { ActionData } from './$types.js';
 
  export let form: ActionData;
  export let closed = false;




  // const themeParam = searchParams;
  let darkMode = false; // Default to light mode
 

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

  let showThemeOptions = false;
   // Function to open the Register modal
  const openThemeOptions = () => (showThemeOptions = !showThemeOptions);


  const submitUpdateTheme: SubmitFunction = ({ action }) => {
    const theme = action.searchParams.get('theme');
    if(theme){
      document.documentElement.setAttribute('data-theme', theme); 
      darkMode = theme === "dark";
     
    }
   
  }

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
    <form method="POST" use:enhance={submitUpdateTheme}>
      {#if !darkMode}
      <li class="theme-buttons">
        <button formaction="/?/setTheme&theme=dark&redirectTo={$page.url.pathname}" aria-label="Dark Mode">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/></svg>
        </button>
      </li>
      {/if}
      {#if darkMode}
      <li class="theme-buttons">
        <button formaction="/?/setTheme&theme=light&redirectTo={$page.url.pathname}" aria-label="Light Mode" >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"/></svg>
        </button>
      </li>
      {/if}
    </form>
    
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
      <a href="#close" aria-label="Close" class="close" onclick={() => closed = true}>x</a>
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
      <a href="#close" aria-label="Close" class="close" onclick={() => closed = true}>x</a>
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
      <a href="#close" aria-label="Close" class="close" onclick={() => closed = true}>x</a>
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
      <a href="#close" aria-label="Close" class="close" onclick={() => closed = true}>x</a>
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
