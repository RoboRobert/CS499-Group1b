<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import "$lib/styles/app.css";
  import type { LayoutProps } from "./$types";
  //import { enhance } from '$app/forms';
  import ThemeSwitch from "$lib/components/general/ThemeSwitch.svelte";

  let { data, children }: LayoutProps = $props();

  // State to control modal visibility
  let showSignInModal = $state(false);
  let showRegModal = $state(false);

  // State controlling whether to show a sign out confirmation message
  let showSignOutConfirm = $state(false);

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

  function convertRole(role: string): string {
    if (role == "admin") {
      return "Webmaster";
    } else if (role == "score-keeper") {
      return "Scorekeeper";
    } else if (role == "coach") {
      return "Coach";
    } else {
      return null;
    }
  }

  async function handleSignOut() {
    showSignOutConfirm = false;
    const form = "signout";
    await fetch(`/api/logon?form=${form}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    invalidateAll();

    location.href = "/";
  }

  async function handleSignInForm(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const form = "signin";

    const response = await fetch(`/api/logon?username=${username}&password=${password}&form=${form}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.logsuccess) {
      closeSignInModal();
    } else {
      signMessage = data.message;
    }

    invalidateAll();
  }

  async function handleRegisterForm(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const form = "register";

    const response = await fetch(`/api/logon?username=${username}&password=${password}&role=${role}&form=${form}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.regsuccess) {
      closeRegModal();
      handleSignInForm(event); // Automatically sign in after successful registration
    } else {
      regMessage = data.message;
    }
    invalidateAll();
  }
</script>

<nav>
  <div class="navLeft">
    <img class="smegol" src="/LOGO_CIRCLE.png" alt="Project Logo" />

    <a href="/">Home</a>
    {#if data.role === "admin" || data.role === "coach"}
      <a href="/rosters ">Rosters</a>
    {/if}
    <a href="/pastgames ">Past Games</a>

    {#if data.role === "admin" || data.role === "coach" || data.role === "score-keeper"}
      <a data-sveltekit-reload href="/run/">Run Mode</a>
    {/if}
  </div>

  <div class="navRight">
    <section class="buttons">
      {#if data.username}
        <div class="buttons">
          <p class="welcome-message">Welcome, {data.username} ({convertRole(data.role)})</p>
          <button
            onclick={() => {
              showSignOutConfirm = true;
            }}
            type="button">Sign Out</button
          >
        </div>
      {:else}
        <div class="buttons">
          <button onclick={openRegModal} type="button">Register</button>
          <button onclick={openSignInModal} type="button">Sign In</button>
        </div>
      {/if}
    </section>
    <ThemeSwitch theme={data.theme}></ThemeSwitch>
  </div>
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

{#if showSignOutConfirm}
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2>Are you sure you want to sign out?</h2>
      <div class="modal-actions">
        <button
          type="button"
          onclick={() => {
            showSignOutConfirm = false;
          }}
          class="cancel-button">Cancel</button
        >
        <button type="button" onclick={() => handleSignOut()} class="sign-in-button">Confirm</button>
      </div>
    </div>
  </div>
{/if}

{#key data.username}
  {@render children()}
{/key}
