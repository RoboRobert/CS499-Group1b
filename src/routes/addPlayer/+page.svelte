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

<form method="POST" action="?/addPlayer">
	<label>
		Name
		<input name="name" type="string" required>
	</label>
	<label>
		Team
		<input name="team" type="string" required>
	</label>
	<button>Add to Database!</button>
</form>