<script lang="ts">
  import HomeButton from "$lib/components/scoresheet/Bar/HomeButton.svelte";
  import MetaStats from "$lib/components/scoresheet/Bar/MetaStats.svelte";
  import Header from "$lib/components/scoresheet/Header/Header.svelte";
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
  import ExitSheet from "./ExitSheet.svelte";

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
  <div class="wideRow">
    <HomeButton></HomeButton>
    <MetaStats></MetaStats>
    <ExitSheet></ExitSheet>
  </div>
  <Header></Header>
  <div class="sheets">
    <div class="columns maximized" bind:this={leftSheet}>
      <div class="cover inactive" bind:this={leftCover} onpointerup={swap}></div>
      <div class="column">
        <Team teamName={"HOME TEAM"} side={0}></Team>
        <Saves side={0}></Saves>
      </div>
      <div class="column">
        <Penalties side={0}></Penalties>
        <Scoring side={0}></Scoring>
        <Timeouts side={0}></Timeouts>
      </div>
      <div class="column">
        <GroundBalls side={0}></GroundBalls>
        <Shots side={0}></Shots>
        <Clears side={0}></Clears>
        <ExtraMan side={0}></ExtraMan>
        <Faceoffs side={0}></Faceoffs>
      </div>
    </div>

    <div class="verticalLine"></div>

    <div class="columns" bind:this={rightSheet}>
      <div class="cover" bind:this={rightCover} onpointerup={swap}></div>
      <div class="column">
        <Team teamName={"AWAY TEAM"} side={1}></Team>
        <Saves side={1}></Saves>
      </div>
      <div class="column">
        <Penalties side={1}></Penalties>
        <Scoring side={1}></Scoring>
        <Timeouts side={1}></Timeouts>
      </div>
      <div class="column">
        <GroundBalls side={1}></GroundBalls>
        <Shots side={1}></Shots>
        <Clears side={1}></Clears>
        <ExtraMan side={1}></ExtraMan>
        <Faceoffs side={1}></Faceoffs>
      </div>
    </div>
  </div>
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    max-height: 98vh;
    min-height: 0;
    overflow: hidden;
  }

  .sheets {
    display: flex;
    flex-direction: row;
    min-height: 0;
  }

  .column {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .columns {
    flex: 1;
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1.5fr) minmax(0, 1fr);
    gap: 10px;
    min-height: 0;
  }

  .verticalLine {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
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
