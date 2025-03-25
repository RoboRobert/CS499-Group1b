<script lang="ts">
    let games: string[] = ["Game 3", "Game 2", "Game 1"]

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
        {#each games as game }
        <a href="/pastgames/{game}">
            <div class = "game">
                <h3>{game}</h3>
            </div>
        </a>
        {/each}
        </div>
            
       
    </section>
</div>

<style>
    a:link{
        color:black;
    }
    a {
        text-decoration: none;
        color:black;
    }
    a:hover{
        color:gold;
    }

    .smegol {
        width:400px;
    }
</style>