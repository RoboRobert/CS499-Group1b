<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	let { data } = $props();

	async function remove(id: number) {
		const response = await fetch("/api/delete", {
			method: "DELETE",
			body: JSON.stringify({ id }),
			headers: {
				"content-type": "application/json",
			},
		}).then(() => invalidateAll());

		return;
	}
</script>

{#key data}
	{#each data.data as player}
		<div>
			<h1>{player.name}</h1>
			<p>Team: {player.team}</p>
			<p>ID: {player.id}</p>
			<button onclick={async () => remove(player.id)}
				>Delete Player</button
			>
		</div>
	{/each}
{/key}
