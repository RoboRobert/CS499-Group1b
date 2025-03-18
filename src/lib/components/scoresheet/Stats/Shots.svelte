<script lang="ts">
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
      <input autocomplete="off" class="field normal" type="number" bind:value={shots[side][0]} />
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 2</div>
      <input autocomplete="off" class="field normal" type="number" bind:value={shots[side][1]} />
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 3</div>
      <input autocomplete="off" class="field normal" type="number" bind:value={shots[side][2]} />
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 4</div>
      <input autocomplete="off" class="field normal" type="number" bind:value={shots[side][3]} />
    </div>
    <div class="innerRow">
      <div class="rowBox normal">O.T.</div>
      <input autocomplete="off" class="field normal" type="number" bind:value={shots[side][4]} />
    </div>
    <div class="innerRow">
      <div class="rowBox normal">TOTALS</div>
      <div class="rowBox normal">{shots[side][0] + shots[side][1] + shots[side][2] + shots[side][3] + shots[side][4]}</div>
    </div>
  </div>
</div>
