<script lang="ts">
    import Comp1 from "$lib/components/scoresheet/comp1.svelte";
    import Team from "$lib/components/scoresheet/Team.svelte";

    let num = 100;
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
    <div class="column"></div>
    <div class="column"></div>
</div>

<style>
    .column {
        border: 1px solid black;
        width:max-content;
    }

    .columns {
        display: flex;
        flex-direction: row;
        height: 1000px;
        width: 1000px;
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