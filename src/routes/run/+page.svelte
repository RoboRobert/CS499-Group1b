<script lang="ts">
  import Scoresheet from "$lib/components/scoresheet/Scoresheet.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<Scoresheet theme={data.theme}></Scoresheet>
