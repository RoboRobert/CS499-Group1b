<script lang="ts">
    import { getPlayerMap } from "./data.svelte";

    interface Side {
        side:number,
    }

    let {side}: Side = $props();
</script>

<div class="outer">
    <div class="headerBox">INDIVIDUAL SCORING</div>
    <div class="headerRow">
        <div class="rowBox">#</div>
        <div class="rowBox">Name</div>
        <div class="rowBox">G</div>
        <div class="rowBox">A</div>
        <div class="rowBox">P</div>
    </div>

    {#each getPlayerMap(side).entries() as player}
        <div class="innerRow">
            <div class="rowBox">TEST</div>
            <div class="rowBox">TEST</div>
            <div class="rowBox">{player[1].goals}</div>
            <div class="rowBox">{player[1].assists}</div>
            <input class="field" type="text"/>
        </div>
    {/each}
</div>
