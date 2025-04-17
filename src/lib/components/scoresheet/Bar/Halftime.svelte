<!-- Halftime stats
Shots: Navy-25, Loyola-18
Ground Balls: Loyola-5, Navy-4
Draws: Loyola-13, Navy-11
Clears: Navy 9-9, Loyola 7-7
Free Position: Navy 5-6 Loyola 1-1
Saves: Navy-5 Loyola-3
Fouls: Navy-5 Loyola-8
Turnovers: Navy-2 Loyola-3 -->

<script lang="ts">
  import { checkObj } from "$lib/conversion/submit";
  import { clears, faceoffs, groundBalls, penalties, saves, shots, teamName, type SheetSave } from "../data.svelte";

  function toggleHalftimeStats() {
    document.getElementById("halftime").classList.toggle("hidden");
  }

  // function addSaves(save: SheetSave): number {
  //   return save.qtr1 + save.qtr2;
  // }

  let statsMode = $state("halftime");
</script>

<div class="top-bar-item thin">
  <svg class="svg" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" onpointerup={toggleHalftimeStats} viewBox="0 0 512 512" xml:space="preserve">
    <g>
      <path
        class="st0"
        d="M70.697,395.352h80.633c5.658,0,10.246-4.252,10.246-9.498v-143.72c0-5.246-4.588-9.499-10.246-9.499H70.697
      c-5.658,0-10.246,4.253-10.246,9.499v143.72C60.451,391.1,65.039,395.352,70.697,395.352z"
      />
      <path
        class="st0"
        d="M215.684,395.352h80.631c5.658,0,10.248-4.252,10.248-9.498V141.117c0-5.246-4.59-9.498-10.248-9.498h-80.631
      c-5.66,0-10.248,4.252-10.248,9.498v244.736C205.436,391.1,210.024,395.352,215.684,395.352z"
      />
      <path
        class="st0"
        d="M360.668,395.352h80.631c5.66,0,10.248-4.252,10.248-9.498V25.964c0-5.246-4.588-9.499-10.248-9.499h-80.631
      c-5.66,0-10.248,4.253-10.248,9.499v359.89C350.42,391.1,355.008,395.352,360.668,395.352z"
      />
      <polygon
        class="st0"
        points="495.426,438.633 16.574,438.633 0,438.633 0,495.535 16.574,495.535 495.426,495.535 512,495.535 
      512,438.633 	"
      />
    </g>
  </svg>
  <div>HALFTIME STATS</div>
</div>

