<script lang="ts">
    import type { PageProps } from './$types';

	let { data }: PageProps = $props();
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
            {#each data.games as game }
            <a href="/pastgames/{game.gameid}">
                <div class = "game">
                    <h3>{game.gameid}</h3>
                </div>
            </a>
            {/each}
        </div>
    </section>

</div>
