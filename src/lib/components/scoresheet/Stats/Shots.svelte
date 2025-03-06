<script lang="ts">
    import { homeShots } from "../data.svelte";
</script>

<div class="outer">
    <div class="headerBox">SHOTS</div>
    <div class="innerColumn">
        <div class="innerRow">
            <div class="rowBox">QTR 1</div>
            <input class="field" type="number" bind:value={homeShots[0]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input class="field" type="number" bind:value={homeShots[1]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input class="field" type="number" bind:value={homeShots[2]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
        <input class="field" type="number" bind:value={homeShots[3]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input class="field" type="number" bind:value={homeShots[4]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">TOTALS</div>
            <div class="rowBox">{homeShots[0] + homeShots[1] + homeShots[2] + homeShots[3] + homeShots[4]}</div>
        </div>        
    </div>
</div>