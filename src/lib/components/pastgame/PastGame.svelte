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
  import ThemeSwitch from "../general/ThemeSwitch.svelte";
  import Halftime from "../scoresheet/Bar/Halftime.svelte";
  import Quarters from "../scoresheet/Bar/Quarters.svelte";
  import CorrectSheet from "./CorrectSheet.svelte";
  import ExitSheet from "./ExitSheet.svelte";

  interface Theme {
    theme: boolean;
    role: string;
  }

  let { theme, role }: Theme = $props();

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
    <Halftime></Halftime>
    {#if role === "admin" || role === "score-keeper"}
      <Quarters></Quarters>
    {/if}
    <ExitSheet></ExitSheet>
    {#if role === "admin" || role === "score-keeper"}
      <CorrectSheet></CorrectSheet>
    {/if}
    <ThemeSwitch theme={theme}></ThemeSwitch>
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
