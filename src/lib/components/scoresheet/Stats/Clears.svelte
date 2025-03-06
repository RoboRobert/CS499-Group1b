<script lang="ts">
    import { homeClears, awayClears } from "../data.svelte";

    export let teamType:string;

    let team = homeClears;
    if(teamType == "AWAY") {
        team = awayClears;
    }
</script>

<div class="outer">
    <div class="headerBox">CLEARS</div>
    <div class="innerColumn">
        <div class="headerRow">
            <div class="rowBox"> </div>
            <div class="rowBox">CLEARED</div>
            <div class="rowBox">FAILED</div>
            <div class="rowBox"> </div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 1</div>
            <input class="field" type="number" bind:value={team[0].won}>
            <input class="field" type="number" bind:value={team[0].lost}>
            <div class="rowBox">{team[0].won}/{team[0].lost + team[0].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 2</div>
            <input class="field" type="number" bind:value={team[1].won}>
            <input class="field" type="number" bind:value={team[1].lost}>
            <div class="rowBox">{team[1].won}/{team[1].lost + team[1].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 3</div>
            <input class="field" type="number" bind:value={team[2].won}>
            <input class="field" type="number" bind:value={team[2].lost}>
            <div class="rowBox">{team[2].won}/{team[2].lost + team[2].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">QTR 4</div>
            <input class="field" type="number" bind:value={team[3].won}>
            <input class="field" type="number" bind:value={team[3].lost}>
            <div class="rowBox">{team[3].won}/{team[3].lost + team[3].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox">O.T.</div>
            <input class="field" type="number" bind:value={team[4].won}>
            <input class="field" type="number" bind:value={team[4].lost}>
            <div class="rowBox">{team[4].won}/{team[4].lost + team[4].won}</div>
        </div>
        <div class="innerRow">
            <div class="rowBox"></div>
            <div class="rowBox" style="flex:2">TOTALS</div>
            <div class="rowBox">{team.reduce((sum, clear) => sum + clear.won,0)}/{team.reduce((sum, clear) => sum + clear.won + clear.lost,0)}</div>
        </div>
    </div>
</div>