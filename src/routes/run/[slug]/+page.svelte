<script lang="ts">
    import Penalties from "$lib/components/scoresheet/Penalties.svelte";
    import Saves from "$lib/components/scoresheet/Saves.svelte";
    import Scoring from "$lib/components/scoresheet/Scoring.svelte";
    import Clears from "$lib/components/scoresheet/Stats/Clears.svelte";
    import ExtraMan from "$lib/components/scoresheet/Stats/ExtraMan.svelte";
    import Faceoffs from "$lib/components/scoresheet/Stats/Faceoffs.svelte";
    import GroundBalls from "$lib/components/scoresheet/Stats/GroundBalls.svelte";
    import Shots from "$lib/components/scoresheet/Stats/Shots.svelte";
    import Team from "$lib/components/scoresheet/Team.svelte";
    import Timeouts from "$lib/components/scoresheet/Timeouts.svelte";
</script>

<div class="wrapper">
    <div class="wrapper">
        <div class="header"></div>
        <div class="header"></div>
    </div>
    <div class="wrapper">
        <div class="header"></div>
        <div class="header"></div>
    </div>
    <div class="wrapper">
        <div class="header"></div>
        <div class="header"></div>
    </div>
</div>

<div class="columns">
    <div class="column">
        <Team></Team>
        <Saves></Saves>
    </div>
    <div class="column">
        <Penalties></Penalties>
        <Scoring></Scoring>
        <Timeouts></Timeouts>
    </div>
    <div class="column">
        <GroundBalls></GroundBalls>
        <Shots></Shots>
        <Clears></Clears>
        <ExtraMan></ExtraMan>
        <Faceoffs></Faceoffs>
    </div>
</div>

<style>
    .column {
        flex-direction: column;
    }

    .columns {
        display:grid;
        grid-template-columns: minmax(0,2fr) minmax(0,1.5fr) minmax(0,1fr);
        width:100%;
        gap: 10px;
    }

    .wrapper {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        height: auto;
    }

    .header {
        border: 1px solid black; 
        width:30px;
        height:30px;
    }
</style>