<script lang="ts">
    import { homeGroundBalls } from "../data.svelte";
</script>

<div class="outer">
    <div class="headerBox">GROUND BALLS</div>
    <div class="innerColumn">
        <div class="innerRow">
            <div class="rowBox">QTR 1</div>
            <input class="field" type="number" bind:value={homeGroundBalls[0]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input class="field" type="number" bind:value={homeGroundBalls[1]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input class="field" type="number" bind:value={homeGroundBalls[2]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
        <input class="field" type="number" bind:value={homeGroundBalls[3]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input class="field" type="number" bind:value={homeGroundBalls[4]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">TOTALS</div>
            <div class="rowBox">{homeGroundBalls[0] + homeGroundBalls[1] + homeGroundBalls[2] + homeGroundBalls[3] + homeGroundBalls[4]}</div>
        </div>        
    </div>
</div>