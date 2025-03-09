<script lang="ts">
    import { awayGoalTrack, homeGoalTrack, players } from "./data.svelte";

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
            <input class="field" type="text">
            <input class="field" type="number" bind:value={players[side][i]}>
            <input class="field" type="text" style="flex:2">
            <input class="field" type="text">
            <input class="field" type="text">
            <!-- <div class="rowBox">{players[side][i].goals}</div>
            <div class="rowBox">{players[side][i].assists}</div> -->
            <div class="rowBox">TEST</div>
            <div class="rowBox">TEST</div>
            <input class="field" type="text">
        </div>
    {/each}
</div>