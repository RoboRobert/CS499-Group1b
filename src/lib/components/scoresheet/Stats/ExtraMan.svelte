<script lang="ts">
    import { extraMan } from "../data.svelte";

    interface Side {
        side:number;
    }

    let {side}: Side = $props();
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
            <input autocomplete="off" class="field" type="number" bind:value={extraMan[side][0].won}>
            <input autocomplete="off" class="field" type="number" bind:value={extraMan[side][0].lost}>
            <div class="rowBox">{extraMan[side][0].won}/{extraMan[side][0].lost + extraMan[side][0].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input autocomplete="off" class="field" type="number" bind:value={extraMan[side][1].won}>
            <input autocomplete="off" class="field" type="number" bind:value={extraMan[side][1].lost}>
            <div class="rowBox">{extraMan[side][1].won}/{extraMan[side][1].lost + extraMan[side][1].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input autocomplete="off" class="field" type="number" bind:value={extraMan[side][2].won}>
            <input autocomplete="off" class="field" type="number" bind:value={extraMan[side][2].lost}>
            <div class="rowBox">{extraMan[side][2].won}/{extraMan[side][2].lost + extraMan[side][2].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
            <input autocomplete="off" class="field" type="number" bind:value={extraMan[side][3].won}>
            <input autocomplete="off" class="field" type="number" bind:value={extraMan[side][3].lost}>
            <div class="rowBox">{extraMan[side][3].won}/{extraMan[side][3].lost + extraMan[side][3].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input autocomplete="off" class="field" type="number" bind:value={extraMan[side][4].won}>
            <input autocomplete="off" class="field" type="number" bind:value={extraMan[side][4].lost}>
            <div class="rowBox">{extraMan[side][4].won}/{extraMan[side][4].lost + extraMan[side][4].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox"></div>
            <div class="rowBox" style="flex:2">TOTALS</div>
            <div class="rowBox">{extraMan[side].reduce((sum, clear) => sum + clear.won,0)}/{extraMan[side].reduce((sum, clear) => sum + clear.won + clear.lost,0)}</div>
        </div>
    </div>
</div>
