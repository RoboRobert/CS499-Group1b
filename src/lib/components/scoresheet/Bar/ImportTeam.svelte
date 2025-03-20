<script lang="ts">
  import { teamName, players, type Player, emptyPlayers } from "../data.svelte";

  const homePlayers = [
    {
      position: "LMAO",
      name: "Noob McGee",
      number: 69,
    },
    {
      position: "XD",
      name: "Dude Guy",
      number: 40,
    },
    {
      position: "XD",
      name: "Dude Guy",
      number: 40,
    },
    {
      position: "XD",
      name: "Dude Guy",
      number: 40,
    },
  ];
  const homeTeam = {
    teamName: "Wishful Thinkers",
    players: homePlayers,
  };

  const awayPlayers = [
    {
      position: "GG",
      name: "Mr. Prime",
      number: 11,
    },
    {
      position: "ROFL",
      name: "Jake Paul",
      number: 13,
    },
  ];

  const awayTeam = {
    teamName: "Insane Ibises",
    players: awayPlayers,
  };

  const teams = [homeTeam, awayTeam];

  // Replaces the selected side's team with the information gotten from the API.
  async function importTeam(side: number) {
    // try {
    //   const response = await fetch("https://api.example.com/data2");
    //   if (response.ok) {
    //     data2 = await response.json();
    //     console.log("Data 2:", data2);
    //   } else {
    //     console.error("Error fetching data2:", response.status);
    //   }
    // } catch (error) {
    //   console.error("Error fetching data2:", error);
    // }

    const team = teams[option];

    teamName[side] = team.teamName;

    // Clear the current players on the team.
    players[side] = emptyPlayers[side];

    // Replace each slot with the team member from the new team.
    for (let i = 0; i < teams[option].players.length; i++) {
      players[side][i].name = teams[option].players[i].name;
      players[side][i].position = teams[option].players[i].position;
      players[side][i].number = teams[option].players[i].number;
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

  const teamNames = [homeTeam.teamName, awayTeam.teamName];
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
            {#each teamNames as name, i}
              {#if name != teamName[1]}
                <option value={i}>{name}</option>
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
            {#each teamNames as name, i}
              {#if name != teamName[0]}
                <option value={i}>{name}</option>
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
