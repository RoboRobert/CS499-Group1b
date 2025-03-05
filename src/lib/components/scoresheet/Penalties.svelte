<script lang="ts">
    let numPenalties = 18;

    // Only allows digits to be entered
    function allowDigits(event: any) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
</script>

<div class="outer">
    <div class="headerBox">PENALTIES/FOULS</div>
    <div class="headerRow">
        <div class="rowBox">P/T</div>
        <div class="rowBox">#</div>
        <div class="rowBox">Interaction</div>
        <div class="rowBox">QTR</div>
        <div class="rowBox">Time</div>
    </div>

    {#each Array(numPenalties) as penalty}
        <div class="innerRow">
            <input class="field" type="text">
            <input oninput={allowDigits} class="field" type="text">
            <input class="field" type="text">
            <input class="field" type="text">
            <input class="field" type="text">
        </div>
    {/each}
</div>