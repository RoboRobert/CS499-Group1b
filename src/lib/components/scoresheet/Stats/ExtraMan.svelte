<script lang="ts">
  import { extraMan } from "../data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();
</script>

<div class="outer">
  <div class="headerBox">EXTRA MAN</div>
  <div class="innerColumn">
    <div class="headerRow">
      <div class="rowBox normal"></div>
      <div class="rowBox normal">SCORED</div>
      <div class="rowBox normal">FAILED</div>
      <div class="rowBox normal"></div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 1</div>
      <input autocomplete="off" class="field normal" type="number" bind:value={extraMan[side][0].won} />
      <input autocomplete="off" class="field normal" type="number" bind:value={extraMan[side][0].lost} />
      <div class="rowBox normal">{extraMan[side][0].won}/{extraMan[side][0].lost + extraMan[side][0].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 2</div>
      <input autocomplete="off" class="field normal" type="number" bind:value={extraMan[side][1].won} />
      <input autocomplete="off" class="field normal" type="number" bind:value={extraMan[side][1].lost} />
      <div class="rowBox normal">{extraMan[side][1].won}/{extraMan[side][1].lost + extraMan[side][1].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 3</div>
      <input autocomplete="off" class="field normal" type="number" bind:value={extraMan[side][2].won} />
      <input autocomplete="off" class="field normal" type="number" bind:value={extraMan[side][2].lost} />
      <div class="rowBox normal">{extraMan[side][2].won}/{extraMan[side][2].lost + extraMan[side][2].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 4</div>
      <input autocomplete="off" class="field normal" type="number" bind:value={extraMan[side][3].won} />
      <input autocomplete="off" class="field normal" type="number" bind:value={extraMan[side][3].lost} />
      <div class="rowBox normal">{extraMan[side][3].won}/{extraMan[side][3].lost + extraMan[side][3].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">O.T.</div>
      <input autocomplete="off" class="field normal" type="number" bind:value={extraMan[side][4].won} />
      <input autocomplete="off" class="field normal" type="number" bind:value={extraMan[side][4].lost} />
      <div class="rowBox normal">{extraMan[side][4].won}/{extraMan[side][4].lost + extraMan[side][4].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal"></div>
      <div class="rowBox wide">TOTALS</div>
      <div class="rowBox normal">
        {extraMan[side].reduce((sum, clear) => sum + clear.won, 0)}/{extraMan[side].reduce((sum, clear) => sum + clear.won + clear.lost, 0)}
      </div>
    </div>
  </div>
</div>
