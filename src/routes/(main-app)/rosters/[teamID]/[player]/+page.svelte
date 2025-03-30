<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<title>Player</title>

<div class="player-page">
    <a href="./">Back</a>
    <section class= "player-dash">
        <div class="player-header">
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
            <p><strong>Games Played:</strong> </p>
            <p><strong>Points:</strong> </p>
            <p><strong>Assists:</strong> </p>
            <p><strong>Rebounds:</strong> </p>
            <p><strong>Steals:</strong> </p>
            <p><strong>Blocks:</strong> </p>
        </div>
    </section>
</div>