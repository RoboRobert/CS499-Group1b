<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import type { Player } from "$lib/database/Team";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const defaultPlayer: Player = {
    team_name: "",
    player_name: "",
    player_number: 0,
    position: "",
    quarter: 0,
    shots: 0,
    goals: 0,
    miss: 0,
    ground: 0,
  };

  // Modal state for adding a new player
  let showEditModal = $state(false);
  let errors: { [key: string]: string } = $state({});

  let editingPlayer: Player | null = $state(defaultPlayer);

  function openEditModal(player: Player) {
    showEditModal = true;
    editingPlayer = player;
  }

  function closeEditModal() {
    showEditModal = false;
    editingPlayer = null;
  }

  // Combined handler for form submission to add or edit a player
  async function handlePlayerForm(event: Event) {
    event.preventDefault();

    let formdata = new FormData(event.target as HTMLFormElement);

    // Validate form data
    const firstName = formdata.get("player-first-name") as string;
    // const lastName = formdata.get("player-last-name") as string;
    // const hometown = formdata.get("player-hometown") as string;
    // const state = formdata.get("player-state") as string;
    const playerNumber = formdata.get("player-number") as string;
    // const position = formdata.get("player-position") as string;
    // const playerClass = formdata.get("player-class") as string;
    // const heightFeet = formdata.get("player-height-feet") as string;
    // const heightInches = formdata.get("player-height-inches") as string;
    // const weight = formdata.get("player-weight") as string;

    errors = {};

    // if (!firstName) errors.firstName = "First name is required.";
    // if (!lastName) errors.lastName = "Last name is required.";
    // if (!hometown) errors.hometown = "Hometown is required.";
    // if (!state) errors.state = "State is required.";
    // if (!number) errors.number = "Number is required.";
    // if (!position) errors.position = "Position is required.";
    // if (!playerClass) errors.playerClass = "Class is required.";
    // if (!heightFeet) errors.heightFeet = "Height (feet) is required.";
    // if (!heightInches) errors.heightInches = "Height (inches) is required.";
    // if (!weight) errors.weight = "Weight is required.";

    if (parseInt(playerNumber) < 0 || parseInt(playerNumber) > 99) {
      errors.number = "Player number must be between 0 and 99.";
    }

    // if (
    //     parseInt(heightFeet) < 0 ||
    //     parseInt(heightInches) < 0 ||
    //     parseInt(heightInches) > 11
    // ) {
    //     errors.height = "Height must be valid.";
    // }

    // if (parseInt(weight) < 0) {
    //     errors.weight = "Weight must be a positive number.";
    // }

    if (Object.keys(errors).length > 0) {
      return;
    }

    let newPlayer: Player;

    // if (editingPlayer.playerId != "") {
    //     editingPlayer.firstName = firstName;
    //     editingPlayer.lastName = lastName;
    //     editingPlayer.hometown = hometown;
    //     editingPlayer.state = state;
    //     editingPlayer.number = number;
    //     editingPlayer.position = position;
    //     editingPlayer.class = playerClass;
    //     editingPlayer.heightFeet = heightFeet;
    //     editingPlayer.heightInches = heightInches;
    //     editingPlayer.weight = weight;

    //     const index = currentTeam.players.findIndex(player => player.firstName === editingPlayer.firstName);
    //     if (index !== -1) {
    //         currentTeam.players[index] = { ...editingPlayer };
    //         players[index] = { ...editingPlayer };
    //     }

    //     newPlayer = editingPlayer;

    // } else {
    //     newPlayer = {
    //         playerId: `${firstName}-${lastName}-${currentTeam.players.length}`,
    //         firstName,
    //         lastName,
    //         hometown,
    //         state,
    //         number,
    //         position,
    //         class: playerClass,
    //         heightFeet,
    //         heightInches,
    //         weight,
    //         team: teamId
    //     };

    newPlayer = {
      player_name: firstName,
      player_number: parseInt(playerNumber),
      team_name: data.team.team_name,
      position: "ATTACK",
      quarter: 0,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    };

    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      setTimeout(async () => invalidateAll(), 100);

      if (!response.ok) {
        throw new Error("Failed to save team data");
      }
    } catch (error) {
      console.error("Error:", error);
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
  }
</script>

