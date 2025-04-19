<script lang="ts">
  import { getShots } from "../data.svelte";

  interface Side {
    side: number;
  }

  let { side }: Side = $props();
</script>

<div class="outer">
  <div class="headerBox">SHOTS</div>
  <div class="innerColumn">
    <div class="innerRow">
      <div class="rowBox normal">QTR 1</div>
      <div class="rowBox normal">{getShots(side)[0]}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 2</div>
      <div class="rowBox normal">{getShots(side)[1]}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 3</div>
      <div class="rowBox normal">{getShots(side)[2]}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">QTR 4</div>
      <div class="rowBox normal">{getShots(side)[3]}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">O.T.</div>
      <div class="rowBox normal">{getShots(side)[4]}</div>
    </div>
    <div class="innerRow">
      <div class="rowBox normal">TOTALS</div>
      <div class="rowBox normal">{getShots(side).reduce((c,p)=>c+p,0)}</div>
    </div>
  </div>
</div>
