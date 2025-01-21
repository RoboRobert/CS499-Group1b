<script lang="ts">
    import type { Player } from '$lib/Player';
    import type { PageProps } from '../$types';
	let { data }: PageProps = $props();

	let player: Player = data.data;
</script>

<h1>{player.name}</h1>
<p>Team: {player.team}</p>
<p>ID: {player.id}</p>

