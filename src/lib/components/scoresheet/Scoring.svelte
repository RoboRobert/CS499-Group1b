<script lang="ts">
    let numScores = 12;

    // Only allows digits to be entered
    function allowDigits(event: any) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
</script>

<div class="outer">
    <div class="headerBox">INDIVIDUAL SCORING</div>
    <div class="headerRow">
        <div class="rowBox">#</div>
        <div class="rowBox">Name</div>
        <div class="rowBox">G</div>
        <div class="rowBox">A</div>
        <div class="rowBox">P</div>
    </div>

    {#each Array(numScores) as penalty}
        <div class="innerRow">
            <input oninput={allowDigits} class="field" type="text">
            <input class="field" type="text" />
            <input class="field" type="text" />
            <input class="field" type="text" />
            <input class="field" type="text" />
        </div>
    {/each}
</div>
