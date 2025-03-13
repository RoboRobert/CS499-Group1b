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

    <!-- Only display players that have scored or assisted -->
    {#each getPlayerMap(side).entries() as player}
        {#if player[1].goals > 0 || player[1].assists > 0}
            <div class="innerRow">
                <div class="rowBox">{player[1].number}</div>
                <div class="rowBox">{player[1].name}</div>
                <div class="rowBox">{player[1].goals}</div>
                <div class="rowBox">{player[1].assists}</div>
                <input class="field" type="text"/>
            </div>
        {/if}
    {/each}
</div>
