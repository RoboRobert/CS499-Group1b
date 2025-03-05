<script lang="ts">
    export let data: {player:string};

    let hometown: string = "hometown"
    let name = data.player
    let number:string = "Number"
    let position: string = "Position"
    let height: string = "Height"
    let weight: string = "Weight"
</script>

<title>Player</title>

<div>
    <a href="./">Back</a>
    <section class= "player-dash">
        <h1>{name}</h1>
        <h4>{hometown}</h4>
        <h4>{number}</h4>
        <h4>{position}</h4>
        <h4>{height}</h4>
        <h4>{weight}</h4>
    </section>
    <section class="list-section-1">
        <h3>Player Stats</h3>
        <div>
        
        </div>
    </section>
</div>