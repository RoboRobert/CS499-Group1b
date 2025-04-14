<script lang="ts">
  import { readNumber } from "$lib/checkers/frontendChecker.svelte";
  import { faceoffs } from "../data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();
</script>

<div class="outer">
  <div class="headerBox">FACEOFFS</div>
  <div class="innerColumn">
    <div class="headerRow">
      <div class="rowBox normal"></div>
      <div class="rowBox normal">WON</div>
      <div class="rowBox normal">LOST</div>
      <div class="rowBox normal"></div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 1</div>
      <input id="faceoffsWon-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={faceoffs[side][0].won} oninput={(e) => faceoffs[side][0].won = readNumber(e)}/>
      <input id="faceoffsLost-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={faceoffs[side][0].lost} oninput={(e) => faceoffs[side][0].lost = readNumber(e)}/>
      <div class="rowBox normal">{faceoffs[side][0].won}/{faceoffs[side][0].lost + faceoffs[side][0].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 2</div>
      <input id="faceoffsWon-{side}-1" min="0" autocomplete="off" class="field normal" type="number" bind:value={faceoffs[side][1].won} oninput={(e) => faceoffs[side][1].won = readNumber(e)}/>
      <input id="faceoffsLost-{side}-1" min="0" autocomplete="off" class="field normal" type="number" bind:value={faceoffs[side][1].lost} oninput={(e) => faceoffs[side][1].lost = readNumber(e)}/>
      <div class="rowBox normal">{faceoffs[side][1].won}/{faceoffs[side][1].lost + faceoffs[side][1].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 3</div>
      <input id="faceoffsWon-{side}-2" min="0" autocomplete="off" class="field normal" type="number" bind:value={faceoffs[side][2].won} oninput={(e) => faceoffs[side][2].won = readNumber(e)}/>
      <input id="faceoffsLost-{side}-2" min="0" autocomplete="off" class="field normal" type="number" bind:value={faceoffs[side][2].lost} oninput={(e) => faceoffs[side][2].lost = readNumber(e)}/>
      <div class="rowBox normal">{faceoffs[side][2].won}/{faceoffs[side][2].lost + faceoffs[side][2].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 4</div>
      <input id="faceoffsWon-{side}-3" min="0" autocomplete="off" class="field normal" type="number" bind:value={faceoffs[side][3].won} oninput={(e) => faceoffs[side][3].won = readNumber(e)}/>
      <input id="faceoffsLost-{side}-3" min="0" autocomplete="off" class="field normal" type="number" bind:value={faceoffs[side][3].lost} oninput={(e) => faceoffs[side][3].lost = readNumber(e)}/>
      <div class="rowBox normal">{faceoffs[side][3].won}/{faceoffs[side][3].lost + faceoffs[side][3].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">O.T.</div>
      <input id="faceoffsWon-{side}-4" min="0" autocomplete="off" class="field normal" type="number" bind:value={faceoffs[side][4].won} oninput={(e) => faceoffs[side][4].won = readNumber(e)}/>
      <input id="faceoffsLost-{side}-4" min="0" autocomplete="off" class="field normal" type="number" bind:value={faceoffs[side][4].lost} oninput={(e) => faceoffs[side][4].lost = readNumber(e)}/>
      <div class="rowBox normal">{faceoffs[side][4].won}/{faceoffs[side][4].lost + faceoffs[side][4].won}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal"></div>
      <div class="rowBox wide">TOTALS</div>
      <div class="rowBox normal">
        {faceoffs[side].reduce((sum, clear) => sum + clear.won, 0)}/{faceoffs[side].reduce((sum, clear) => sum + clear.won + clear.lost, 0)}
      </div>
    </div>
  </div>
</div>
