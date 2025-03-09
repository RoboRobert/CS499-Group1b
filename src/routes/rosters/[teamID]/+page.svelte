
<script lang="ts">
    import { players, addPlayer, type player } from '../rosters.svelte';
    export let data: { teamId: string };
    let teamId = data.teamId;
  
  
    // These values could be derived from your teams state if desired
    let location: string = "Hometown";
    let record: string = "0-0";
  
    // Modal state for adding a new player
    let showAddPlayerModal = false;
  
  
    function openAddPlayerModal() {
      showAddPlayerModal = true;
    }
  
    function closeAddPlayerModal() {
      showAddPlayerModal = false;
    }
  
    function handleAddPlayer(event: Event) {
        event.preventDefault();

        let formdata = new FormData(event.target as HTMLFormElement);
        // Create a new player object using the current team id
        const newPlayer: player = {
        name: formdata.get('player-name') as string,
        hometown: formdata.get('player-hometown') as string,
        number: formdata.get('player-number') as string,
        position: formdata.get('player-position') as string,
        class: formdata.get('player-class') as string,
        height: formdata.get('player-height') as string,
        weight: formdata.get('player-weight') as string,
        team: teamId
        };
  
      // Add the new player to the shared players state
        addPlayer(newPlayer);
  
    
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
            <input type="text" name="player-name"  required>
          </div>
          <div class="form-group">
            <label for="player-hometown">Hometown:</label>
            <input type="text" name="player-hometown"  required>
          </div>
          <div class="form-group">
            <label for="player-number">Number:</label>
            <input type="number" name="player-number"  required>
          </div>
          <div class="form-group">
            <label for="player-position">Position:</label>
            <input type="text" name="player-position"  required>
          </div>
          <div class="form-group">
            <label for="player-class">Class:</label>
            <input type="text" name="player-class"  required>
          </div>
          <div class="form-group">
            <label for="player-height">Height:</label>
            <input type="text" name="player-height"  required>
          </div>
          <div class="form-group">
            <label for="player-weight">Weight:</label>
            <input type="text" name="player-weight"  required>
          </div>
          <div class="modal-actions">
            <button type="button" on:click={closeAddPlayerModal} class="cancel-button">Cancel</button>
            <button type="submit" class="sign-in-button">Add Player</button>
          </div>
        </form>
      </div>
    </div>
  {/if}
  