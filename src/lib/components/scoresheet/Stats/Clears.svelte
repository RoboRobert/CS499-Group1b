<script lang="ts">
  import { clears } from "../data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();
</script>

<div class="outer">
  <div class="headerBox">CLEARS</div>
  <div class="innerColumn">
    <div class="headerRow">
      <div class="rowBox normal"></div>
      <div class="rowBox normal">CLEARED</div>
      <div class="rowBox normal">FAILED</div>
      <div class="rowBox normal"></div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 1</div>
      <input id="clearsWon-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][0].won} />
      <input id="clearsLost-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][0].lost} />
      <div class="rowBox normal">{clears[side][0].won}/{clears[side][0].lost + clears[side][0].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 2</div>
      <input id="clearsWon-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][1].won} />
      <input id="clearsLost-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][1].lost} />
      <div class="rowBox normal">{clears[side][1].won}/{clears[side][1].lost + clears[side][1].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 3</div>
      <input id="clearsWon-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][2].won} />
      <input id="clearsLost-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][2].lost} />
      <div class="rowBox normal">{clears[side][2].won}/{clears[side][2].lost + clears[side][2].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 4</div>
      <input id="clearsWon-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][3].won} />
      <input id="clearsLost-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][3].lost} />
      <div class="rowBox normal">{clears[side][3].won}/{clears[side][3].lost + clears[side][3].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">O.T.</div>
      <input id="clearsWon-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][4].won} />
      <input id="clearsLost-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][4].lost} />
      <div class="rowBox normal">{clears[side][4].won}/{clears[side][4].lost + clears[side][4].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal"></div>
      <div class="rowBox wide">TOTALS</div>
      <div class="rowBox normal">
        {clears[side].reduce((sum, clear) => sum + clear.won, 0)}/{clears[side].reduce((sum, clear) => sum + clear.won + clear.lost, 0)}
      </div>
    </div>
  </div>
</div>
