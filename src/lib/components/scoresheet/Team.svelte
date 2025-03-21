<script lang="ts">
    import { players, getPlayer } from "./data.svelte";
    import { IsNumber, CheckPlayerNumber } from "./frontendChecker.svelte";

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
            <input id="playerPosition-{side}-{i}" autocomplete="off" class="field thin" type="text" bind:value={players[side][i].position}>
            <input id="playerNum-{side}-{i}" min="0" max="99" autocomplete="off" class="field thin" type="number" bind:value={players[side][i].number} oninput={(event) => CheckPlayerNumber(event, side)}>
            <input id="playerName-{side}-{i}" autocomplete="off" class="field wide" type="text" bind:value={players[side][i].name}>
            <input id="playerQuarters-{side}-{i}" autocomplete="off" class="field normal" type="text" bind:value={players[side][i].quarters}>
            <input id="playerShots-{side}-{i}" min="0" autocomplete="off" class="field normal" type="number" bind:value={players[side][i].shots}>
            <div class="rowBox thin">{getPlayer(side, players[side][i].number).goals}</div>
            <div class="rowBox thin">{getPlayer(side, players[side][i].number).assists}</div>
            <input id="playerGBs-{side}-{i}" min="0" autocomplete="off" class="field thin" type="number" bind:value={players[side][i].groundBalls}>
        </div>
    {/each}
</div>