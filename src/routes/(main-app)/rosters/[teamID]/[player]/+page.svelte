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
    
    // Filler stats
    let stats = {
        gamesPlayed: 10,
        points: 150,
        assists: 30,
        rebounds: 50,
        steals: 20,
        blocks: 10
    };

    
</script>

<title>Player</title>

<div>
    <a href="/rosters/{currentPlayer.team}">Back</a>
    <section class= "player-dash">
        <h1>{name}</h1>
        <h4>Class: {playerClass}</h4>
        <h4>Hometown: {hometown}</h4>
        <h4>Number: {number}</h4>
        <h4>Position: {position}</h4>
        <h4>Height: {height}</h4>
        <h4>Weight: {weight}</h4>
    </section>
    <section class="list-section-1">
        <h3>Player Stats</h3>
        <div>
            <p>Games Played: {stats.gamesPlayed}</p>
            <p>Points: {stats.points}</p>
            <p>Assists: {stats.assists}</p>
            <p>Rebounds: {stats.rebounds}</p>
            <p>Steals: {stats.steals}</p>
            <p>Blocks: {stats.blocks}</p>
        </div>
    </section>
</div>