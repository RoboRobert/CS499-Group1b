<script lang="ts">
  import { players } from '$lib/components/scoresheet/data.svelte';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    console.log(data.player);
</script>

<title>Player</title>

<div class="container">
<div class="player-page">
    <section class= "player-dash">
        <div class="player-header">
            <img 
            src="/_defaultMug.jpg" 
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
            <p><strong>Games Played: </strong> {data.player.num_games} </p>
            <p><strong>Shots: </strong> {data.player.attempted_shots} </p>
            <p><strong>Failed Shots: </strong> {data.player.failed_shots} </p>
            <p><strong>Goals: </strong> {data.player.goals} </p>
            <p><strong>Ground Balls: </strong> {data.player.ground_balls}</p>
            <p><strong>Assists: </strong> {data.player.assists}</p>
        </div>
    </section>
</div>
</div>
<!--  quarter: number,
    shots: number,
    goals: number,
    miss: number,
    ground: number, -->