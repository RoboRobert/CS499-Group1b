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
            <div class="rowBox">QTR 1</div>
            <input autocomplete="off" class="field" type="number" bind:value={groundBalls[side][0]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input autocomplete="off" class="field" type="number" bind:value={groundBalls[side][1]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input autocomplete="off" class="field" type="number" bind:value={groundBalls[side][2]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
            <input autocomplete="off" class="field" type="number" bind:value={groundBalls[side][3]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input autocomplete="off" class="field" type="number" bind:value={groundBalls[side][4]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">TOTALS</div>
            <div class="rowBox">{groundBalls[side][0] + groundBalls[side][1] + groundBalls[side][2] + groundBalls[side][3] + groundBalls[side][4]}</div>
        </div>        
    </div>
</div>