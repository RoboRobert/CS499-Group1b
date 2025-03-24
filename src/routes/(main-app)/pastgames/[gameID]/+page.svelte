
<script lang="ts">
    import type {game, scoresheet} from "../pastgames.svelte"
    
    
    export let data: { loadedGame:  game; loadedScoresheets: scoresheet[] }  
    let currentGame: game = data.loadedGame;
    let gameScoresheets: scoresheet[] = data.loadedScoresheets;

    if (gameScoresheets.length === 0) {
        gameScoresheets = [
            { gameId: currentGame.gameId, sheetId: 'Dummy Score 1' },
            { gameId: currentGame.gameId, sheetId: 'Dummy Score 2' }
        ];
    }
</script>

<title>Team {currentGame.gameId}</title>

<div>
    <a href="./">Back</a>
    <section class= "game-dash">
        <h1>Game {currentGame.gameId} Details</h1>
        <p>This is the detailed page for game {currentGame.gameId}.</p>
    </section>
    <section class="list-section-1">
        {#each gameScoresheets as scoresheet }
        <a href=" ">
            <div class = "game">
                <h3>{scoresheet}</h3>
            </div>
        </a>
        {/each}
    </section>
</div>