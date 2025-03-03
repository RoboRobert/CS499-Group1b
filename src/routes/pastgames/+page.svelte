<script lang="ts">
    let games: number[] = [1, 2, 3, 4, 5]

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
            <a href="/pastgames/${game}">
                <div class = "game">
                    <h3>{game}</h3>
                </div>
            </a>
            {/each}
        </div>
    </section>

</div>
