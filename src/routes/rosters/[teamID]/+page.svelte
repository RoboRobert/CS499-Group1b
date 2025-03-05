
<script lang="ts">
    export let data: { teamId: string };

    let teamId = data.teamId;

    let players: string[] = ["tom","bill","peter","jerry","rick","morty","henry","hans", "radzig","theresa"]
    let location: string = "Hometown"
    let record: string = "0-0"
</script>

<title>Team {teamId}</title>
<div>
    <a href="./">Back</a>
    <section class="home-dash">
        <h1>Team {teamId} Details</h1>
        <h3>{location}</h3>
        <h3>{record}</h3>
    </section>
    <section class="list-section-1">
        <h2>Players</h2>
        <div>
            {#each players as player }
            <a href="/rosters/teamID/{player}">
                <div class = "game">
                    <h3>{player}</h3>
                </div>
            </a>
            {/each}
        </div>
    </section>
</div>