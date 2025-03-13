<script lang="ts">
    import { clears } from "../data.svelte";

    interface Side {
        side:number;
    }

    let {side}: Side = $props();
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
            <input autocomplete="off" class="field" type="number" bind:value={clears[side][0].won}>
            <input autocomplete="off" class="field" type="number" bind:value={clears[side][0].lost}>
            <div class="rowBox">{clears[side][0].won}/{clears[side][0].lost + clears[side][0].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input autocomplete="off" class="field" type="number" bind:value={clears[side][1].won}>
            <input autocomplete="off" class="field" type="number" bind:value={clears[side][1].lost}>
            <div class="rowBox">{clears[side][1].won}/{clears[side][1].lost + clears[side][1].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input autocomplete="off" class="field" type="number" bind:value={clears[side][2].won}>
            <input autocomplete="off" class="field" type="number" bind:value={clears[side][2].lost}>
            <div class="rowBox">{clears[side][2].won}/{clears[side][2].lost + clears[side][2].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
            <input autocomplete="off" class="field" type="number" bind:value={clears[side][3].won}>
            <input autocomplete="off" class="field" type="number" bind:value={clears[side][3].lost}>
            <div class="rowBox">{clears[side][3].won}/{clears[side][3].lost + clears[side][3].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input autocomplete="off" class="field" type="number" bind:value={clears[side][4].won}>
            <input autocomplete="off" class="field" type="number" bind:value={clears[side][4].lost}>
            <div class="rowBox">{clears[side][4].won}/{clears[side][4].lost + clears[side][4].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox"></div>
            <div class="rowBox" style="flex:2">TOTALS</div>
            <div class="rowBox">{clears[side].reduce((sum, clear) => sum + clear.won,0)}/{clears[side].reduce((sum, clear) => sum + clear.won + clear.lost,0)}</div>
        </div>
    </div>
</div>