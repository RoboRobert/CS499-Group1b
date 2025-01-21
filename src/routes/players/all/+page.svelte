<script lang="ts">
    import type { Player } from '$lib/Player';
    	let { data } = $props();

	let players: Player[] = data.data;
</script>

{#each players as player}
	<h1>{player.name}</h1>
	<p>Team: {player.team}</p>
	<p>ID: {player.id}</p>
{/each}

