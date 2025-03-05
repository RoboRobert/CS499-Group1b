<script lang="ts">
    let showAddModal = false
    let teams: number[] = [1, 2, 3, 4, 5]

    const openAddModal = () => (showAddModal = true);
    const closeAddModal = () => (showAddModal = false);
</script>


<title>Rosters</title>

<div>
    <section class= "rosters-dash">
        <h1>Rosters</h1>
        <h3>A List of All Teams on the Website</h3>
    </section>

    <section class="list-section-1">
        <div class = "buttons">
            <button on:click={openAddModal} type="button">Add Teams</button>
        </div>
        <div>
            <h1>All Teams</h1>
        </div>
        <div>
            {#each teams as team }
            <a href='/rosters/{team}'>
                <div class = "game">
                    <h3>{team}</h3>
                </div>
            </a>
            {/each}
        </div>

    </section>
</div>

 {#if showAddModal}
        <div class="modal-backdrop">
            <!-- Modal Content -->
            <div class="modal-content">
                <h2>Sign In</h2>
                <form>
                    <div class="form-group">
                        <label for="team-name">Team Name:</label>
                        <input type="text" id="team-name" required>
                    </div>
                    <div class="form-group">
                        <label for="hometown">Hometown:</label>
                        <input type="text" id="hometown" required>
                    </div>
                    <div class="form-group">
                        <label for="coach-name">Coach:</label>
                        <input type="text" id="coach-name" required>
                    </div>
                    <div class="modal-actions">
                        <button type="button" on:click={closeAddModal} class="cancel-button">Cancel</button>
                        <button type="submit" class="sign-in-button">Add</button>
                    </div>
                </form>
            </div>
        </div>
    {/if}