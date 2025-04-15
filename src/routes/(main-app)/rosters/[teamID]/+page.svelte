<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { toPlayerID } from "$lib/conversion/general";
  import type { Player } from "$lib/database/Team";
    import { error } from "@sveltejs/kit";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const defaultPlayer: Player = {
    team_id: data.team.team_id,
    player_name: "",
    player_number: 0,
    position: "",
    player_class: "",
    hometown: "",
    state: "",
    height_feet: 0,
    height_inches: 0,
    weight: 0,
    quarters: 0,
    attempted_shots: 0,
    goals: 0,
    assists: 0,
    failed_shots: 0,
    ground_balls: 0,
    team_name: data.team.team_name,
    player_id: "",
  };

  let isEdit = $state(false);
  let userRole = data.token;
  let canEdit = userRole === "coach" || userRole === "admin"; // Check if the user is a coach or admin
  let showEditModal = $state(false);
  let errors: { [key: string]: string } = $state({});
  let showDeleteConfirm = $state(false);

  let editingPlayer: Player = $state(defaultPlayer);

  function openEditModal(player: Player) {
    if(player.player_id != ""){
      isEdit = true;
    }
    showEditModal = true;
    editingPlayer = player;
  }

  function closeEditModal() {
    isEdit = false;
    showEditModal = false;
    editingPlayer = null;
    errors = {};
  }

  const openDeleteModal = (player: Player) => {
    editingPlayer = player;
    showDeleteConfirm = true;
  };
  const closeDeleteModal = () => {
    showDeleteConfirm = false;
    editingPlayer = null;
  };

  const regexPatterns = {
    playerName: /^[a-zA-Z ]{2,50}$/, // Letters and spaces, 2-50 characters
    hometown: /^[a-zA-Z ]{2,50}$/, // Letters and spaces, 2-50 characters
    state: /^[A-Z]{2}$/, // Two uppercase letters (e.g., AL, NY)
    playerNumber: /^(?:[1-9]?[0-9])$/, // 0-99 (allows 0)
    position: /^(Attack|Midfield|Defense|Goalie|Faceoff Specialist|Long Stick Midfielder)$/, // Valid positions
    playerClass: /^(Freshman|Sophomore|Junior|Senior)$/, // Valid class values
    heightFeet: /^[0-9]$/, // 0-9 (single digit, allows 0)
    heightInches: /^(?:0|[1-9]|10|11)$/, // 0-11 (allows 0)
    weight: /^(?:[0-9]{1,3})$/, // 0-999 (allows 0)
};


  async function handlePlayerForm(event: Event) {
    event.preventDefault();

    let formdata = new FormData(event.target as HTMLFormElement);

    const firstName = formdata.get("player-first-name") as string;
    const hometown = formdata.get("player-hometown") as string;
    const state = formdata.get("player-state") as string;
    const playerNumber = formdata.get("player-number") as string;
    const position = formdata.get("player-position") as string;
    const player_class = formdata.get("player-class") as string;
    const heightFeet = formdata.get("player-height-feet") as string;
    const heightInches = formdata.get("player-height-inches") as string;
    const weight = formdata.get("player-weight") as string;

    errors = {};

    if (!regexPatterns.playerName.test(firstName)) {
      errors.player_name = "Player name must be 2-50 characters long and contain only letters and spaces.";
    }
    if (!regexPatterns.hometown.test(hometown)) {
      errors.hometown = "Hometown must be 2-50 characters long and contain only letters and spaces.";
    }
    if (!regexPatterns.state.test(state)) {
      errors.state = "State must be a valid two-letter abbreviation (e.g., AL, NY).";
    }
    if (!regexPatterns.playerNumber.test(playerNumber)) {
      errors.player_number = "Player number must be a 1-2 digit number (0-99).";
    }
    if (!regexPatterns.position.test(position)) {
      errors.position = "Position must be one of the following: Attack, Midfield, Defense, Goalie, Faceoff Specialist, Long Stick Midfielder.";
    }
    if (!regexPatterns.playerClass.test(player_class)) {
      errors.playerClass = "Class must be one of the following: Freshman, Sophomore, Junior, Senior.";
    }
    if (!regexPatterns.heightFeet.test(heightFeet)) {
      errors.height_feet = "Height feet must be a single digit (0-9).";
    }
    if (!regexPatterns.heightInches.test(heightInches)) {
      errors.height_inches = "Height inches must be a 1-2 digit number (0-11).";
    }
    if (!regexPatterns.weight.test(weight)) {
      errors.weight = "Weight must be a 1-3 digit number (e.g., 100-999 lbs).";
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    let newPlayer: Player;

    if (editingPlayer.player_name != "") {
      editingPlayer.player_name = firstName;
      editingPlayer.player_number = parseInt(playerNumber);
      editingPlayer.team_id = data.team.team_id;
      editingPlayer.team_name = data.team.team_name;
      editingPlayer.position = position;
      editingPlayer.player_class = player_class;
      editingPlayer.hometown = hometown;
      editingPlayer.state = state;
      editingPlayer.height_feet = parseInt(heightFeet);
      editingPlayer.height_inches = parseInt(heightInches);
      editingPlayer.weight = parseInt(weight);

      const response = await fetch("/api/players/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingPlayer),
        credentials:'include',
      });

      const data1 = await response.json();
      console.log(data1);
      
      // Check if data1 is null or undefined
      if (!data1 || !data1.formErrors) {
        console.log("No errors returned from the API.");
      try {
        const response2 = await fetch("/api/editPlayers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingPlayer),
          credentials:'include',
        });

        setTimeout(async () => invalidateAll(), 100);

        if (!response2.ok) {
          throw new Error("Failed to save player data");
        }
        } catch (error) {
          console.error("Error:", error);
        }

      } else if (
        data1.formErrors.player_name != null ||
        data1.formErrors.hometown != null ||
        data1.formErrors.state != null ||
        data1.formErrors.player_number != null ||
        data1.formErrors.position != null ||
        data1.formErrors.playerClass != null ||
        data1.formErrors.height_feet != null ||
        data1.formErrors.height_inches != null ||
        data1.formErrors.weight != null
      ) {
        errors = data1.formErrors;
        console.log("Errors:", errors);
        return;
      }
      else{
        console.log("some error occurred")
      }
    } else {
      newPlayer = {
        player_id: toPlayerID(firstName, parseInt(playerNumber), data.team.team_id),
        player_name: firstName,
        player_number: parseInt(playerNumber),
        team_id: data.team.team_id,
        team_name: data.team.team_name,
        position: position,
        player_class: player_class,
        hometown: hometown,
        state: state,
        height_feet: parseInt(heightFeet),
        height_inches: parseInt(heightInches),
        weight: parseInt(weight),
        quarters: 0,
        attempted_shots: 0,
        goals: 0,
        assists: 0,
        failed_shots: 0,
        ground_balls: 0,
      };

      const response = await fetch("/api/players/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
        credentials:'include',
      });

      const data1 = await response.json();
      console.log(data1);
      // Check if data1 is null or undefined
      if (!data1 || !data1.formErrors) {
        console.log("No errors returned from the API.");
        try {
          const response = await fetch("/api/players", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPlayer),
            credentials:'include',
          });

        setTimeout(async () => invalidateAll(), 100);

        if (!response.ok) {
          throw new Error("Failed to save player data");
        }
        } catch (error) {
          console.error("Error:", error);
        }
      } else if (
        data1.formErrors.player_name != null ||
        data1.formErrors.hometown != null ||
        data1.formErrors.state != null ||
        data1.formErrors.player_number != null ||
        data1.formErrors.position != null ||
        data1.formErrors.playerClass != null ||
        data1.formErrors.height_feet != null ||
        data1.formErrors.height_inches != null ||
        data1.formErrors.weight != null
      ) {
        errors = data1.formErrors;
        console.log("Errors:", errors);
        return;
      }
      else{
        console.log("some error occurred")
      }
    }
    closeEditModal();
  }

  function handleDeletePlayer(player: Player) {
    fetch("/api/players", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player.player_name),
      credentials:'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete player");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(async () => invalidateAll(), 100);
    closeDeleteModal();
  }
