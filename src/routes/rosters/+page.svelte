<script lang="ts">
    import {
      type team,
      teams,
      addTeam
    } from './rosters.svelte';
  
    let showAddModal = false;
    const openAddModal = () => (showAddModal = true);
    const closeAddModal = () => (showAddModal = false);

    // Handler for form submission to add a team
    function handleAddTeam(event: Event) {
      event.preventDefault();

      let formdata = new FormData(event.target as HTMLFormElement);
      // Create a new team object; note that players is empty initially.
      const newTeam: team = {
        name: formdata.get('team-name') as string,
        hometown: formdata.get('hometown') as string,
        coach: formdata.get('coach-name') as string,
        players: []
      };
  
      // Add the new team to the teams state
      addTeam(newTeam);
  
      // Close the modal
      closeAddModal();
    }
  </script>
  
  <title>Rosters</title>
  
  <div>
    <section class="rosters-dash">
      <h1>Rosters</h1>
      <h3>A List of All Teams on the Website</h3>
    </section>
  
    <section class="list-section-1">
      <div class="buttons">
        <button on:click={openAddModal} type="button">Add Teams</button>
      </div>
      <div>
        <h1>All Teams</h1>
      </div>
      <div>
        {#each teams as team}
          <!-- Using team.name in the href and display -->
          <a href="/rosters/{team.name}">
            <div class="game">
              <h3>{team.name}</h3>
              <p>{team.hometown}</p>
              <p>Coach: {team.coach}</p>
            </div>
          </a>
        {/each}
      </div>
    </section>
  </div>
  
  {#if showAddModal}
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2>Add Team</h2>
        <!-- Bind input values and handle form submission -->
        <form on:submit|preventDefault={handleAddTeam}>
          <div class="form-group">
            <label for="team-name">Team Name:</label>
            <input type="text" name="team-name"  required>
          </div>
          <div class="form-group">
            <label for="hometown">Hometown:</label>
            <input type="text" name="hometown"  required>
          </div>
          <div class="form-group">
            <label for="coach-name">Coach:</label>
            <input type="text" name="coach-name"  required>
          </div>
          <div class="modal-actions">
            <button type="button" on:click={closeAddModal} class="cancel-button">Cancel</button>
            <button type="submit" class="sign-in-button">Add</button>
          </div>
        </form>
      </div>
    </div>
  {/if}
  