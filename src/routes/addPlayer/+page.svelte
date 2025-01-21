<script lang="ts">
	let name = $state("");
	let team = $state("");

	async function add() {
		const response = await fetch('/api/addPlayer', {
			method: 'POST',
			body: JSON.stringify({ name, team }),
			headers: {
				'content-type': 'application/json'
			}
		});

        console.log(response);
	}
</script>

<p>NAME:</p>
<input type="string" bind:value={name}>
<p>TEAM:</p>
<input type="string" bind:value={team}>

<button onclick={add}>Add to Database!</button>