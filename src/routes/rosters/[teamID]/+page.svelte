
<script lang="ts">
    import { players, addPlayer, type player } from '../rosters.svelte';
    export let data: { teamId: string };
    let teamId = data.teamId;
  
  
    // These values could be derived from your teams state if desired
    let location: string = "Hometown";
    let record: string = "0-0";
  
    // Modal state for adding a new player
    let showAddPlayerModal = false;
  
    // Local state for new player data
    let newPlayerName = "";
    let newPlayerHometown = "";
    let newPlayerNumber: number = 0;
    let newPlayerPosition = "";
    let newPlayerClass = "";
    let newPlayerHeight = "";
    let newPlayerWeight = "";
  
    function openAddPlayerModal() {
      showAddPlayerModal = true;
    }
  
    function closeAddPlayerModal() {
      showAddPlayerModal = false;
    }
  
    function handleAddPlayer(event: Event) {
        event.preventDefault();
        // Create a new player object using the current team id
        const newPlayer: player = {
        name: newPlayerName,
        team: teamId,
        hometown: newPlayerHometown,
        number: newPlayerNumber,
        position: newPlayerPosition,
        class: newPlayerClass,
        height: newPlayerHeight,
        weight: newPlayerWeight
        };
  
      // Add the new player to the shared players state
        addPlayer(newPlayer);
  
        // Reset form fields
        newPlayerName = "";
        newPlayerHometown = "";
        newPlayerNumber = 0;
        newPlayerPosition = "";
        newPlayerClass = "";
        newPlayerHeight = "";
        newPlayerWeight = "";
    
        closeAddPlayerModal();
    }
  </script>
  
  <title>Team {teamId}</title>
  <div>
    <a href="./">Back</a>
    <section class="home-dash">
      <h1>Team {teamId} Details</h1>
      <h3>{location}</h3>
      <h3>{record}</h3>
    </section>
    <section class="list-section-1">
      <h2>Players</h2>
      <div>
        {#each players as player}
            {#if player.team === teamId}
            <a href="/rosters/teamID/{player.name}">
                <div class="game">
                <h3>{player.name}</h3>
                <p>{player.position}</p>
                </div>
            </a>
            {/if}
        {/each}
      </div>
      <button on:click={openAddPlayerModal} type="button">Add Player</button>
    </section>
  </div>
  
  {#if showAddPlayerModal}
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2>Add Player</h2>
        <form on:submit|preventDefault={handleAddPlayer}>
          <div class="form-group">
            <label for="player-name">Player Name:</label>
            <input type="text" id="player-name" bind:value={newPlayerName} required>
          </div>
          <div class="form-group">
            <label for="player-hometown">Hometown:</label>
            <input type="text" id="player-hometown" bind:value={newPlayerHometown} required>
          </div>
          <div class="form-group">
            <label for="player-number">Number:</label>
            <input type="number" id="player-number" bind:value={newPlayerNumber} required>
          </div>
          <div class="form-group">
            <label for="player-position">Position:</label>
            <input type="text" id="player-position" bind:value={newPlayerPosition} required>
          </div>
          <div class="form-group">
            <label for="player-class">Class:</label>
            <input type="text" id="player-class" bind:value={newPlayerClass} required>
          </div>
          <div class="form-group">
            <label for="player-height">Height:</label>
            <input type="text" id="player-height" bind:value={newPlayerHeight} required>
          </div>
          <div class="form-group">
            <label for="player-weight">Weight:</label>
            <input type="text" id="player-weight" bind:value={newPlayerWeight} required>
          </div>
          <div class="modal-actions">
            <button type="button" on:click={closeAddPlayerModal} class="cancel-button">Cancel</button>
            <button type="submit" class="sign-in-button">Add Player</button>
          </div>
        </form>
      </div>
    </div>
  {/if}
  