</script>

<title>Team {data.team.team_name}</title>
<div class="container">
<div class="team-page">
  <!-- <a href="./" class="back-link">← Back to Rosters</a> -->

  <section class="team-header">
    <h1>{data.team.team_name}</h1>
    <p class="team-info">
      {data.team.hometown}, {data.team.state} <br />
      Coach: {data.team.coach}
    </p>
  </section>
  <section class="list-section-1">
    <h2>All Players</h2>
    <div class="center">
    {#if canEdit}
    <button  onclick={() => openEditModal(defaultPlayer)} class="add-player-button">Add Player</button>
    {/if}
    </div>
    
    <div class="players-grid">
      {#each data.players as player}
        <div class="player-card">
          <a href="/rosters/{player.team_id}/{player.player_id}" class="player-link">
            <h3 class="player-name">{player.player_name}</h3>
            <p>
              <strong>Position:</strong> {player.position} <br />
              <strong>Number:</strong> #{player.player_number} <br />
              <strong>Class:</strong>
              {player.player_class} <br />
              <strong>Height:</strong>
              {player.height_feet}' {player.height_inches}" <br />
              <strong>Weight:</strong>
              {player.weight} lbs
            </p>
          </a>
          {#if canEdit}
          <div class="player-actions">
            <button onclick={() => openEditModal(player)} class="edit-button">Edit</button>
            <button onclick={() => openDeleteModal(player)} class="delete-button">Delete</button>
          </div>
          {/if}
        </div>
      {/each}
    </div>
  </section>
</div>
</div>


{#if showEditModal}
  <div class="modal-backdrop">
    <div class="modal-content">
      {#if isEdit}
      <h2>Edit Player</h2>
      {/if}
      {#if !isEdit}
      <h2>Add Player</h2>
      {/if}
      <form onsubmit={(event) => handlePlayerForm(event)}>
        <div class="form-group">
          <label for="player-first-name">Player Name:</label>
          <input type="text" name="player-first-name" value={editingPlayer.player_name} />
          {#if errors.player_name}
            <p class="form-errors">{errors.player_name}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="player-number">Player Number:</label>
          <input type="text" name="player-number" value={editingPlayer.player_number} />
          {#if errors.player_number}
            <p class="form-errors">{errors.player_number}</p>
          {/if}
        </div>
        <div class="form-group">
                    <label for="player-hometown">Hometown:</label>
                    <input
                        type="text"
                        name="player-hometown"
                        value={editingPlayer.hometown}
                    />
                    {#if errors.hometown}
                        <p class="form-errors">{errors.hometown}</p>
                    {/if}
                </div>
                <div class="form-group">
                    <label for="player-state">State:</label>
                    <select name="player-state" value={editingPlayer.state}>
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
                    {#if errors.state}
                        <p class="form-errors">{errors.state}</p>
                    {/if}
                </div>
                <div class="form-group">
                    <label for="player-position">Position:</label>
                    <select
                        name="player-position"
                        value={editingPlayer.position}
                    >
                        <option value="">Select a Position</option>
                        <option value="Attack">Attack</option>
                        <option value="Midfield">Midfield</option>
                        <option value="Defense">Defense</option>
                        <option value="Goalie">Goalie</option>
                        <option value="Faceoff Specialist"
                            >Faceoff Specialist</option
                        >
                        <option value="Long Stick Midfielder"
                            >Long Stick Midfielder</option
                        >
                    </select>
                    {#if errors.position}
                        <p class="form-errors">{errors.position}</p>
                    {/if}
                </div>
                <div class="form-group">
                    <label for="player-class">Class:</label>
                    <select name="player-class" value={editingPlayer.player_class}>
                        <option value="">Select a Class</option>
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                    </select>
                    {#if errors.playerClass}
                        <p class="form-errors">{errors.playerClass}</p>
                    {/if}
                </div>
                <div class="form-group">
                    <label for="player-height">Height (ft.):</label>
                    <div class="height-inputs">
                        <input
                            type="number"
                            name="player-height-feet"
                            placeholder="Feet"
                            min="0"
                            value={editingPlayer.height_feet}
                        /> 
                    {#if errors.height_feet}
                        <p class="form-errors">{errors.height_feet}</p>
                    {/if}
                  </div>
                  <div class="form-group">
                    <label for="player-height">Height (in.):</label>
                    <div class="height-inputs">
                        <input
                            type="number"
                            name="player-height-inches"
                            placeholder="Inches"
                            min="0"
                            max="11"
                            value={editingPlayer.height_inches}
                        />
                  </div>
                    {#if errors.height_inches}
                        <p class="form-errors">{errors.height_inches}</p>
                    {/if}
                  </div>
                <div class="form-group">
                    <label for="player-weight">Weight (lbs):</label>
                    <input
                        type="number"
                        name="player-weight"
                        min="0"
                        value={editingPlayer.weight}
                    />
                    {#if errors.weight}
                        <p class="form-errors">{errors.weight}</p>
                    {/if}
                </div>
        <div class="modal-actions">
          <button type="button" onclick={closeEditModal} class="cancel-button">Cancel</button>
          {#if isEdit}
          <button type="submit" class="sign-in-button">Save Changes</button>
          {/if}
          {#if !isEdit}
          <button type="submit" class="sign-in-button">Add Player</button>
          {/if}

        </div>
      </form>
    </div>
  </div>
{/if}


{#if showDeleteConfirm}
<div class="modal-backdrop">
  <div class="modal-content">
    <h2>Are you sure you want to delete this player?</h2>
    <div class="modal-actions">
      <button type="button" onclick={closeDeleteModal} class="cancel-button">Cancel</button>
      <button type="button" onclick={() => handleDeletePlayer(editingPlayer)} class="sign-in-button">Delete</button>
    </div>

  </div>
</div>
{/if}

