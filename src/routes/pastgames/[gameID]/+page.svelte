
<script lang="ts">
    export let data: { gameId: string };
    let gameId = data.gameId;  
    let scoresheets: string[] = ["scoresheet 1","scoresheet 2"]
</script>

<title>Team {gameId}</title>

<div>
    <a href="./">Back</a>
    <section class= "game-dash">
        <h1>Game {gameId} Details</h1>
        <p>This is the detailed page for game {gameId}.</p>
    </section>
    <section class="list-section-1">
        {#each scoresheets as scoresheet }
        <a href=" ">
            <div class = "game">
                <h3>{scoresheet}</h3>
            </div>
        </a>
        {/each}
    </section>
</div>