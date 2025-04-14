<script lang="ts">
  import { readNumber } from "$lib/checkers/frontendChecker.svelte";
  import { shots } from "../data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();
</script>

<div class="outer">
  <div class="headerBox">SHOTS</div>
  <div class="innerColumn">
    <div class="innerRow">
      <div class="rowBox normal">QTR 1</div>
      <input id="shots-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={shots[side][0]} oninput={(e) => shots[side][0] = readNumber(e)}/>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 2</div>
      <input id="shots-{side}-1" min="0" autocomplete="off" class="field normal" type="number" bind:value={shots[side][1]} oninput={(e) => shots[side][1] = readNumber(e)}/>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 3</div>
      <input id="shots-{side}-2" min="0" autocomplete="off" class="field normal" type="number" bind:value={shots[side][2]} oninput={(e) => shots[side][2] = readNumber(e)}/>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 4</div>
      <input id="shots-{side}-3" min="0" autocomplete="off" class="field normal" type="number" bind:value={shots[side][3]} oninput={(e) => shots[side][3] = readNumber(e)}/>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">O.T.</div>
      <input id="shots-{side}-4" min="0" autocomplete="off" class="field normal" type="number" bind:value={shots[side][4]} oninput={(e) => shots[side][4] = readNumber(e)}/>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">TOTALS</div>
      <div class="rowBox normal">{shots[side][0] + shots[side][1] + shots[side][2] + shots[side][3] + shots[side][4]}</div>
    </div>
  </div>
</div>
