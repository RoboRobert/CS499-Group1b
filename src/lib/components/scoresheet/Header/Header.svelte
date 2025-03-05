<script lang="ts">
    import Attempt from "./Attempt.svelte";
    import OverallShots from "./OverallShots.svelte";
    import PlayerNums from "./PlayerNums.svelte";

    let numAttempts = 30;
</script>

<div class="testRow">
    <div class="outer" style="max-width:80%; margin-right:10px;">
        <div class="innerRow">
            <input class="field bigField" type="text" placeholder="Home">
            {#each Array(numAttempts) as attempt}
                <Attempt></Attempt>
            {/each}
        </div>
        <div class="innerRow">
            <input class="field bigField" type="text" placeholder="Coach">
            {#each Array(numAttempts) as attempt}
                <PlayerNums></PlayerNums>
            {/each}
        </div>
        <div class="innerRow">
            <input class="field bigField" type="text" placeholder="Visiting">
            {#each Array(numAttempts) as attempt}
                <Attempt></Attempt>
            {/each}
        </div>
        <div class="innerRow">
            <input class="field bigField" type="text" placeholder="Coach">
            {#each Array(numAttempts) as attempt}
                <PlayerNums></PlayerNums>
            {/each}
        </div>
    </div>

    <OverallShots></OverallShots>
</div>

<style>
    .bigField {
        flex:3;
        text-align: left;
    }

    .testRow {
        max-width:100%;
        display:flex;
        flex-direction: row;
    }
</style>