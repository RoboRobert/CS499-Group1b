<script lang="ts">
  import type { Team, Player } from "$lib/database/Team";
  import { teamName, players, emptyPlayers, coachName } from "../data.svelte";
  import { onMount } from 'svelte';

  let teams: Team[] = [];
  // This function will run when the component is mounted
  onMount(async () => {
    const response = await fetch("/api/teams")
    teams = await response.json()
  });

  // Replaces the selected side's team with the information gotten from the API.
  async function importTeam(side: number) {
    const team = teams[option];

    console.log(team);

    teamName[side] = team.team_name;
    coachName[side] = team.coach;

    // Clear the current players on the team.
    players[side] = emptyPlayers[side];

    const response = await fetch(`/api/teamPlayers/${team.team_name}`);
    let teamPlayers: Player[] = await response.json()

    teamPlayers.sort((a, b) => (a.position < b.position ? -1 : 1))

    // Replace each slot with the team member from the new team.
    for (let i = 0; i < players[side].length && i < teamPlayers.length; i++) {
      players[side][i].name = teamPlayers[i].player_name;
      players[side][i].position = teamPlayers[i].position;
      players[side][i].number = teamPlayers[i].player_number;
    }

    // Toggle the corresponding modal.
    if (side == 0) {
      toggleImportHome();
    } else {
      toggleImportAway();
    }
  }

  let option = 0;

  let showImportHome = false;
  function toggleImportHome() {
    showImportHome = !showImportHome;
  }

  let showImportAway = false;
  function toggleImportAway() {
    showImportAway = !showImportAway;
  }
</script>

<div style="display:flex; flex-direction:column;">
  <button onclick={toggleImportHome}>IMPORT HOME TEAM</button>
  <button onclick={toggleImportAway}>IMPORT AWAY TEAM</button>

  {#if showImportHome}
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2>IMPORT HOME TEAM</h2>
        <div class="form-group">
          <select id="dropdown" bind:value={option}>
            {#each teams as team, i}
              {#if team.team_name != teamName[1]}
                <option value={i}>{team.team_name}</option>
              {/if}
            {/each}
          </select>
        </div>
        <div class="modal-actions">
          <button onclick={() => importTeam(0)} class="sign-in-button">Complete Import</button>
        </div>
        <div class="modal-actions">
          <button onclick={toggleImportHome} class="sign-in-button">Cancel</button>
        </div>
      </div>
    </div>
  {/if}

  {#if showImportAway}
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2>IMPORT AWAY TEAM</h2>
        <div class="form-group">
          <select id="dropdown" bind:value={option}>
            {#each teams as team, i}
              {#if team.team_name != teamName[0]}
                <option value={i}>{team.team_name}</option>
              {/if}
            {/each}
          </select>
        </div>
        <div class="modal-actions">
          <button onclick={() => importTeam(1)} class="sign-in-button">Complete Import</button>
        </div>
        <div class="modal-actions">
          <button onclick={toggleImportAway} class="sign-in-button">Cancel</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  button {
    margin: 10px;
    font-size: 16px;
  }
</style>
