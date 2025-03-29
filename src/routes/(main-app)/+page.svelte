<script lang="ts">
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();

</script>

<title>Home Page</title>

<div>
    <section class = "home-dash">
        <!-- <img class="smegol" src="/LOGO.png" alt="Project Logo"/> -->
        <img class="smegol" src="/LOGO_NO_LEGS.png" alt="Project Logo"/>
        <h1>SMEGOL</h1>
        <h3>Stats Made Easy, Game Operator's Log</h3>
    </section>

    <section class = "list-section-1">
        <h2>Recent Games</h2>
        <div>
        {#each data.games as game }
        <div class="game">
        <div class="team-bar">
            <a href="/pastgames/{game}">
                <h3>{game.gameid}</h3>
                
            </a>
        </div>
        </div>
        {/each}
        </div>
            
       
    </section>
</div>

<style>
  
    .smegol {
        width:400px;
    }
</style>