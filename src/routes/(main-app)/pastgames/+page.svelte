<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import type { Game } from "$lib/database/Sheet";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let deleteGame: Game = {
    game_id: "",
    hometeam: "",
    awayteam: "",
    date: "",
    time: "",
    homescore: 0,
    awayscore: 0,
  };
  let showDeleteConfirm = $state(false);

  const openDeleteModal = (game: Game) => {
    deleteGame = game;
    showDeleteConfirm = true;
  };
  const closeDeleteModal = () => {
    showDeleteConfirm = false;
  };

  function handleDeleteGame() {
    fetch(`/api/games/${deleteGame.game_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete player");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(async () => invalidateAll(), 100);
    closeDeleteModal();
  }
</script>

<title>Past Games</title>
<div class="container">
<div class="roster-page">
  <section class="past-games-dash">
    <h1>Past Games</h1>
    <h3>A List of All Published Games</h3>
  </section>

  <section class="list-section-1">
    <div>
      <h1>Past Games</h1>
    </div>
    <div class="team-bars">
      {#each data.games as game}
        <div class="team-bar">
          <a href="/pastgames/{game.game_id}" class="team-link">
            <h3>{game.hometeam} vs. {game.awayteam}</h3>
            <h3>{game.homescore}-{game.awayscore}</h3>
            <h3>{game.date} {game.time}</h3>
          </a>
          <div class="team-actions">
            <button onclick={() => openDeleteModal(game)} class="delete-button">Delete</button>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>
</div>
{#if showDeleteConfirm}
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2>Are you sure you want to delete this game?</h2>
      <div class="modal-actions">
        <button type="button" onclick={closeDeleteModal} class="cancel-button">Cancel</button>
        <button type="button" onclick={() => handleDeleteGame()} class="sign-in-button">Delete</button>
      </div>
    </div>
  </div>
{/if}
