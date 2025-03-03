<script lang="ts" context="module">
    export async function load({ params }) {
        const gameId = params.gameId;
        return  { gameId };
        
    }
</script>

<script lang="ts">
    export let gameId: string;
</script>

<title>Team {gameId}</title>

<div>
    <h1>Game {gameId} Details</h1>
    <p>This is the detailed page for Team {gameId}.</p>
    
</div>