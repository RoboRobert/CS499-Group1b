<script lang="ts">
  import { readTime } from "./frontendChecker.svelte";
  import { timeouts, toTimeString, type Time } from "./data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();

  function setTimeout(index, time: Time) {
    timeouts[side][index].time = time;
  }

  function getTimeout(index): string {
    return toTimeString(timeouts[side][index].time);
  }
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
    <input id="timeout-{side}-0" autocomplete="off" class="field time" type="text" value={getTimeout(0)} oninput={(e) => setTimeout(0,readTime(e))} />
    <input id="timeout-{side}-1" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][0].period} />
    <input id="timeout-{side}-2" autocomplete="off" class="field time" type="text" value={getTimeout(1)} oninput={(e) => setTimeout(1,readTime(e))} />
    <input id="timeout-{side}-3" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][1].period} />
    <input id="timeout-{side}-4" autocomplete="off" class="field time" type="text" value={getTimeout(2)} oninput={(e) => setTimeout(2,readTime(e))} />
    <input id="timeout-{side}-5" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][2].period} />
    <input id="timeout-{side}-6" autocomplete="off" class="field time" type="text" value={getTimeout(3)} oninput={(e) => setTimeout(3,readTime(e))} />
    <input id="timeout-{side}-7" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][3].period} />
    <input id="timeout-{side}-8" autocomplete="off" class="field normal" type="text" value={getTimeout(4)} oninput={(e) => setTimeout(4,readTime(e))} />
    <input id="timeout-{side}-9" autocomplete="off" class="field normal" type="text" value={getTimeout(5)} oninput={(e) => setTimeout(5,readTime(e))} />
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