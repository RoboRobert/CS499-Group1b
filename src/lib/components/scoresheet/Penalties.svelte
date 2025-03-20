<script lang="ts">
  import { readTime } from "./checker.svelte";
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
    <div class="rowBox normal">INTERACTION</div>
    <div class="rowBox thin">QTR</div>
    <div class="rowBox normal">TIME</div>
  </div>

  {#each penalties[side] as penalty, i}
    <div class="innerRow">
      <input autocomplete="off" class="field normal" type="text" oninput={(e) => penalties[side][i].timeout = readTime(e)}/>
      <input autocomplete="off" class="field thin" type="number" bind:value={penalties[side][i].playerno}/>
      <input autocomplete="off" class="field normal" type="text" bind:value={penalties[side][i].interaction}/>
      <input autocomplete="off" class="field thin" type="number" bind:value={penalties[side][i].quarter}/>
      <input autocomplete="off" class="field normal" type="text" oninput={(e) => penalties[side][i].time = readTime(e)}/>
    </div>
  {/each}
</div>
