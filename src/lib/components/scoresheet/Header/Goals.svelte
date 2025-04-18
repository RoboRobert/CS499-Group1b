<script lang="ts">
  import { getGoals } from "../data.svelte";

</script>

<div class="outer" style="width: 15%;">
  <div class="innerRow">
    <div class="innerColumn">
      <div class="rowBox normal">{getGoals(0)[0]}</div>
      <div class="goal-label">QTR 1</div>
      <div class="rowBox normal">{getGoals(1)[0]}</div>
    </div>
    <div class="innerColumn">
      <div class="rowBox normal">{getGoals(0)[1]}</div>
      <div class="goal-label">QTR 2</div>
      <div class="rowBox normal">{getGoals(1)[1]}</div>
    </div>
    <div class="innerColumn">
      <div class="rowBox normal">{getGoals(0)[2]}</div>
      <div class="goal-label">QTR 3</div>
      <div class="rowBox normal">{getGoals(1)[2]}</div>
    </div>
    <div class="innerColumn">
      <div class="rowBox normal">{getGoals(0)[3]}</div>
      <div class="goal-label">QTR 4</div>
      <div class="rowBox normal">{getGoals(1)[3]}</div>
    </div>
    <div class="innerColumn">
      <div class="rowBox normal">{getGoals(0)[4]}</div>
      <div class="goal-label">O.T.</div>
      <div class="rowBox normal">{getGoals(1)[4]}</div>
    </div>
    <!-- <div class="innerColumn">
      <input min="0" max="99" autocomplete="off" class="field normal" type="number" placeholder="OT2" bind:value={goals[0][5]} />
      <div class="goal-label">O.T. 2</div>
      <input min="0" max="99" autocomplete="off" class="field normal" type="number" placeholder="OT2" bind:value={goals[1][5]} />
    </div> -->
    <div class="innerColumn">
      <div class="rowBox normal">{getGoals(0).reduce((c,p)=>c+p)}</div>
      <div class="goal-label">TOTAL</div>
      <div class="rowBox normal">{getGoals(1).reduce((c,p)=>c+p)}</div>
    </div>
  </div>
</div>