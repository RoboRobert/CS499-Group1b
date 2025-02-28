<script lang="ts">
    let numScores = 12;

    // Only allows digits to be entered
    function allowDigits(event: any) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
</script>

<div class="outer">
    <div class="headerBox">INDIVIDUAL SCORING</div>
    <div class="teamHeader">
        <div class="headerBox">#</div>
        <div class="headerBox">Name</div>
        <div class="headerBox">G</div>
        <div class="headerBox">A</div>
        <div class="headerBox">P</div>
    </div>

    {#each Array(numScores) as penalty}
        <div class="penalty">
            <input oninput={allowDigits} class="field" type="text">
            <input class="field" type="text" />
            <input class="field" type="text" />
            <input class="field" type="text" />
            <input class="field" type="text" />
        </div>
    {/each}
</div>

<style>
    .teamHeader {
        display: flex;
        flex-direction: row;
        border: 1px solid black;
    }

    .headerBox {
        flex: 1;
        text-align: center;
        border: 1px solid black;
        box-sizing: border-box;
    }
    .outer {
        border: 1px solid black;
        resize: horizontal;
        overflow: hidden;
        max-width: 100%;
        margin-bottom:10px;
    }

    .penalty {
        display: flex;
        flex-direction: row;
        border: 1px solid black;
    }

    .field {
        box-sizing: border-box;
        text-align: center;
        flex: 1;
        min-width: 0;
        max-height: 50px;
        min-height: 20px;
    }
</style>
