<script lang="ts">
    import { groundBalls } from "../data.svelte";

    interface Side {
        side:number;
    }

    let {side}: Side = $props();
</script>

<div class="outer">
    <div class="headerBox">GROUND BALLS</div>
    <div class="innerColumn">
        <div class="innerRow">
            <div class="rowBox normal">QTR 1</div>
            <input id="groundBalls-{side}-0" min="0" autocomplete="off" class="field normal" type="number" bind:value={groundBalls[side][0]}>
        </div>
        <div class="innerRow">
            <div class="rowBox normal">QTR 2</div>
            <input id="groundBalls-{side}-1" min="0" autocomplete="off" class="field normal" type="number" bind:value={groundBalls[side][1]}>
        </div>
        <div class="innerRow">
            <div class="rowBox normal">QTR 3</div>
            <input id="groundBalls-{side}-2" min="0" autocomplete="off" class="field normal" type="number" bind:value={groundBalls[side][2]}>
        </div>
        <div class="innerRow">
            <div class="rowBox normal">QTR 4</div>
            <input id="groundBalls-{side}-3" min="0" autocomplete="off" class="field normal" type="number" bind:value={groundBalls[side][3]}>
        </div>
        <div class="innerRow">
            <div class="rowBox normal">O.T.</div>
            <input id="groundBalls-{side}-4" min="0" autocomplete="off" class="field normal" type="number" bind:value={groundBalls[side][4]}>
        </div>
        <div class="innerRow">
            <div class="rowBox normal">TOTALS</div>
            <div class="rowBox normal">{groundBalls[side][0] + groundBalls[side][1] + groundBalls[side][2] + groundBalls[side][3] + groundBalls[side][4]}</div>
        </div>        
    </div>
</div>