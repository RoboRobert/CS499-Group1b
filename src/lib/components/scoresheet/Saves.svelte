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
    <div class="rowBox normal">GOALIE #</div>
    <div class="rowBox normal">QTR 1</div>
    <div class="rowBox normal">QTR 2</div>
    <div class="rowBox normal">QTR 3</div>
    <div class="rowBox normal">QTR 4</div>
    <div class="rowBox normal">O.T.</div>
    <div class="rowBox normal">TOTAL</div>
  </div>

  {#each Array(saveRows) as saveRow, i}
    <div class="innerRow">
      <input min="0" max="99" autocomplete="off" class="field normal" type="number" bind:value={saves[side][i].goalie} />
      <input min="0" autocomplete="off" class="field normal" type="number" bind:value={saves[side][i].qtr1} />
      <input min="0" autocomplete="off" class="field normal" type="number" bind:value={saves[side][i].qtr2} />
      <input min="0" autocomplete="off" class="field normal" type="number" bind:value={saves[side][i].qtr3} />
      <input min="0" autocomplete="off" class="field normal" type="number" bind:value={saves[side][i].qtr4} />
      <input min="0" autocomplete="off" class="field normal" type="number" bind:value={saves[side][i].ot} />
      <div class="rowBox normal">{saves[side][i].qtr1 + saves[side][i].qtr2 + saves[side][i].qtr3 + saves[side][i].qtr4 + saves[side][i].ot}</div>
    </div>
  {/each}
</div>
