<script lang="ts">
  import { readNumber, readTime } from "$lib/checkers/frontendChecker.svelte";
  import { timeouts } from "./data.svelte";

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
    <input id="timeoutTime-{side}-0" autocomplete="off" class="field time" type="text" value={timeouts[side][0].time} oninput={(e) => timeouts[side][0].time = readTime(e)} />
    <input id="timeoutPeriod-{side}-0" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][0].period} oninput={(e) => timeouts[side][0].period = readNumber(e)} />
    <input id="timeoutTime-{side}-1" autocomplete="off" class="field time" type="text" value={timeouts[side][1].time} oninput={(e) => timeouts[side][1].time = readTime(e)} />
    <input id="timeoutPeriod-{side}-1" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][1].period} oninput={(e) => timeouts[side][1].period = readNumber(e)}/>
    <input id="timeoutTime-{side}-2" autocomplete="off" class="field time" type="text" value={timeouts[side][2].time} oninput={(e) => timeouts[side][2].time = readTime(e)} />
    <input id="timeoutPeriod-{side}-2" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][2].period} oninput={(e) => timeouts[side][2].period = readNumber(e)}/>
    <input id="timeoutTime-{side}-3" autocomplete="off" class="field time" type="text" value={timeouts[side][3].time} oninput={(e) => timeouts[side][3].time = readTime(e)} />
    <input id="timeoutPeriod-{side}-3" min="0" autocomplete="off" class="field period" type="number" bind:value={timeouts[side][3].period} oninput={(e) => timeouts[side][3].period = readNumber(e)}/>
    <input id="timeoutTime-{side}-4" autocomplete="off" class="field normal" type="text" value={timeouts[side][4].time} oninput={(e) => timeouts[side][4].time = readTime(e)} />
    <input id="timeoutTime-{side}-5" autocomplete="off" class="field normal" type="text" value={timeouts[side][5].time} oninput={(e) => timeouts[side][5].time = readTime(e)} />
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