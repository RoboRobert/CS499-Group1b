<script lang="ts">
  import { goals } from "../data.svelte";
</script>

<div class="outer" style="width: 15%;">
  <div class="innerRow">
    <div class="innerColumn">
      <input autocomplete="off" class="field normal" type="number" placeholder="Q1" bind:value={goals[0][0]} />
      <input autocomplete="off" class="field normal" type="number" placeholder="Q1" bind:value={goals[1][0]} />
    </div>
    <div class="innerColumn">
      <input autocomplete="off" class="field normal" type="number" placeholder="Q2" bind:value={goals[0][1]} />
      <input autocomplete="off" class="field normal" type="number" placeholder="Q2" bind:value={goals[1][1]} />
    </div>
    <div class="innerColumn">
      <input autocomplete="off" class="field normal" type="number" placeholder="Q3" bind:value={goals[0][2]} />
      <input autocomplete="off" class="field normal" type="number" placeholder="Q3" bind:value={goals[1][2]} />
    </div>
    <div class="innerColumn">
      <input autocomplete="off" class="field normal" type="number" placeholder="Q4" bind:value={goals[0][3]} />
      <input autocomplete="off" class="field normal" type="number" placeholder="Q4" bind:value={goals[1][3]} />
    </div>
    <div class="innerColumn">
      <input autocomplete="off" class="field normal" type="number" placeholder="OT1" bind:value={goals[0][4]} />
      <input autocomplete="off" class="field normal" type="number" placeholder="OT1" bind:value={goals[1][4]} />
    </div>
    <div class="innerColumn">
      <input autocomplete="off" class="field normal" type="number" placeholder="OT2" bind:value={goals[0][5]} />
      <input autocomplete="off" class="field normal" type="number" placeholder="OT2" bind:value={goals[1][5]} />
    </div>
    <div class="innerColumn">
      <div class="rowBox normal">{goals[0].reduce((acc, current) => acc + current, 0)}</div>
      <div class="rowBox normal">{goals[1].reduce((acc, current) => acc + current, 0)}</div>
    </div>
  </div>
</div>
