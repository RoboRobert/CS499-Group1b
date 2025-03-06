<script lang="ts">
    import { shots } from "../data.svelte";

    interface Side {
        side:number;
    }

    let {side}: Side = $props();
</script>

<div class="outer">
    <div class="headerBox">SHOTS</div>
    <div class="innerColumn">
        <div class="innerRow">
            <div class="rowBox">QTR 1</div>
            <input class="field" type="number" bind:value={shots[side][0]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input class="field" type="number" bind:value={shots[side][1]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input class="field" type="number" bind:value={shots[side][2]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
        <input class="field" type="number" bind:value={shots[side][3]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input class="field" type="number" bind:value={shots[side][4]}>
        </div>
        <div class="innerRow">
            <div class="rowBox">TOTALS</div>
            <div class="rowBox">{shots[side][0] + shots[side][1] + shots[side][2] + shots[side][3] + shots[side][4]}</div>
        </div>        
    </div>
</div>