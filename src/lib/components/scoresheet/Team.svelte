<script lang="ts">
    import Player from "./Player.svelte";

    let numPlayers = 31;
</script>
<div class="outer">
    <div class="headerBox">HOME TEAM</div>
    <div class="headerRow">
        <div class="rowBox">PO</div>
        <div class="rowBox">#</div>
        <div class="rowBox" style="flex:2">Name</div>
        <div class="rowBox">Quarters</div>
        <div class="rowBox">Shots</div>
        <div class="rowBox">G</div>
        <div class="rowBox">A</div>
        <div class="rowBox">GBS</div>
    </div>
    {#each Array(numPlayers) as player}
        <Player></Player>
    {/each}
</div>