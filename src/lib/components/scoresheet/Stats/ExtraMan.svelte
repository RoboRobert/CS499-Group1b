<script lang="ts">
    import { homeExtra, awayExtra } from "../data.svelte";
</script>

<div class="outer">
    <div class="headerBox">EXTRA MAN</div>
    <div class="innerColumn">
        <div class="headerRow">
            <div class="rowBox"> </div>
            <div class="rowBox">SCORED</div>
            <div class="rowBox">FAILED</div>
            <div class="rowBox"> </div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 1</div>
            <input class="field" type="number" bind:value={homeExtra[0].won}>
            <input class="field" type="number" bind:value={homeExtra[0].lost}>
            <div class="rowBox">{homeExtra[0].won}/{homeExtra[0].lost + homeExtra[0].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input class="field" type="number" bind:value={homeExtra[1].won}>
            <input class="field" type="number" bind:value={homeExtra[1].lost}>
            <div class="rowBox">{homeExtra[1].won}/{homeExtra[1].lost + homeExtra[1].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input class="field" type="number" bind:value={homeExtra[2].won}>
            <input class="field" type="number" bind:value={homeExtra[2].lost}>
            <div class="rowBox">{homeExtra[2].won}/{homeExtra[2].lost + homeExtra[2].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
            <input class="field" type="number" bind:value={homeExtra[3].won}>
            <input class="field" type="number" bind:value={homeExtra[3].lost}>
            <div class="rowBox">{homeExtra[3].won}/{homeExtra[3].lost + homeExtra[3].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input class="field" type="number" bind:value={homeExtra[4].won}>
            <input class="field" type="number" bind:value={homeExtra[4].lost}>
            <div class="rowBox">{homeExtra[4].won}/{homeExtra[4].lost + homeExtra[4].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox"></div>
            <div class="rowBox" style="flex:2">TOTALS</div>
            <div class="rowBox">{homeExtra.reduce((sum, clear) => sum + clear.won,0)}/{homeExtra.reduce((sum, clear) => sum + clear.won + clear.lost,0)}</div>
        </div>
    </div>
</div>
