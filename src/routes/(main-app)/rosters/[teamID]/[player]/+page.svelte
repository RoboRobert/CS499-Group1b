<script lang="ts">
    import type { PageProps } from './$types';
    import defaultMug from '$lib/_defaultMug.jpg'; // Import the image properly

    let { data }: PageProps = $props();

    console.log(data.player);
</script>

<title>Player</title>

<div class="player-page">
    <section class= "player-dash">
        <div class="player-header">
            <img 
            src="{defaultMug}" 
            alt="{data.player.player_name}" 
            class="player-image"
        />
            <h4 class="player-number">#{data.player.player_number}</h4>
            <h1 class="player-name">{data.player.player_name}</h1>
        </div>
        <div class="player-details">
            <p><strong>Position:</strong> {data.player.position}</p>
            <p><strong>Height:</strong> {data.player.height_feet}ft, {data.player.height_inches}in.</p>
            <p><strong>Weight:</strong> {data.player.weight}lbs</p>
            <p><strong>Class:</strong> {data.player.player_class}</p>
            <p><strong>Hometown:</strong> {data.player.hometown}, {data.player.state}</p>
        </div>
    </section>
    
    <section class="player-stats">
        <h3>Player Stats</h3>
        <div class="stats-grid">
            <p><strong>Games Played: </strong> 0 </p>
            <p><strong>Quarters: </strong> {data.player.quarters}</p>
            <p><strong>Shots: </strong> {data.player.attempted_shots} </p>
            <p><strong>Goals: </strong> {data.player.goals} </p>
            <p><strong>Ground Balls: </strong> {data.player.ground_balls}</p>
        </div>
    </section>
</div>

<!--  quarter: number,
    shots: number,
    goals: number,
    miss: number,
    ground: number, -->