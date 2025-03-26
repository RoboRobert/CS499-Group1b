<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<title>Player</title>

<div>
    <a href="/rosters/{data.player.team_name}">Back</a>
    <section class= "player-dash">
        <h1>{data.player.player_name}</h1>
        <h4>Class: {data.player.player_class}</h4>
        <h4>Hometown: {data.player.hometown}</h4>
        <h4>State: {data.player.state}</h4>
        <h4>Number: {data.player.player_number}</h4>
        <h4>Position: {data.player.position}</h4>
        <h4>Height: {data.player.height_feet}ft, {data.player.height_inches}in.</h4>
        <h4>Weight: {data.player.weight}lbs</h4>
    </section>
    <section class="list-section-1">
        <h3>Player Stats</h3>
        <div>
            <!-- <p>Games Played: {stats.gamesPlayed}</p>
            <p>Points: {stats.points}</p>
            <p>Assists: {stats.assists}</p>
            <p>Rebounds: {stats.rebounds}</p>
            <p>Steals: {stats.steals}</p>
            <p>Blocks: {stats.blocks}</p> -->
        </div>
    </section>
</div>