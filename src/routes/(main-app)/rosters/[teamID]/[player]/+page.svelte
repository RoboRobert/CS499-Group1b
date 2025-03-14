<script lang="ts">
    import { type player } from '../../rosters.svelte';
    // Maybe itll work thatd be epic but we all know that probably wont happen first try
    export let data: {player: player};
    let currentPlayer = data.player
   

    let name = `${currentPlayer.firstName}-${currentPlayer.lastName}`;
    let hometown = currentPlayer.hometown;
    let number = currentPlayer.number;
    let position = currentPlayer.position;
    let height = `${currentPlayer.heightFeet}-${currentPlayer.heightInches}`;
    let weight = currentPlayer.weight;
    let playerClass = currentPlayer.class;
    

    
</script>

<title>Player</title>

<div>
    <a href="/rosters/{currentPlayer.team}">Back</a>
    <section class= "player-dash">
        <h1>{name}</h1>
        <h4>{playerClass}</h4>
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