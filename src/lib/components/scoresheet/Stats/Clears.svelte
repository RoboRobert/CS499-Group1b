<script lang="ts">
    import { homeClears, awayClears } from "../data.svelte";
</script>

<div class="outer">
    <div class="headerBox">CLEARS</div>
    <div class="innerColumn">
        <div class="headerRow">
            <div class="rowBox"> </div>
            <div class="rowBox">CLEARED</div>
            <div class="rowBox">FAILED</div>
            <div class="rowBox"> </div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 1</div>
            <input class="field" type="number" bind:value={homeClears[0].won}>
            <input class="field" type="number" bind:value={homeClears[0].lost}>
            <div class="rowBox">{homeClears[0].won}/{homeClears[0].lost + homeClears[0].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input class="field" type="number" bind:value={homeClears[1].won}>
            <input class="field" type="number" bind:value={homeClears[1].lost}>
            <div class="rowBox">{homeClears[1].won}/{homeClears[1].lost + homeClears[1].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input class="field" type="number" bind:value={homeClears[2].won}>
            <input class="field" type="number" bind:value={homeClears[2].lost}>
            <div class="rowBox">{homeClears[2].won}/{homeClears[2].lost + homeClears[2].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
            <input class="field" type="number" bind:value={homeClears[3].won}>
            <input class="field" type="number" bind:value={homeClears[3].lost}>
            <div class="rowBox">{homeClears[3].won}/{homeClears[3].lost + homeClears[3].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input class="field" type="number" bind:value={homeClears[4].won}>
            <input class="field" type="number" bind:value={homeClears[4].lost}>
            <div class="rowBox">{homeClears[4].won}/{homeClears[4].lost + homeClears[4].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox"></div>
            <div class="rowBox" style="flex:2">TOTALS</div>
            <div class="rowBox">{homeClears.reduce((sum, clear) => sum + clear.won,0)}/{homeClears.reduce((sum, clear) => sum + clear.won + clear.lost,0)}</div>
        </div>
    </div>
</div>