<script lang="ts">
  import "$lib/styles/app.css";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import "$lib/styles/app.css";
  import type { SubmitFunction } from "@sveltejs/kit";
  import type { LayoutProps } from "./$types";
  import { invalidate, invalidateAll } from "$app/navigation";
  //import { enhance } from '$app/forms';

  let { data }: LayoutProps = $props();
  console.log("isLoggedIn: ", data.isLoggedIn);

  // const themeParam = searchParams;
  let darkMode = false; // Default to light mode

  // State to control modal visibility
  let showSignInModal = $state(false);
  let showRegModal = $state(false);

  // State to hold results of sign-in and registration
  let signMessage = $state(""); // Message to display for signin modal
  let regMessage = $state(""); // Message to display for register modal

  // Function to open the Sign in modal
  const openSignInModal = () => (showSignInModal = true);
  // Function to close the Sign in modal
  const closeSignInModal = () => ((showSignInModal = false), (signMessage = ""));

  // Function to open the Register modal
  const openRegModal = () => (showRegModal = true);
  // Function to close the Register modal
  const closeRegModal = () => ((showRegModal = false), (regMessage = ""));

  let showThemeOptions = $state(false);
  // Function to open the Register modal
  const openThemeOptions = () => (showThemeOptions = !showThemeOptions);

  async function handleSignOut() {
    const form = "signout";
    const response = await fetch(`/api/logon?form=${form}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data);

    invalidateAll();
  }

  async function handleSignInForm(event: Event) {
    //event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const form = "signin";

    const response = await fetch(`/api/logon?username=${username}&password=${password}&form=${form}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data);

    if (data.logsuccess) {
      closeSignInModal();
    } else {
      console.log("Sign-in failed: ", data.message);
      signMessage = data.message;
    }

    invalidateAll();
  }

  async function handleRegisterForm(event: Event) {
    //event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const form = "register";

    const response = await fetch(`/api/logon?username=${username}&password=${password}&role=${role}&form=${form}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data);

    if (data.regsuccess) {
      closeRegModal();
      handleSignInForm(event); // Automatically sign in after successful registration
    } else {
      console.log("Sign-in failed: ", data.message);
      regMessage = data.message;
    }
    invalidateAll();
  }

  const submitUpdateTheme: SubmitFunction = ({ action }) => {
    const theme = action.searchParams.get("theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      darkMode = theme === "dark";
    }

    closeSignInModal(); // Close the modal if it was open
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
    <ul>
      <li class="theme-container {showThemeOptions ? 'show' : ''}">
        <button onclick={openThemeOptions}>Set Theme</button>
        {#if showThemeOptions}
          <ul class="theme-options">
            <form method="POST" use:enhance={submitUpdateTheme}>
              <li class="buttons">
                <button formaction="/?/setTheme&theme=dark&redirectTo={$page.url.pathname}">Dark</button>
              </li>
              <li class="buttons">
                <button formaction="/?/setTheme&theme=light&redirectTo={$page.url.pathname}">Light</button>
              </li>
            </form>
          </ul>
        {/if}
      </li>
    </ul>
  </div>

  {#if data.isLoggedIn != null}
    <!-- <div class="navRight">
      
    </div> -->
    <div class="buttons">
      <p class="welcome-message">Welcome, {data.isLoggedIn} ({data.userRole})</p>
      <button onclick={handleSignOut} type="button">Sign Out</button>
    </div>
  {:else}
    <div class="buttons">
      <button onclick={openRegModal} type="button">Register</button>
      <button onclick={openSignInModal} type="button">Sign In</button>
    </div>
  {/if}
</nav>

<!-- Modal Backdrop -->
{#if showSignInModal}
  <div class="modal-backdrop">
    <!-- Modal Content -->
    <div class="modal-content">
      <h2>Sign In</h2>
      {#if signMessage && signMessage.length > 0}
        <div class="message">
          <p>{signMessage}</p>
        </div>
      {/if}
      <form onsubmit={(event) => handleSignInForm(event)}>
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
<!--<dialog open={form?.logsuccess == true && !closed}>
  <article>
    <header>
      <a href="#close" aria-label="Close" class="close" onclick={() => closed = true}>x</a>
            Success
    </header>
    <p>
      Welcome to Smegol, "{form?.username}"!
    </p>
  </article>
</dialog>-->

<!-- Dialog for error message after signin failure -->
<!--<dialog open={form?.logsuccess == false && !closed}>
  <article>
    <header>
      <a href="#close" aria-label="Close" class="close" onclick={() => closed = true}>x</a>
            Error
    </header>
    <p>
      Please enter a valid username. User "{form?.username}" does not exist.
    </p>
  </article>
</dialog>-->

<slot></slot>

{#if showRegModal}
  <div class="modal-backdrop">
    <!-- Modal Content -->
    <div class="modal-content">
      <h2>Register</h2>
      <form onsubmit={(event) => handleRegisterForm(event)}>
        {#if regMessage && regMessage.length > 0}
          <div class="message">
            <p>{regMessage}</p>
          </div>
        {/if}
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

<style>
  .smegol {
    height: 100%;
  }

  .navLeft {
    display: flex;
    margin-right: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Show the theme options when showThemeOptions is true */
  .theme-container.show .theme-options {
    display: block;
  }

  ul li:hover .theme-options {
    display: block;
  }

  .welcome-message {
    font-size: 16px; /* Adjust font size if needed */
    color: var(--clr-light-a0); /* Use a variable or set a color */
  }
</style>
