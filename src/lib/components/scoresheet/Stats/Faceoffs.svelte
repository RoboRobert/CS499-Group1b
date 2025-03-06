<script lang="ts">
    import { homeFaceoffs, awayFaceoffs } from "../data.svelte";
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
            <input class="field" type="number" bind:value={homeFaceoffs[0].won}>
            <input class="field" type="number" bind:value={homeFaceoffs[0].lost}>
            <div class="rowBox">{homeFaceoffs[0].won}/{homeFaceoffs[0].lost + homeFaceoffs[0].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input class="field" type="number" bind:value={homeFaceoffs[1].won}>
            <input class="field" type="number" bind:value={homeFaceoffs[1].lost}>
            <div class="rowBox">{homeFaceoffs[1].won}/{homeFaceoffs[1].lost + homeFaceoffs[1].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input class="field" type="number" bind:value={homeFaceoffs[2].won}>
            <input class="field" type="number" bind:value={homeFaceoffs[2].lost}>
            <div class="rowBox">{homeFaceoffs[2].won}/{homeFaceoffs[2].lost + homeFaceoffs[2].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
            <input class="field" type="number" bind:value={homeFaceoffs[3].won}>
            <input class="field" type="number" bind:value={homeFaceoffs[3].lost}>
            <div class="rowBox">{homeFaceoffs[3].won}/{homeFaceoffs[3].lost + homeFaceoffs[3].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input class="field" type="number" bind:value={homeFaceoffs[4].won}>
            <input class="field" type="number" bind:value={homeFaceoffs[4].lost}>
            <div class="rowBox">{homeFaceoffs[4].won}/{homeFaceoffs[4].lost + homeFaceoffs[4].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox"></div>
            <div class="rowBox" style="flex:2">TOTALS</div>
            <div class="rowBox">{homeFaceoffs.reduce((sum, clear) => sum + clear.won,0)}/{homeFaceoffs.reduce((sum, clear) => sum + clear.won + clear.lost,0)}</div>
        </div>
    </div>
</div>