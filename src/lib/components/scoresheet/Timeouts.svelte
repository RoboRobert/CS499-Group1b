<script lang="ts">
  import { readTime } from "./checker.svelte";
  import { timeouts, type Time } from "./data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();

  function setTimeout(index, time: Time) {
    timeouts[side][index].minutes = time.minutes;
    timeouts[side][index].seconds = time.seconds;
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
    <input autocomplete="off" class="field time" type="text" oninput={(e) => setTimeout(0,readTime(e))} />
    <input autocomplete="off" class="field period" type="number" bind:value={timeouts[side][0].period} />
    <input autocomplete="off" class="field time" type="text" oninput={(e) => setTimeout(1,readTime(e))} />
    <input autocomplete="off" class="field period" type="number" bind:value={timeouts[side][1].period} />
    <input autocomplete="off" class="field time" type="text" oninput={(e) => setTimeout(2,readTime(e))} />
    <input autocomplete="off" class="field period" type="number" bind:value={timeouts[side][2].period} />
    <input autocomplete="off" class="field time" type="text" oninput={(e) => setTimeout(3,readTime(e))} />
    <input autocomplete="off" class="field period" type="number" bind:value={timeouts[side][3].period} />
    <input autocomplete="off" class="field normal" type="text" oninput={(e) => setTimeout(4,readTime(e))} />
    <input autocomplete="off" class="field normal" type="text" oninput={(e) => setTimeout(5,readTime(e))} />
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