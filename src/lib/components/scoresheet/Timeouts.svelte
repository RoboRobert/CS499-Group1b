<script lang="ts">
  import { timeouts } from "./data.svelte";
  import { readTime } from "./frontendChecker.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();
</script>

<div class="outer">
  <div class="headerBox">TIMEOUTS</div>
  <div class="innerRow">
    <div class="rowBox wide">FIRST HALF</div>
    <div class="rowBox wide">SECOND HALF</div>
    <div class="rowBox normal">1 O.T.</div>
    <div class="rowBox normal">2 O.T.</div>
  </div>

  <div class="innerRow">
    <input id="timeout-{side}-0" autocomplete="off" class="field time" type="text" value={timeouts[side][0].time} oninput={(e) => timeouts[side][0].time = readTime(e)} />
    <input id="timeout-{side}-1" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][0].period} />
    <input id="timeout-{side}-2" autocomplete="off" class="field time" type="text" value={timeouts[side][1].time} oninput={(e) => timeouts[side][1].time = readTime(e)} />
    <input id="timeout-{side}-3" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][1].period} />
    <input id="timeout-{side}-4" autocomplete="off" class="field time" type="text" value={timeouts[side][2].time} oninput={(e) => timeouts[side][2].time = readTime(e)} />
    <input id="timeout-{side}-5" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][2].period} />
    <input id="timeout-{side}-6" autocomplete="off" class="field time" type="text" value={timeouts[side][3].time} oninput={(e) => timeouts[side][3].time = readTime(e)} />
    <input id="timeout-{side}-7" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][3].period} />
    <input id="timeout-{side}-8" autocomplete="off" class="field normal" type="text" value={timeouts[side][4].time} oninput={(e) => timeouts[side][4].time = readTime(e)} />
    <input id="timeout-{side}-9" autocomplete="off" class="field normal" type="text" value={timeouts[side][5].time} oninput={(e) => timeouts[side][5].time = readTime(e)} />
  </div>
</div>

<style>
  .time {
    flex: 0.57;
  }

  .period {
    flex: 0.34;
  }
</style>