<script lang="ts">
  import { timeouts } from "./data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();
</script>

<div class="outer">
  <div class="headerBox">TIMEOUTS</div>
  <div class="innerRow">
    <div class="rowBox normal">FIRST HALF</div>
    <div class="rowBox normal">SECOND HALF</div>
    <div class="rowBox thin">1 O.T.</div>
    <div class="rowBox thin">2 O.T.</div>
  </div>

  <div class="innerRow">
    <input autocomplete="off" class="field normal" type="text" bind:value={timeouts[side][0].minutes} />
    <input autocomplete="off" class="field normal" type="text" bind:value={timeouts[side][0].period} />
    <input autocomplete="off" class="field normal" type="text" bind:value={timeouts[side][1].minutes} />
    <input autocomplete="off" class="field normal" type="text" bind:value={timeouts[side][1].period} />
    <input autocomplete="off" class="field normal" type="text" bind:value={timeouts[side][2].minutes} />
    <input autocomplete="off" class="field normal" type="text" bind:value={timeouts[side][2].period} />
  </div>
</div>
