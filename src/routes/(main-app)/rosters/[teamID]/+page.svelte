<script lang="ts">
    import { deletePlayer, addPlayer, type player, type team, teams, players } from '../rosters.svelte';
    
    // Idea is it will get the team that has been loaded and put it into the currentTeam variable
    // May not work since the table is not the same as the interface in the frontend
    export let data: { loadTeam: team };
    let currentTeam: team = data.loadTeam;
    let teamId = currentTeam.teamId;

    const defaultPlayer: player = {
        playerId: "",
        firstName: "",
        lastName: "",
        hometown: "",
        state: "",
        number: "",
        position: "",
        class: "",
        heightFeet: "",
        heightInches: "",
        weight: "",
        team: teamId
    };

    // Modal state for adding a new player
    let showEditModal = false;
    let errors: { [key: string]: string } = {};

    let editingPlayer: player | null = null;

   

    function openEditModal(player: player) {
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
        const firstName = formdata.get('player-first-name') as string;
        const lastName = formdata.get('player-last-name') as string;
        const hometown = formdata.get('player-hometown') as string;
        const state = formdata.get('player-state') as string;
        const number = formdata.get('player-number') as string;
        const position = formdata.get('player-position') as string;
        const playerClass = formdata.get('player-class') as string;
        const heightFeet = formdata.get('player-height-feet') as string;
        const heightInches = formdata.get('player-height-inches') as string;
        const weight = formdata.get('player-weight') as string;

        errors = {};

        if (!firstName) errors.firstName = "First name is required.";
        if (!lastName) errors.lastName = "Last name is required.";
        if (!hometown) errors.hometown = "Hometown is required.";
        if (!state) errors.state = "State is required.";
        if (!number) errors.number = "Number is required.";
        if (!position) errors.position = "Position is required.";
        if (!playerClass) errors.playerClass = "Class is required.";
        if (!heightFeet) errors.heightFeet = "Height (feet) is required.";
        if (!heightInches) errors.heightInches = "Height (inches) is required.";
        if (!weight) errors.weight = "Weight is required.";

        if (parseInt(number) < 0 || parseInt(number) > 99) {
            errors.number = "Player number must be between 0 and 99.";
        }

        if (parseInt(heightFeet) < 0 || parseInt(heightInches) < 0 || parseInt(heightInches) > 11) {
            errors.height = "Height must be valid.";
        }

        if (parseInt(weight) < 0) {
            errors.weight = "Weight must be a positive number.";
        }

        if (Object.keys(errors).length > 0) {
            return;
        }

        let newPlayer: player;

        if (editingPlayer.playerId != "") {
            editingPlayer.firstName = firstName;
            editingPlayer.lastName = lastName;
            editingPlayer.hometown = hometown;
            editingPlayer.state = state;
            editingPlayer.number = number;
            editingPlayer.position = position;
            editingPlayer.class = playerClass;
            editingPlayer.heightFeet = heightFeet;
            editingPlayer.heightInches = heightInches;
            editingPlayer.weight = weight;

            const index = currentTeam.players.findIndex(player => player.firstName === editingPlayer.firstName);
            if (index !== -1) {
                currentTeam.players[index] = { ...editingPlayer };
                players[index] = { ...editingPlayer };
            }

            newPlayer = editingPlayer;

        } else {
            newPlayer = {
                playerId: `${firstName}-${lastName}-${currentTeam.players.length}`,
                firstName,
                lastName,
                hometown,
                state,
                number,
                position,
                class: playerClass,
                heightFeet,
                heightInches,
                weight,
                team: teamId
            };

            addPlayer(currentTeam, newPlayer); 
        }

        try {
          const response = await fetch('/api/teams', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newPlayer)
          });

          if (!response.ok) {
              throw new Error('Failed to save team data');
          }
        } catch (error) {
            console.error('Error:', error);
         }
        
        closeEditModal();
    }

    function handleDeletePlayer(player: player) {
        deletePlayer(currentTeam, player);

        fetch('/api/deletePlayer', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete player');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
</script>

<title>Team {currentTeam.name}</title>
<div>
<a href="./">Back</a>
<section class="home-dash">
    <h1>{currentTeam.name}</h1>
    <h3>{currentTeam.hometown}</h3>
    <h3>{currentTeam.coach}</h3>
</section>
<section class="list-section-1">
    <h2>Players</h2>
    <button on:click={() => openEditModal(defaultPlayer)} type="button">Add Player</button>
    <div>
    {#each currentTeam.players as player}
        <a href="/rosters/teamID/{player.playerId}">
            <div class="game">
            <h3>{player.firstName}</h3>
            <p>{player.position}</p>
            </div>
        </a>
        <button on:click={() => handleDeletePlayer(player)} type="button">Delete</button>
        <button on:click={() => openEditModal(player)} type="button">Edit</button>
    {/each}
    </div>
    
</section>
</div>



{#if showEditModal}
<div class="modal-backdrop">
    <div class="modal-content">
    <h2>Edit Player</h2>
    <form on:submit|preventDefault={(event) => handlePlayerForm(event)}>
        <div class="form-group">
        <label for="player-first-name">First Name:</label>
        <input type="text" name="player-first-name" value={editingPlayer.firstName} >
        {#if errors.firstName}
            <p class="error">{errors.firstName}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-last-name">Last Name:</label>
        <input type="text" name="player-last-name" value={editingPlayer.lastName} >
        {#if errors.lastName}
            <p class="error">{errors.lastName}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-hometown">Hometown:</label>
        <input type="text" name="player-hometown" value={editingPlayer.hometown}>
        {#if errors.hometown}
            <p class="error">{errors.hometown}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-state">State:</label>
        <input type="text" name="player-state" value={editingPlayer.state} >
        {#if errors.state}
            <p class="error">{errors.state}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-number">Number:</label>
        <input type="number" name="player-number" min="0" max="99" value={editingPlayer.number} >
        {#if errors.number}
            <p class="error">{errors.number}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-position">Position:</label>
        <select name="player-position" value={editingPlayer.position} >
            <option value="Attack">Attack</option>
            <option value="Midfield">Midfield</option>
            <option value="Defense">Defense</option>
            <option value="Goalie">Goalie</option>
            <option value="Faceoff Specialist">Faceoff Specialist</option>
            <option value="Long Stick Midfielder">Long Stick Midfielder</option>
        </select>
        {#if errors.position}
            <p class="error">{errors.position}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-class">Class:</label>
        <select name="player-class" value={editingPlayer.class} >
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
            <input type="number" name="player-height-feet" placeholder="Feet" min="0" value={editingPlayer.heightFeet}>
            <input type="number" name="player-height-inches" placeholder="Inches" min="0" max="11" value={editingPlayer.heightInches}>
        </div>
        {#if errors.height}
            <p class="error">{errors.height}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-weight">Weight (lbs):</label>
        <input type="number" name="player-weight" min="0" value={editingPlayer.weight}>
        {#if errors.weight}
            <p class="error">{errors.weight}</p>
        {/if}
        </div>
        <div class="modal-actions">
        <button type="button" on:click={closeEditModal} class="cancel-button">Cancel</button>
        <button type="submit" class="sign-in-button">Save Changes</button>
        </div>
    </form>
    </div>
</div>
{/if}