<div id="halftime" class="modal-backdrop hidden">
  <div class="modal-content statsList">
    <h2>DISPLAY STATS</h2>
    <div class="radio-group">
      <div class="radio-item">
        <input type="radio" id="option1" name="statsGroup" value="halftime" bind:group={statsMode} />
        <label for="option1">HALFTIME</label>
      </div>
      <div class="radio-item">
        <input type="radio" id="option2" name="statsGroup" value="fullgame" bind:group={statsMode} />
        <label for="option2">FULL GAME</label>
      </div>
    </div>
    {#if statsMode === "halftime"}
      <div>
        Shots: {teamName[0].split(" ")[0]}-{shots[0][0] + shots[0][1]}, {teamName[1].split(" ")[0]}-{shots[1][0] + shots[1][1]}
      </div>
      <div>
        Ground Balls: {teamName[0].split(" ")[0]}-{groundBalls[0][0] + groundBalls[0][1]}, {teamName[1].split(" ")[0]}-{groundBalls[1][0] + groundBalls[1][1]}
      </div>
      <div>
        Faceoffs: {teamName[0].split(" ")[0]}-{faceoffs[0][0].won + faceoffs[0][1].won}, {teamName[1].split(" ")[0]}-{faceoffs[1][1].won + faceoffs[1][1].won}
      </div>
      <div>
        Clears: {teamName[0].split(" ")[0]}-{clears[0][0].won + clears[0][1].won}, {teamName[1].split(" ")[0]}-{clears[1][1].won + clears[1][1].won}
      </div>
      <div>
        Fouls: {teamName[0].split(" ")[0]}-{penalties[0].filter((p) => checkObj(p)).map((p) => p.quarter <= 2).length}, {teamName[1].split(" ")[0]}-{penalties[1]
          .filter((p) => checkObj(p))
          .map((p) => p.quarter <= 2).length}
      </div>
      <div>
        Saves: {teamName[0].split(" ")[0]}-{saves[0].map((save) => save.qtr1 + save.qtr2).reduce((prev, curr) => curr + prev)}, {teamName[1].split(" ")[0]}-{saves[1]
          .map((save) => save.qtr1 + save.qtr2)
          .reduce((prev, curr) => curr + prev)}
      </div>
      <div class="innerRow">
        <p class="smallBox">Turnovers: </p>
        <div class="smallBox"> {teamName[0].split(" ")[0]}-</div>
        <input class="smallInput">
        <div class="smallBox">, {teamName[1].split(" ")[0]}-, </div>
        <input class="smallInput">
      </div>
      <div>
        Substitutions: {teamName[0].split(" ")[0]}-{saves[0].map((save) => save.qtr1 + save.qtr2).reduce((prev, curr) => curr + prev)}, {teamName[1].split(" ")[0]}-{saves[1]
          .map((save) => save.qtr1 + save.qtr2)
          .reduce((prev, curr) => curr + prev)}
      </div>
    {/if}
    {#if statsMode !== "halftime"}
      <div>
        Shots: {teamName[0].split(" ")[0]}-{shots[0][0] + shots[0][1]}, {teamName[1].split(" ")[0]}-{shots[1][0] + shots[1][1]}
      </div>
      <div>
        Ground Balls: {teamName[0].split(" ")[0]}-{groundBalls[0][0] + groundBalls[0][1]}, {teamName[1].split(" ")[0]}-{groundBalls[1][0] + groundBalls[1][1]}
      </div>
      <div>
        Faceoffs: {teamName[0].split(" ")[0]}-{faceoffs[0][0].won + faceoffs[0][1].won}, {teamName[1].split(" ")[0]}-{faceoffs[1][1].won + faceoffs[1][1].won}
      </div>
      <div>
        Clears: {teamName[0].split(" ")[0]}-{clears[0][0].won + clears[0][1].won}, {teamName[1].split(" ")[0]}-{clears[1][1].won + clears[1][1].won}
      </div>
      <div>
        Fouls: {teamName[0].split(" ")[0]}-{penalties[0].filter((p) => checkObj(p)).map((p) => p.quarter <= 2).length}, {teamName[1].split(" ")[0]}-{penalties[1]
          .filter((p) => checkObj(p))
          .map((p) => p.quarter <= 2).length}
      </div>
      <div>
        Saves: {teamName[0].split(" ")[0]}-{saves[0].map((save) => save.qtr1 + save.qtr2).reduce((prev, curr) => curr + prev)}, {teamName[1].split(" ")[0]}-{saves[1]
          .map((save) => save.qtr1 + save.qtr2)
          .reduce((prev, curr) => curr + prev)}
      </div>
    {/if}
    <!-- <div class="halftimeGroup">
      <div>
        Draws: {teamName[0].split(" ")[0]}
      </div>
      <input />
      <div>
        , {teamName[1].split(" ")[0]}
      </div>
      <input />
    </div> -->
    <div class="modal-actions">
      <button onclick={toggleHalftimeStats} class="sign-in-button">Back to Scoresheet</button>
    </div>
  </div>
</div>

<style>
  .statsList { 
    padding-bottom:10px;
  }

  .smallInput {
    text-align: center;
    min-width: 0;
    min-height: 0;
    opacity: 100%;
    box-sizing: border-box;
    height:100%;
    flex:0.15;
  }

  .smallBox {
    all:unset;
    text-align: center;
    min-width: 0;
    min-height: 0;
    opacity: 100%;
    box-sizing: border-box;
  }

  .radio-group {
    flex: 1;
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
    padding: 5px;
  }
</style>
