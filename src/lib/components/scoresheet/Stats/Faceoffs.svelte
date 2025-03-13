<script lang="ts">
    import { faceoffs } from "../data.svelte";

    interface Side {
        side:number;
    }

    let {side}: Side = $props();
</script>

<div class="outer">
    <div class="headerBox">FACEOFFS</div>
    <div class="innerColumn">
        <div class="headerRow">
            <div class="rowBox"> </div>
            <div class="rowBox">WON</div>
            <div class="rowBox">LOST</div>
            <div class="rowBox"> </div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 1</div>
            <input autocomplete="off" class="field" type="number" bind:value={faceoffs[side][0].won}>
            <input autocomplete="off" class="field" type="number" bind:value={faceoffs[side][0].lost}>
            <div class="rowBox">{faceoffs[side][0].won}/{faceoffs[side][0].lost + faceoffs[side][0].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input autocomplete="off" class="field" type="number" bind:value={faceoffs[side][1].won}>
            <input autocomplete="off" class="field" type="number" bind:value={faceoffs[side][1].lost}>
            <div class="rowBox">{faceoffs[side][1].won}/{faceoffs[side][1].lost + faceoffs[side][1].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input autocomplete="off" class="field" type="number" bind:value={faceoffs[side][2].won}>
            <input autocomplete="off" class="field" type="number" bind:value={faceoffs[side][2].lost}>
            <div class="rowBox">{faceoffs[side][2].won}/{faceoffs[side][2].lost + faceoffs[side][2].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
            <input autocomplete="off" class="field" type="number" bind:value={faceoffs[side][3].won}>
            <input autocomplete="off" class="field" type="number" bind:value={faceoffs[side][3].lost}>
            <div class="rowBox">{faceoffs[side][3].won}/{faceoffs[side][3].lost + faceoffs[side][3].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input autocomplete="off" class="field" type="number" bind:value={faceoffs[side][4].won}>
            <input autocomplete="off" class="field" type="number" bind:value={faceoffs[side][4].lost}>
            <div class="rowBox">{faceoffs[side][4].won}/{faceoffs[side][4].lost + faceoffs[side][4].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox"></div>
            <div class="rowBox" style="flex:2">TOTALS</div>
            <div class="rowBox">{faceoffs[side].reduce((sum, clear) => sum + clear.won,0)}/{faceoffs[side].reduce((sum, clear) => sum + clear.won + clear.lost,0)}</div>
        </div>
    </div>
</div>