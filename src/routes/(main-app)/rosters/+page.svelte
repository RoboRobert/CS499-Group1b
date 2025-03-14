<script lang="ts">
  import {
      type team,
      teams,
      addTeam,
      deleteTeam,
  } from './rosters.svelte';

  const defaultTeam: team = {
          teamId: "",
          name: "",
          hometown: "",
          state: "",
          coach: "",
          players: []
      };

  let editingTeam: team;
  let showEditModal = false;

  const openEditModal = (team: team) => {
      editingTeam = team;
      showEditModal = true;
  };
  const closeEditModal = () => {
      showEditModal = false;
      editingTeam = defaultTeam;
  };

  let formErrors = {
      name: '',
      hometown: '',
      state: '',
      coach: ''
  };

  // Combined handler for form submission to add or edit a team
  function handleTeamForm(event: Event) {
      event.preventDefault();

      let formdata = new FormData(event.target as HTMLFormElement);
      const name = formdata.get('team-name') as string;
      const hometown = formdata.get('hometown') as string;
      const state = formdata.get('state') as string;
      const coach = formdata.get('coach-name') as string;

      // Reset form errors
      formErrors = { name: '', hometown: '', state: '', coach: '' };

      // Validate form data
      if (!name) formErrors.name = 'Team name is required';
      if (!hometown) formErrors.hometown = 'Hometown is required';
      if (!state) formErrors.state = 'State is required';
      if (!coach) formErrors.coach = 'Coach name is required';

      // Check for duplicate team name
      if (teams.some(team => team.name === name && (team !== editingTeam))) {
          formErrors.name = 'A team with this name already exists';
      }

      // If there are errors, do not proceed
      if (formErrors.name || formErrors.hometown || formErrors.state || formErrors.coach) {
          return;
      }

      if (editingTeam.teamId != "") {
          // Update the team object
          editingTeam.name = name;
          editingTeam.hometown = hometown;
          editingTeam.state = state;
          editingTeam.coach = coach;

          // Update the team in the teams state
          const index = teams.findIndex(team => team === editingTeam);
          if (index !== -1) {
              teams[index] = { ...editingTeam };
          }
      } else {
          // Create a new team object; note that players is empty initially.
          const newTeam: team = {
              teamId: `${name}-${hometown}-${state}-${coach}`,
              name,
              hometown,
              state,
              coach,
              players: []
          };

          // Add the new team to the teams state
          addTeam(newTeam);
          
      }
      // Close the modal
      closeEditModal();
  }

  function handleDeleteTeam(team: team) {
      deleteTeam(team);
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
      <button on:click={() => openEditModal(defaultTeam)} type="button">Add Teams</button>
    </div>
    <div>
      <h1>All Teams</h1>
    </div>
    <div>
      {#each teams as team}
        <!-- Using team.name in the href and display -->
          <div class="game">
              <a href="/rosters/{team.teamId}">
              <h3>{team.name}</h3>
              <p>{team.hometown}</p>
              <p>{team.state}</p>
              <p>Coach: {team.coach}</p>
              </a>
            <button on:click={() => openEditModal(team)} type="button">Edit</button>
            <button on:click={() => handleDeleteTeam(team)} type="button">Delete</button>
          </div>
      {/each}
    </div>
  </section>
</div>

{#if showEditModal}
<div class="modal-backdrop">
  <div class="modal-content">
    <h2>Edit Team</h2>
    <!-- Bind input values and handle form submission -->
    <form on:submit|preventDefault={(event) => handleTeamForm(event)}>
      <div class="form-group">
        <label for="team-name">Team Name:</label>
        <input type="text" name="team-name" value={editingTeam.name}>
        {#if formErrors.name}
          <p class="error">{formErrors.name}</p>
        {/if}
      </div>
      <div class="form-group">
        <label for="hometown">Hometown:</label>
        <input type="text" name="hometown" value={editingTeam.hometown}>
        {#if formErrors.hometown}
          <p class="error">{formErrors.hometown}</p>
        {/if}
      </div>
      <div class="form-group">
        <label for="state">State:</label>
        <input type="text" name="state" value={editingTeam.state}>
        {#if formErrors.state}
          <p class="error">{formErrors.state}</p>
        {/if}
      </div>
      <div class="form-group">
        <label for="coach-name">Coach:</label>
        <input type="text" name="coach-name" value={editingTeam.coach}>
        {#if formErrors.coach}
          <p class="error">{formErrors.coach}</p>
        {/if}
      </div>
      <div class="modal-actions">
        <button type="button" on:click={closeEditModal} class="cancel-button">Cancel</button>
        <button type="submit" class="sign-in-button">Add Changes</button>
      </div>
    </form>
  </div>
</div>
{/if}
