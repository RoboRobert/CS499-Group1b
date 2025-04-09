<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import type { Team } from "$lib/database/Team";
    import { error } from "@sveltejs/kit";
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


  let userRole = data.token ;
  let canEdit = userRole === "admin" || userRole === "coach"; // Check if the user is an admin or coach
  let editingTeam: Team = $state(defaultTeam);
  let showEditModal = $state(false);
  let showDeleteConfirm = $state(false);

  const openEditModal = (team: Team) => {
    editingTeam = team;
    showEditModal = true;
  };
  const closeEditModal = () => {
    showEditModal = false;
    editingTeam = defaultTeam;
    formErrors = {
      name: "",
      hometown: "",
      state: "",
      coach: "",
    };
  };

  const openDeleteModal = (team: Team) => {
    editingTeam = team;
    showDeleteConfirm = true;
  };
  const closeDeleteModal = () => {
    showDeleteConfirm = false;
    editingTeam = defaultTeam;
  };

  // Regex patterns for validation
  const regexPatterns = {
  name: /^[a-zA-Z0-9 ]{3,50}$/, // Alphanumeric, 3-50 characters
  hometown: /^[a-zA-Z ]{2,50}$/, // Letters and spaces, 2-50 characters
  state: /^[A-Z]{2}$/, // Two uppercase letters
  coach: /^[a-zA-Z ]{3,50}$/, // Letters and spaces, 3-50 characters
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
    
    // Validate form data using regex
    if (!regexPatterns.name.test(name)) {
      formErrors.name = "Team name must be 3-50 alphanumeric characters.";
    }
    if (!regexPatterns.hometown.test(hometown)) {
      formErrors.hometown = "Hometown must be 2-50 letters and spaces.";
    }
    if (!regexPatterns.state.test(state)) {
      formErrors.state = "State must be a valid two-letter code (e.g., AL).";
    }
    if (!regexPatterns.coach.test(coach)) {
      formErrors.coach = "Coach name must be 3-50 letters and spaces.";
    }

   

    // If there are errors, do not proceed
    if (
      formErrors.name ||
      formErrors.hometown ||
      formErrors.state ||
      formErrors.coach
    ) {
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

      const response = await fetch("/api/teams/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
        credentials:'include',
      });
      if (!response.ok) {
        throw new Error("Failed to check team data");
      }
      const data1 = await response.json();
      console.log("API Response",data1.formErrors);
      

      // Check if data1 is null or undefined
      if (!data1 || !data1.formErrors) {
        console.log("No errors returned from the API.");
      // Send the team data to the backend API
      try {
        console.log(newTeam);
        const response = await fetch("/api/editTeams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTeam),
          credentials:'include',
        });

        if (!response.ok) {
          throw new Error("Failed to save team data");
        }

        setTimeout(async () => invalidateAll(), 100);
      } catch (error) {
        console.error("Error:", error);
      }
      } else if (
        data1.formErrors.name != null ||
        data1.formErrors.hometown != null ||
        data1.formErrors.state != null ||
        data1.formErrors.coach != null
      ) {
        formErrors = data1.formErrors;
        console.log("Form Errors", formErrors);
        return;
      }

    } else {
      // Create a new team object; note that players is empty initially.
      newTeam = {
        team_id: `${name}-${hometown}-${state}-${coach}`,
        team_name: name,
        hometown: hometown,
        state: state,
        coach: coach,
      };
        // Check for duplicate team name
      
      const response = await fetch("/api/teams/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
        credentials:'include',
      });
      if (!response.ok) {
        throw new Error("Failed to check team data");
      }
      const data1 = await response.json();
      console.log("API Response",data1.formErrors);

      if(
        data.teams.some(
          (team) =>
            team.team_name === name && team !== $state.snapshot(newTeam),
        )
      ) {
        formErrors.name = "A team with this name already exists";
      }

      // Check if data1 is null or undefined
      if (!data1 || !data1.formErrors) {
        console.log("No errors returned from the API.");
      // Send the team data to the backend API
      try {
        console.log(newTeam);
        const response = await fetch("/api/teams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTeam),
          credentials:'include',
        });

        if (!response.ok) {
          throw new Error("Failed to save team data");
        }

        setTimeout(async () => invalidateAll(), 100);
      } catch (error) {
        console.error("Error:", error);
      }
      } else if (
        data1.formErrors.name != null ||
        data1.formErrors.hometown != null ||
        data1.formErrors.state != null ||
        data1.formErrors.coach != null
      ) {
        formErrors = data1.formErrors;
        console.log("Form Errors", formErrors);
        return;
      }
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
      credentials:'include',
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
    // Close the delete confirmation modal
    closeDeleteModal();
  }
</script>

<title>Rosters</title>

<div class="roster-page">
  <section class="rosters-dash">
    <h1><strong>Rosters</strong></h1>
    <h3>A List of All Teams on the Website</h3>
  </section>

  <section class="list-section-1">
    <h2>All Teams</h2>

    <div class= "center">
    {#if canEdit}
    <button class = "add-player-button" onclick={() => openEditModal(defaultTeam)} type="button">Add Teams</button>
    {/if}
    </div>

    <div class="teams-bars">
      {#each data.teams as team}
        <div class="team-bar">
            <a href="/rosters/{team.team_id}" class="team-link">
              <h3 class="team-name">{team.team_name}</h3>
              <p>{team.hometown}, {team.state}</p>
              <p>Coach: {team.coach}</p>
            </a>
          {#if canEdit}
          <div class="team-actions">
            <button onclick={() => openEditModal(team)} type="button" class="edit-button">Edit</button>
            <button onclick={() => openDeleteModal(team)} type="button" class="delete-button">Delete</button>
          </div>
          {/if}
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
            <p class="form-errors">{formErrors.name}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="hometown">Hometown:</label>
          <input type="text" name="hometown" value={editingTeam.hometown} />
          {#if formErrors.hometown}
            <p class="form-errors">{formErrors.hometown}</p>
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
            <p class="form-errors">{formErrors.state}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="coach-name">Coach:</label>
          <input type="text" name="coach-name" value={editingTeam.coach} />
          {#if formErrors.coach}
            <p class="form-errors">{formErrors.coach}</p>
          {/if}
        </div>
        <div class="modal-actions">
          <button type="button" onclick={closeEditModal} class="cancel-button"
            >Cancel</button
          >
          <button type="submit" class="sign-in-button">Add Changes</button>
        </div>
      </form>
    </div>
  </div>
{/if}

{#if showDeleteConfirm}
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2>Are you sure you want to delete this team?</h2>
      <div class="modal-actions">
        <button type="button" onclick={closeDeleteModal} class="cancel-button"
          >Cancel</button
        >
        <button
          type="button"
          onclick={() => handleDeleteTeam(editingTeam)}
          class="sign-in-button">Delete</button
        >
      </div>
    </div>
  </div>
{/if}
