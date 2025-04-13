<script lang="ts">
  import { readNumber } from "$lib/checkers/frontendChecker.svelte";
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
      <input id="clearsWon-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][0].won} oninput={(e) => clears[side][0].won = readNumber(e)}/>
      <input id="clearsLost-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][0].lost} oninput={(e) => clears[side][0].lost = readNumber(e)}/>
      <div class="rowBox normal">{clears[side][0].won}/{clears[side][0].lost + clears[side][0].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 2</div>
      <input id="clearsWon-{side}-1" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][1].won} oninput={(e) => clears[side][1].won = readNumber(e)}/>
      <input id="clearsLost-{side}-1" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][1].lost} oninput={(e) => clears[side][1].lost = readNumber(e)}/>
      <div class="rowBox normal">{clears[side][1].won}/{clears[side][1].lost + clears[side][1].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 3</div>
      <input id="clearsWon-{side}-2" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][2].won} oninput={(e) => clears[side][2].won = readNumber(e)}/>
      <input id="clearsLost-{side}-2" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][2].lost} oninput={(e) => clears[side][2].lost = readNumber(e)}/>
      <div class="rowBox normal">{clears[side][2].won}/{clears[side][2].lost + clears[side][2].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 4</div>
      <input id="clearsWon-{side}-3" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][3].won} oninput={(e) => clears[side][3].won = readNumber(e)}/>
      <input id="clearsLost-{side}-3" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][3].lost} oninput={(e) => clears[side][3].lost = readNumber(e)}/>
      <div class="rowBox normal">{clears[side][3].won}/{clears[side][3].lost + clears[side][3].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">O.T.</div>
      <input id="clearsWon-{side}-4" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][4].won} oninput={(e) => clears[side][4].won = readNumber(e)}/>
      <input id="clearsLost-{side}-4" min="0" autocomplete="off" class="field normal" type="number" bind:value={clears[side][4].lost} oninput={(e) => clears[side][4].lost = readNumber(e)}/>
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
