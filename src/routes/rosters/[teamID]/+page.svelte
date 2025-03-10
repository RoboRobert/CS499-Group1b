<script lang="ts">
    import { players, addPlayer, type player, type team, teams } from '../rosters.svelte';
    export let data: { teamId: string };
    let teamId = data.teamId;
    let currentTeam: team = teams.find(team => team.name === teamId);
    console.log(currentTeam);

    // Modal state for adding a new player
    let showAddPlayerModal = false;
    let errors: { [key: string]: string } = {};

    function openAddPlayerModal() {
        showAddPlayerModal = true;
    }

    function closeAddPlayerModal() {
        showAddPlayerModal = false;
        errors = {};
    }

    function handleAddPlayer(event: Event) {
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

        // Create a new player object using the current team id
        const newPlayer: player = {
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
        team: currentTeam
        };

        // Add the new player to the shared players state
        addPlayer(newPlayer);
        currentTeam.players.push(newPlayer);

        closeAddPlayerModal();
    }
</script>

<title>Team {currentTeam}</title>
<div>
<a href="./">Back</a>
<section class="home-dash">
    <h1>{currentTeam.name}</h1>
    <h3>{currentTeam.hometown}</h3>
    <h3>{currentTeam.coach}</h3>
</section>
<section class="list-section-1">
    <h2>Players</h2>
    <div>
    {#each currentTeam.players as player}
        <a href="/rosters/teamID/{player.firstName}">
            <div class="game">
            <h3>{player.firstName}</h3>
            <p>{player.position}</p>
            </div>
        </a>
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
        <label for="player-first-name">First Name:</label>
        <input type="text" name="player-first-name" >
        {#if errors.firstName}
            <p class="error">{errors.firstName}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-last-name">Last Name:</label>
        <input type="text" name="player-last-name" >
        {#if errors.lastName}
            <p class="error">{errors.lastName}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-hometown">Hometown:</label>
        <input type="text" name="player-hometown">
        {#if errors.hometown}
            <p class="error">{errors.hometown}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-state">State:</label>
        <input type="text" name="player-state" >
        {#if errors.state}
            <p class="error">{errors.state}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-number">Number:</label>
        <input type="number" name="player-number" min="0" max="99" >
        {#if errors.number}
            <p class="error">{errors.number}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-position">Position:</label>
        <select name="player-position" required>
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
        <select name="player-class" required>
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
            <input type="number" name="player-height-feet" placeholder="Feet" min="0">
            <input type="number" name="player-height-inches" placeholder="Inches" min="0" max="11">
        </div>
        {#if errors.height}
            <p class="error">{errors.height}</p>
        {/if}
        </div>
        <div class="form-group">
        <label for="player-weight">Weight (lbs):</label>
        <input type="number" name="player-weight" min="0">
        {#if errors.weight}
            <p class="error">{errors.weight}</p>
        {/if}
        </div>
        <div class="modal-actions">
        <button type="button" on:click={closeAddPlayerModal} class="cancel-button">Cancel</button>
        <button type="submit" class="sign-in-button">Add Player</button>
        </div>
    </form>
    </div>
</div>
{/if}
