<script lang="ts">
  import { readTime } from "./frontendChecker.svelte";
  import { penalties, toTimeString } from "./data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();

  function getTime(index): string {
    return toTimeString(penalties[side][index].time);
  }

  function getTimeout(index): string {
    return toTimeString(penalties[side][index].timeout);
  }
</script>

<div class="outer">
  <div class="headerBox">PENALTIES/FOULS</div>
  <div class="headerRow">
    <div class="rowBox normal">P/T</div>
    <div class="rowBox thin">#</div>
    <div class="rowBox normal">INFRACTION</div>
    <div class="rowBox thin">QTR</div>
    <div class="rowBox normal">TIME</div>
  </div>

  {#each penalties[side] as penalty, i}
    <div class="innerRow">
      <input id="penaltyTimeout-{side}-{i}" autocomplete="off" class="field normal" type="text" value={getTimeout(i)} oninput={(e) => penalties[side][i].timeout = readTime(e)}/>
      <input id="penaltyNumber-{side}-{i}" min="0" max="99" autocomplete="off" class="field thin" type="number" bind:value={penalties[side][i].playerno}/>
      <input id="penaltyInfraction-{side}-{i}" autocomplete="off" class="field normal" type="text" bind:value={penalties[side][i].infraction}/>
      <input id="penaltyQuarter-{side}-{i}" min="1" max="6" autocomplete="off" class="field thin" type="number" bind:value={penalties[side][i].quarter}/>
      <input id="penaltyTime-{side}-{i}" autocomplete="off" class="field normal" type="text" value={getTime(i)} oninput={(e) => penalties[side][i].time = readTime(e)}/>
    </div>
  {/each}
</div>
