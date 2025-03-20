<script lang="ts">
    import {games, type game, addGame} from "./pastgames.svelte"
    //let data = {
    //    loadedGames: games
    //}
    let game1: game = {gameId: "1"};
    let game2: game = {gameId: "2"};
    
    addGame(game1);
    addGame(game2);
    /*
    console.log(data.loadedGames);
    if (Array.isArray(data.loadedGames)) {
        for (const game of data.loadedGames) {
            games.push(game);
        }
    } else {
        console.error('loadedGames is not an array:', data.loadedGames);
    }
    */

</script>

<title>Past Games</title>


<div>
    <section class= "past-games-dash">
        <h1>Past Games</h1>
        <h3>A List of All Published Games</h3>
    </section>

    <section class="list-section-1">
        <div>
            <h1>Past Games</h1>
        </div>
        <div>
            {#each games as game }
            <a href="/pastgames/{game.gameId}">
                <div class = "game">
                    <h3>{game.gameId}</h3>
                </div>
            </a>
            {/each}
        </div>
    </section>

</div>
