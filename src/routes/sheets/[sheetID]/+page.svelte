<script lang="ts">
  import PastGame from "$lib/components/pastgame/PastGame.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<PastGame theme={data.theme}></PastGame>
