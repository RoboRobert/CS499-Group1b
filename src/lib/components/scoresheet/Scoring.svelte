<script lang="ts">
  import { getPlayerMap } from "./data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();
</script>

<div class="outer">
  <div class="headerBox">INDIVIDUAL SCORING</div>
  <div class="headerRow">
    <div class="rowBox normal">#</div>
    <div class="rowBox wide">NAME</div>
    <div class="rowBox thin">G</div>
    <div class="rowBox thin">A</div>
    <div class="rowBox thin">P</div>
  </div>

  <!-- Only display players that have scored or assisted -->
  {#each getPlayerMap(side).entries() as player}
    {#if player[1].goals > 0 || player[1].assists > 0}
      <div class="innerRow">
        <div class="rowBox normal">{player[1].number}</div>
        <div class="rowBox wide">{player[1].name}</div>
        <div class="rowBox thin">{player[1].goals}</div>
        <div class="rowBox thin">{player[1].assists}</div>
        <div class="rowBox thin">{player[1].goals+player[1].assists}</div>
      </div>
    {/if}
  {/each}
</div>
