<script lang="ts">
  import { readNumber, readPlayerno, readString, readTime } from "$lib/checkers/frontendChecker.svelte";
  import { penalties } from "./data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();
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
      <input id="penaltyTimeout-{side}-{i}" autocomplete="off" class="field normal" type="text" value={penalties[side][i].timeout} oninput={(e) => penalties[side][i].timeout = readTime(e)}/>
      <input id="penaltyNumber-{side}-{i}" min="0" max="99" autocomplete="off" class="field thin" type="number" bind:value={penalties[side][i].playerno} oninput={(e) => penalties[side][i].playerno = readPlayerno(e)}/>
      <select id="penaltyInfraction-{side}-{i}" class="dropdown normal" name="options" bind:value={penalties[side][i].infraction} autocomplete="off" oninput={(e) => readString(e)}>
        <option value=""></option>
        <option value="Holding">Holding</option>
        <option value="Tripping">Tripping</option>
        <option value="Slashing">Slashing</option>
        <option value="Off Sides">Off Sides</option>
        <option value="Cross Checking">Cross Checking</option>
      </select>
      <input id="penaltyQuarter-{side}-{i}" min="1" max="6" autocomplete="off" class="field thin" type="number" bind:value={penalties[side][i].quarter} oninput={(e) => penalties[side][i].quarter = readNumber(e)}/>
      <input id="penaltyTime-{side}-{i}" autocomplete="off" class="field normal" type="text" value={penalties[side][i].time} oninput={(e) => penalties[side][i].time = readTime(e)}/>
    </div>
  {/each}
</div>
