<script lang="ts">
  import { awayTeamName, homeTeamName, players, type Player } from "../data.svelte";

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

  const teams = [homeTeam, awayTeam]

  // Function for the first API call
  async function importHomeTeam() {
    // try {
    //   const response = await fetch("https://api.example.com/data1");
    //   if (response.ok) {
    //     data1 = await response.json();
    //     console.log("Data 1:", data1);
    //   } else {
    //     console.error("Error fetching data1:", response.status);
    //   }
    // } catch (error) {
    //   console.error("Error fetching data1:", error);
    // }

    const team = teams[selectedOption];

    homeTeamName.name = team.teamName;

    for (let i = 0; i < team.players.length; i++) {
      players[0][i].name = team.players[i].name;
      players[0][i].position = team.players[i].position;
      players[0][i].number = team.players[i].number;
    }

    toggleImportHome();
  }

  // Function for the second API call
  async function importAwayTeam() {
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

    awayTeamName.name = awayTeam.teamName;

    for (let i = 0; i < awayTeam.players.length; i++) {
      players[1][i].name = awayTeam.players[i].name;
      players[1][i].position = awayTeam.players[i].position;
      players[1][i].number = awayTeam.players[i].number;
    }

    toggleImportAway();
  }

  let selectedOption = 0;

  let showImportHome = false;
  function toggleImportHome() {
    showImportHome = !showImportHome;
  }

  let showImportAway = false;
  function toggleImportAway() {
    showImportAway = !showImportAway;
  }

  const teamNames = [awayTeam.teamName, homeTeam.teamName];
</script>

<div style="display:flex; flex-direction:column;">
  <button onclick={toggleImportHome}>IMPORT HOME TEAM</button>
  <button onclick={toggleImportAway}>IMPORT AWAY TEAM</button>

  {#if showImportHome}
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2>IMPORT HOME TEAM</h2>
        <div class="form-group">
          <select id="dropdown" bind:value={selectedOption}>
            {#each teamNames as teamName, i}
              {#if teamName != awayTeamName.name}
                <option value={i}>{teamName}</option>
              {/if}
            {/each}
          </select>
          <p>You selected: {selectedOption}</p>
        </div>
        <div class="modal-actions">
          <button onclick={importHomeTeam} class="sign-in-button">Complete Import</button>
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
          <select id="dropdown" bind:value={selectedOption}>
            {#each teamNames as teamName, i}
              {#if teamName != homeTeamName.name}
                <option value={i}>{teamName}</option>
              {/if}
            {/each}
          </select>
          <p>You selected: {selectedOption}</p>
        </div>
        <div class="modal-actions">
          <button onclick={importAwayTeam} class="sign-in-button">Complete Import</button>
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
