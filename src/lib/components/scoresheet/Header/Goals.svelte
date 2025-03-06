<script lang="ts">
    import { homeGoals, awayGoals } from "../data.svelte";
</script>

<div class="outer" style="width: 20%;"> 
    <div class="innerRow">
        <div class="innerColumn">
            <input class="field" type="number" placeholder="Q1" bind:value={homeGoals[0]}>
            <input class="field" type="number" placeholder="Q1" bind:value={awayGoals[0]}>
        </div>
        <div class="innerColumn">
            <input class="field" type="number" placeholder="Q2" bind:value={homeGoals[1]}>
            <input class="field" type="number" placeholder="Q2" bind:value={awayGoals[1]}>
        </div>
        <div class="innerColumn">
            <input class="field" type="number" placeholder="Q3" bind:value={homeGoals[2]}>
            <input class="field" type="number" placeholder="Q3" bind:value={awayGoals[2]}>
        </div>
        <div class="innerColumn">
            <input class="field" type="number" placeholder="Q4" bind:value={homeGoals[3]}>
            <input class="field" type="number" placeholder="Q4" bind:value={awayGoals[3]}>
        </div>
        <div class="innerColumn">
            <input class="field" type="number" placeholder="OT1" bind:value={homeGoals[4]}>
            <input class="field" type="number" placeholder="OT1" bind:value={awayGoals[4]}>
        </div>
        <div class="innerColumn">
            <input class="field" type="number" placeholder="OT2" bind:value={homeGoals[5]}>
            <input class="field" type="number" placeholder="OT2" bind:value={awayGoals[5]}>
        </div>
        <div class="innerColumn">
            <div class="rowBox">{homeGoals.reduce((acc,current) => acc + current, 0)}</div>
            <div class="rowBox">{awayGoals.reduce((acc,current) => acc + current, 0)}</div>
        </div>
    </div>
</div>