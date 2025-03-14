<script lang="ts">
  import { saves } from "./data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();

  let saveRows = 3;
</script>

<div class="outer">
  <div class="headerBox">SAVES</div>
  <div class="headerRow">
    <div class="rowBox">GOALIE #</div>
    <div class="rowBox">QTR 1</div>
    <div class="rowBox">QTR 2</div>
    <div class="rowBox">QTR 3</div>
    <div class="rowBox">QTR 4</div>
    <div class="rowBox">O.T.</div>
    <div class="rowBox">TOTAL</div>
  </div>

  {#each Array(saveRows) as saveRow, i}
    <div class="innerRow">
      <input autocomplete="off" class="field" type="number" bind:value={saves[side][i].goalie} />
      <input autocomplete="off" class="field" type="number" bind:value={saves[side][i].qtr1} />
      <input autocomplete="off" class="field" type="number" bind:value={saves[side][i].qtr2} />
      <input autocomplete="off" class="field" type="number" bind:value={saves[side][i].qtr3} />
      <input autocomplete="off" class="field" type="number" bind:value={saves[side][i].qtr4} />
      <input autocomplete="off" class="field" type="number" bind:value={saves[side][i].ot} />
      <div class="rowBox">{saves[side][i].qtr1 + saves[side][i].qtr2 + saves[side][i].qtr3 + saves[side][i].qtr4 + saves[side][i].ot}</div>
    </div>
  {/each}
</div>
