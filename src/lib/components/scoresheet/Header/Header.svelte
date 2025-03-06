<script lang="ts">
    import OverallShots from "./Goals.svelte";

    import { homeGoalTrack, awayGoalTrack } from "../data.svelte";

    let numGoals = 30;
</script>

<div class="testRow">
    <div class="outer">
        <div class="innerRow">
            <input class="field bigField" type="text" placeholder="Home">
            {#each Array(numGoals) as attempt, i}
                <div class="boxes">
                    <input class="field" style="flex:3" type="text" bind:value={homeGoalTrack[i].time}>
                    <input class="field" type="text" bind:value={homeGoalTrack[i].type}>
                </div>
            {/each}
        </div>
        <div class="innerRow" style="margin-bottom:10px;">
            <input class="field bigField" type="text" placeholder="Coach">
            {#each Array(numGoals) as attempt, i}
                <div class="boxes">
                    <input class="field" type="text" bind:value={homeGoalTrack[i].main}> 
                    <input class="field" type="text" bind:value={homeGoalTrack[i].assist}>
                </div>
            {/each}
        </div>
        <div class="innerRow">
            <input class="field bigField" type="text" placeholder="Visiting">
            {#each Array(numGoals) as attempt, i}
            <div class="boxes">
                <input class="field" style="flex:3" type="text" bind:value={awayGoalTrack[i].time}>
                <input class="field" type="text" bind:value={awayGoalTrack[i].type}>
            </div>
            {/each}
        </div>
        <div class="innerRow">
            <input class="field bigField" type="text" placeholder="Coach">
            {#each Array(numGoals) as attempt, i}
                <div class="boxes">
                    <input class="field" type="text" bind:value={awayGoalTrack[i].main}>
                    <input class="field" type="text" bind:value={awayGoalTrack[i].assist}>
                </div>
            {/each}
        </div>
    </div>

    <OverallShots></OverallShots>
</div>

<style>
    .boxes {
        flex: 1;
        max-width:100%;
        flex-direction: row;
        display:flex;
        min-width:0;
    }

    .outer {
        max-width:80%; 
        margin-right:10px;
    }

    .bigField {
        flex:3;
        text-align: left;
    }

    .testRow {
        max-width:100%;
        display:flex;
        flex-direction: row;
        margin-top:10px;
    }
</style>