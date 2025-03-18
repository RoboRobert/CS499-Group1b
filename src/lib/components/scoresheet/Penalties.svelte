<script lang="ts">
  let numPenalties = 18;

  // Only allows digits to be entered
  function allowDigits(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  }
</script>

<div class="outer">
  <div class="headerBox">PENALTIES/FOULS</div>
  <div class="headerRow">
    <div class="rowBox normal">P/T</div>
    <div class="rowBox normal">#</div>
    <div class="rowBox normal">INTERACTION</div>
    <div class="rowBox normal">QTR</div>
    <div class="rowBox normal">TIME</div>
  </div>

  {#each Array(numPenalties) as penalty}
    <div class="innerRow">
      <input autocomplete="off" class="field normal" type="text" />
      <input autocomplete="off" oninput={allowDigits} class="field normal" type="text" />
      <input autocomplete="off" class="field normal" type="text" />
      <input autocomplete="off" class="field normal" type="text" />
      <input autocomplete="off" class="field normal" type="text" />
    </div>
  {/each}
</div>
