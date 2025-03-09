<script lang="ts">
    import { timeouts } from "./data.svelte";

    interface Side {
        side:number;
    }

    let {side}: Side = $props();
</script>

<div class="outer">
    <div class="headerBox">TIMEOUTS</div>
    <div class="innerRow">
        <div class="rowBox">First Half</div>
        <div class="rowBox">Second Half</div>
        <div class="rowBox">1 O.T.</div>
        <div class="rowBox">2 O.T.</div>
    </div>

    <div class="innerRow">
        <input class="field" type="text" bind:value={timeouts[side][0].minutes}/>
        <input class="field" type="text" bind:value={timeouts[side][0].period}/>
        <input class="field" type="text" bind:value={timeouts[side][1].minutes}/>
        <input class="field" type="text" bind:value={timeouts[side][1].period}/>
        <input class="field" type="text" bind:value={timeouts[side][2].minutes}/>
        <input class="field" type="text" bind:value={timeouts[side][2].period}/>
        <input class="field" type="text" bind:value={timeouts[side][3].minutes}/>
        <input class="field" type="text" bind:value={timeouts[side][3].period}/>
    </div>
</div>
