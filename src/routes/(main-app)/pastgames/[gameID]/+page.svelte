<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { convertTo12Hour } from "$lib/conversion/general";
  import type { Sheet } from "$lib/database/Sheet";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let deleteSheet: Sheet = {
    game_id: "",
    sheet_id: "",
    scorekeeper: "",
  };
  let showDeleteConfirm = $state(false);
  let userToken = data.token;
  let canEdit = userToken === "admin" || userToken === "scorekeeper" || userToken === "coach";

  const openDeleteModal = (sheet: Sheet) => {
    deleteSheet = sheet;
    showDeleteConfirm = true;
  };
  const closeDeleteModal = () => {
    showDeleteConfirm = false;
  };

  function handleDeleteSheet() {
    fetch(`/api/scoresheet/${deleteSheet.sheet_id}`, {
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

<title>Team {data.game.game_id}</title>
<div class="container">
  <div class="roster-page">
    <!-- <a href="./">Back</a> -->
    <section class="game-dash">
      <h3>{data.game.hometeam} vs. {data.game.awayteam}</h3>
      <h3>{data.game.homescore}-{data.game.awayscore}</h3>
      <h3>{data.game.date} {convertTo12Hour(data.game.time)}</h3>
    </section>
    <section class="list-section-1">
      <div></div>
      <h2>Scoresheets</h2>
      <div class="teams-bars">
        {#each data.scoresheets as scoresheet}
          <div class="team-bar">
            <a data-sveltekit-reload href="/sheets/{scoresheet.sheet_id}" class="team-link">
              <h3>Scoresheet by {scoresheet.scorekeeper}</h3>
            </a>
            {#if canEdit}
              <div class="team-actions">
                <button onclick={() => openDeleteModal(scoresheet)} class="delete-button">Delete</button>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

{#if showDeleteConfirm}
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2>Are you sure you want to delete this scoresheet?</h2>
      <div class="modal-actions">
        <button type="button" onclick={closeDeleteModal} class="cancel-button">Cancel</button>
        <button type="button" onclick={() => handleDeleteSheet()} class="sign-in-button">Delete</button>
      </div>
    </div>
  </div>
{/if}
