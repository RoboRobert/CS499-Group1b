<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
    
    console.log(data);
</script>

<h1>{data.name}</h1>
<p>ID: {data.id}</p>
<p>Email: {data.email}</p>