<title>Team {data.team.team_name}</title>
<div>
  <a href="./">Back</a>
  <section class="home-dash">
    <h1>{data.team.team_name}</h1>
    <h3>{data.team.hometown}</h3>
    <h3>{data.team.coach}</h3>
  </section>
  <section class="list-section-1">
    <h2>Players</h2>
    <div class="buttons">
      <button onclick={() => openEditModal(defaultPlayer)} type="button">Add Player</button>
    </div>
    <div>
      <h2>Players</h2>
    </div>
    <div>
      {#each data.players as player}
        <div class="game">
          <a href="/rosters/{player.team_name}/{player.player_name}">
            <h3>{player.player_name}</h3>
            <p>{player.position}</p>
          </a>
          <div class="buttons">
            <button onclick={() => openEditModal(player)} type="button">Edit</button>
            <button onclick={() => handleDeletePlayer(player)} type="button">Delete</button>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>

{#if showEditModal}
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2>Edit Player</h2>
      <form onsubmit={(event) => handlePlayerForm(event)}>
        <div class="form-group">
          <label for="player-first-name">Player Name:</label>
          <input type="text" name="player-first-name" value={editingPlayer.player_name} />
          {#if errors.player_name}
            <p class="error">{errors.player_name}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="player-number">Player Number:</label>
          <input type="text" name="player-number" value={editingPlayer.player_number} />
          {#if errors.player_number}
            <p class="error">{errors.player_number}</p>
          {/if}
        </div>
        <!-- <div class="form-group">
                    <label for="player-first-name">First Name:</label>
                    <input
                        type="text"
                        name="player-first-name"
                        value={editingPlayer.firstName}
                    />
                    {#if errors.firstName}
                        <p class="error">{errors.firstName}</p>
                    {/if}
                </div>
                <div class="form-group">
                    <label for="player-last-name">Last Name:</label>
                    <input
                        type="text"
                        name="player-last-name"
                        value={editingPlayer.lastName}
                    />
                    {#if errors.lastName}
                        <p class="error">{errors.lastName}</p>
                    {/if}
                </div> -->
        <!-- <div class="form-group">
                    <label for="player-hometown">Hometown:</label>
                    <input
                        type="text"
                        name="player-hometown"
                        value={editingPlayer.hometown}
                    />
                    {#if errors.hometown}
                        <p class="error">{errors.hometown}</p>
                    {/if}
                </div>
                <div class="form-group">
                    <label for="player-state">State:</label>
                    <input
                        type="text"
                        name="player-state"
                        value={editingPlayer.state}
                    />
                    {#if errors.state}
                        <p class="error">{errors.state}</p>
                    {/if}
                </div>
                <div class="form-group">
                    <label for="player-number">Number:</label>
                    <input
                        type="number"
                        name="player-number"
                        min="0"
                        max="99"
                        value={editingPlayer.number}
                    />
                    {#if errors.number}
                        <p class="error">{errors.number}</p>
                    {/if}
                </div>
                <div class="form-group">
                    <label for="player-position">Position:</label>
                    <select
                        name="player-position"
                        value={editingPlayer.position}
                    >
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
                        <p class="error">{errors.position}</p>
                    {/if}
                </div>
                <div class="form-group">
                    <label for="player-class">Class:</label>
                    <select name="player-class" value={editingPlayer.class}>
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                    </select>
                    {#if errors.playerClass}
                        <p class="error">{errors.playerClass}</p>
                    {/if}
                </div>
                <div class="form-group">
                    <label for="player-height">Height:</label>
                    <div class="height-inputs">
                        <input
                            type="number"
                            name="player-height-feet"
                            placeholder="Feet"
                            min="0"
                            value={editingPlayer.heightFeet}
                        />
                        <input
                            type="number"
                            name="player-height-inches"
                            placeholder="Inches"
                            min="0"
                            max="11"
                            value={editingPlayer.heightInches}
                        />
                    </div>
                    {#if errors.height}
                        <p class="error">{errors.height}</p>
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
                        <p class="error">{errors.weight}</p>
                    {/if}
                </div> -->
        <div class="modal-actions">
          <button type="button" onclick={closeEditModal} class="cancel-button">Cancel</button>
          <button type="submit" class="sign-in-button">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
{/if}
