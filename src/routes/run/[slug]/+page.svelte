<script lang="ts">
    import Penalties from "$lib/components/scoresheet/Penalties.svelte";
    import Scoring from "$lib/components/scoresheet/Scoring.svelte";
    import Stats from "$lib/components/scoresheet/Stats.svelte";
    import Team from "$lib/components/scoresheet/Team.svelte";
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
    </div>
    <div class="column">
        <Penalties></Penalties>
        <Scoring></Scoring>
    </div>
    <div class="column">
        <Stats></Stats>
    </div>
</div>

<style>
    .column {
        flex-direction: column;
    }

    .columns {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        width:100%;
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