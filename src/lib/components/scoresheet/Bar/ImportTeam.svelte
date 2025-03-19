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

    homeTeamName.name = homeTeam.teamName;

    for (let i = 0; i < homeTeam.players.length; i++) {
      players[0][i].name = homeTeam.players[i].name;
      players[0][i].position = homeTeam.players[i].position;
      players[0][i].number = homeTeam.players[i].number;
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

    toggleImportHome();
  }

  let showImportHome = false;
  function toggleImportHome() {
    showImportHome = !showImportHome;
  }

  let selectedOption = "";

  const teamNames = [awayTeam.teamName, homeTeam.teamName];
</script>

<div style="display:flex; flex-direction:column;">
  <button onclick={toggleImportHome}>IMPORT HOME TEAM</button>
  <button onclick={importAwayTeam}>IMPORT AWAY TEAM</button>

  {#if showImportHome}
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2>IMPORT HOME TEAM</h2>
        <div class="form-group">
          <select id="dropdown" bind:value={selectedOption}>
            {#each teamNames as teamName}
              <option value={teamName}>{teamName}</option>
            {/each}
          </select>
          <p>You selected: {selectedOption}</p>
        </div>
        <div class="modal-actions">
            <button onclick={importHomeTeam} class="sign-in-button">Complete Import</button>
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
