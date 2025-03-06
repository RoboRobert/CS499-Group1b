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
    import "$lib/components/scoresheet/scoresheet.css";
    import Header from "$lib/components/scoresheet/Header/Header.svelte";

    let leftSheet: HTMLElement;
    let rightSheet: HTMLElement;

    let leftCover: HTMLElement;
    let rightCover: HTMLElement;

    // Swaps which team sheet is maximized.
    function swap() {
        rightSheet.classList.toggle("maximized");
        leftSheet.classList.toggle("maximized");
        leftCover.classList.toggle("inactive");
        rightCover.classList.toggle("inactive");
    }
</script>

<div class="main">
    <Header></Header>
    <div class="sheets">
        <div class="columns maximized" bind:this={leftSheet}>
            <div
                class="cover inactive"
                bind:this={leftCover}
                on:pointerup={swap}
            ></div>
            <div class="column">
                <Team side={"HOME TEAM"}></Team>
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
                <Clears teamType={"HOME"}></Clears>
                <ExtraMan></ExtraMan>
                <Faceoffs></Faceoffs>
            </div>
        </div>

        <div class="verticalLine"></div>

        <div class="columns" bind:this={rightSheet}>
            <div class="cover" bind:this={rightCover} on:pointerup={swap}></div>
            <div class="column">
                <Team side={"AWAY TEAM"}></Team>
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
                <Clears teamType={"HOME"}></Clears>
                <ExtraMan></ExtraMan>
                <Faceoffs></Faceoffs>
            </div>
        </div>
    </div>
</div>

<style>
    .main {
        max-height: 98vh;
        min-height:0;
        /* overflow:hidden; */
    }

    .sheets {
        display: flex;
        flex-direction: row;
        min-height:0;
    }

    .column {
        display: flex;
        flex-direction: column;
        min-height:0;
    }

    .columns {
        flex: 1;
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(0, 1.5fr) minmax(0, 1fr);
        gap: 10px;
        min-height:0;
        resize:both;
        overflow:hidden;
    }

    .verticalLine {
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom:10px;
        border-left: thick solid black;
        min-height: 100%;
        width: 1px;
    }

    @keyframes makeMax {
        100% {
            flex: 11;
        }
    }

    .maximized {
        animation: makeMax 1s forwards;
    }

    .cover {
        opacity: 50%;
        position: absolute;
        inset: 0;
    }

    .inactive {
        pointer-events: none;
    }

    .cover:hover {
        background-color: black;
    }
</style>
