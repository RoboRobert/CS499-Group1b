<script lang="ts">
    import { players, getPlayer } from "./data.svelte";

    interface Side {
        teamName: string,
        side:number,
    }

    let {teamName, side}: Side = $props();
</script>
<div class="outer">
    <div class="headerBox">{teamName}</div>
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
    {#each players[side] as player, i}
        <div class="innerRow">
            <input autocomplete="off" class="field" type="text" bind:value={players[side][i].position}>
            <input autocomplete="off" class="field" type="number" bind:value={players[side][i].number}>
            <input autocomplete="off" class="field" type="text" style="flex:2" bind:value={players[side][i].name}>
            <input autocomplete="off" class="field" type="text" bind:value={players[side][i].quarters}>
            <input autocomplete="off" class="field" type="text" bind:value={players[side][i].shots}>
            <div class="rowBox">{getPlayer(side, players[side][i].number).goals}</div>
            <div class="rowBox">{getPlayer(side, players[side][i].number).assists}</div>
            <input autocomplete="off" class="field" type="text" bind:value={players[side][i].groundBalls}>
        </div>
    {/each}
</div>