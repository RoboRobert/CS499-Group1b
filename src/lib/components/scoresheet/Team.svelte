<script lang="ts">
    import { players, getPlayer } from "./data.svelte";
    import { IsNumber, CheckPlayerNumber } from "./checker.svelte";

    interface Side {
        teamName: string,
        side:number,
    }

    let {teamName, side}: Side = $props();
</script>
<div class="outer">
    <div class="headerBox">{teamName}</div>
    <div class="headerRow">
        <div class="rowBox thin">PO</div>
        <div class="rowBox thin">#</div>
        <div class="rowBox wide">NAME</div>
        <div class="rowBox normal">QUARTERS</div>
        <div class="rowBox normal">SHOTS</div>
        <div class="rowBox thin">G</div>
        <div class="rowBox thin">A</div>
        <div class="rowBox thin">GBS</div>
    </div>
    {#each players[side] as player, i}
        <div class="innerRow">
            <input autocomplete="off" class="field thin" type="text" bind:value={players[side][i].position} oninput={IsNumber}>
            <input id="playerNum_{side}_{i}" autocomplete="off" class="field thin" type="number" bind:value={players[side][i].number} oninput={(event) => CheckPlayerNumber(event, side)}>
            <input autocomplete="off" class="field wide" type="text" bind:value={players[side][i].name}>
            <input autocomplete="off" class="field normal" type="text" bind:value={players[side][i].quarters}>
            <input autocomplete="off" class="field normal" type="number" bind:value={players[side][i].shots}>
            <div class="rowBox thin">{getPlayer(side, players[side][i].number).goals}</div>
            <div class="rowBox thin">{getPlayer(side, players[side][i].number).assists}</div>
            <input autocomplete="off" class="field thin" type="number" bind:value={players[side][i].groundBalls}>
        </div>
    {/each}
</div>