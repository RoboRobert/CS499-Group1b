<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import type { Team } from "$lib/database/Team";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const defaultTeam: Team = {
    team_id: "",
    team_name: "",
    hometown: "",
    state: "",
    coach: "",
  };

  let formErrors = $state({
    name: "",
    hometown: "",
    state: "",
    coach: "",
  });

  let editingTeam: Team = $state(defaultTeam);
  let showEditModal = $state(false);

  const openEditModal = (team: Team) => {
    editingTeam = team;
    showEditModal = true;
  };
  const closeEditModal = () => {
    showEditModal = false;
    editingTeam = defaultTeam;
  };

  // Combined handler for form submission to add or edit a team
  async function handleTeamForm(event: Event) {
    event.preventDefault();

    let formdata = new FormData(event.target as HTMLFormElement);
    const name = formdata.get("team-name") as string;
    const hometown = formdata.get("hometown") as string;
    const state = formdata.get("state") as string;
    const coach = formdata.get("coach-name") as string;

    // Reset form errors
    formErrors = { name: "", hometown: "", state: "", coach: "" };

    // Validate form data
    if (!name) formErrors.name = "Team name is required";
    if (!hometown) formErrors.hometown = "Hometown is required";
    if (!state) formErrors.state = "State is required";
    if (!coach) formErrors.coach = "Coach name is required";

    // Check for duplicate team name
    if (data.teams.some((team) => team.team_name === name && team !== $state.snapshot(editingTeam))) {
      formErrors.name = "A team with this name already exists";
    }

    // If there are errors, do not proceed
    if (formErrors.name || formErrors.hometown || formErrors.state || formErrors.coach) {
      return;
    }

    let newTeam: Team;

    if (editingTeam.team_id != "") {
      // Update the team object
      editingTeam.team_name = name;
      editingTeam.hometown = hometown;
      editingTeam.state = state;
      editingTeam.coach = coach;

      newTeam = editingTeam;
    } else {
      // Create a new team object; note that players is empty initially.
      newTeam = {
        team_id: `${name}-${hometown}-${state}-${coach}`,
        team_name: name,
        hometown: hometown,
        state: state,
        coach: coach,
      };
    }

    // Send the team data to the backend API
    try {
      console.log(newTeam);
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
      });

      if (!response.ok) {
        throw new Error("Failed to save team data");
      }

      setTimeout(async () => invalidateAll(), 100);
    } catch (error) {
      console.error("Error:", error);
    }

    // Close the modal
    closeEditModal();
  }

  function handleDeleteTeam(team: Team) {
    // Send a DELETE request to the backend API
    fetch(`/api/teams`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team.team_id),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete team");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(async () => invalidateAll(), 100);
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
      <button onclick={() => openEditModal(defaultTeam)} type="button">Add Teams</button>
    </div>
    <div>
      <h1>All Teams</h1>
    </div>
    <div>
      {#each data.teams as team}
        <!-- Using team.name in the href and display -->
        <div class="game">
          <a href="/rosters/{team.team_id}">
            <h3>{team.team_name}</h3>
            <div class="team-bar">
              <p>{team.hometown}</p>
              <p>{team.state}</p>
              <p>Coach: {team.coach}</p>
            </div>
          </a>
          <div class="buttons">
            <button onclick={() => openEditModal(team)} type="button">Edit</button>
            <button onclick={() => handleDeleteTeam(team)} type="button">Delete</button>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>

{#if showEditModal}
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2>Add Team</h2>
      <!-- Bind input values and handle form submission -->
      <form onsubmit={(event) => handleTeamForm(event)}>
        <div class="form-group">
          <label for="team-name">Team Name:</label>
          <input type="text" name="team-name" value={editingTeam.team_name} />
          {#if formErrors.name}
            <p class="error">{formErrors.name}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="hometown">Hometown:</label>
          <input type="text" name="hometown" value={editingTeam.hometown} />
          {#if formErrors.hometown}
            <p class="error">{formErrors.hometown}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="state">State:</label>
          <select name="state" value={editingTeam.state}>
            <option value="">Select a state</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
          {#if formErrors.state}
            <p class="error">{formErrors.state}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="coach-name">Coach:</label>
          <input type="text" name="coach-name" value={editingTeam.coach} />
          {#if formErrors.coach}
            <p class="error">{formErrors.coach}</p>
          {/if}
        </div>
        <div class="modal-actions">
          <button type="button" onclick={closeEditModal} class="cancel-button">Cancel</button>
          <button type="submit" class="sign-in-button">Add Changes</button>
        </div>
      </form>
    </div>
  </div>
{/if}
