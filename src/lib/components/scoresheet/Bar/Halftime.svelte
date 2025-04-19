<script lang="ts">
  import { checkObj } from "$lib/conversion/submit";
  import { clears, faceoffs, getGroundBalls, getShots, penalties, saves, substitutions, teamName, turnovers } from "../data.svelte";

  function toggleHalftimeStats() {
    document.getElementById("halftime").classList.toggle("hidden");
  }

  function modifyTurnoverHalf2(event: any, side: number) {
    const value = Number(event.target.value);
    if (value < turnovers[side].half1) {
      event.target.value = turnovers[side].half1;
      return;
    }
    turnovers[side].half2 = value - turnovers[side].half1;
  }

  function modifySubsHalf2(event: any, side: number) {
    const value = Number(event.target.value);
    if (value < substitutions[side].half1) {
      event.target.value = substitutions[side].half1;
      return;
    }
    substitutions[side].half2 = value - substitutions[side].half1;
  }

  let halftime = $state(true);
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
  <!-- <div class="topText">OVERALL STATS</div> -->
</div>

<div id="halftime" class="modal-backdrop hidden">
  <div class="modal-content parent">
    <h2>OVERALL STATS</h2>
    <div class="radio-group">
      <button class="button toggleButton {halftime ? 'active' : ''}" onclick={() => (halftime = true)}> HALFTIME </button>

      <button class="button toggleButton {!halftime ? 'active' : ''}" onclick={() => (halftime = false)}> FULL GAME </button>
    </div>
    {#if halftime}
      <div>
        Shots: {teamName[0].split(" ")[0]}-{getShots(0)[0] + getShots(0)[1]}, {teamName[1].split(" ")[0]}-{getShots(1)[0] + getShots(1)[1]}
      </div>
      <div>
        Ground Balls: {teamName[0].split(" ")[0]}-{getGroundBalls(0)[0] + getGroundBalls(0)[1]}, {teamName[1].split(" ")[0]}-{getGroundBalls(1)[0] + getGroundBalls(1)[1]}
      </div>
      <div>
        Faceoffs: {teamName[0].split(" ")[0]}-{faceoffs[0][0].won + faceoffs[0][1].won}, {teamName[1].split(" ")[0]}-{faceoffs[1][0].won + faceoffs[1][1].won}
      </div>
      <div>
        Clears: {teamName[0].split(" ")[0]}-{clears[0][0].won + clears[0][1].won}, {teamName[1].split(" ")[0]}-{clears[1][0].won + clears[1][1].won}
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
        <div class="smallBox">Turnovers:&nbsp</div>
        <div class="smallBox">{teamName[0].split(" ")[0]}-</div>
        <input class="smallInput" min="0" max="99" autocomplete="off" type="number" bind:value={turnovers[0].half1} />
        <div class="smallBox">, {teamName[1].split(" ")[0]}-</div>
        <input class="smallInput" min="0" max="99" autocomplete="off" type="number" bind:value={turnovers[1].half1} />
      </div>
      <div class="innerRow">
        <p class="smallBox">Substitutions:&nbsp</p>
        <div class="smallBox">{teamName[0].split(" ")[0]}-</div>
        <input class="smallInput" min="0" max="99" autocomplete="off" type="number" bind:value={substitutions[0].half1} />
        <div class="smallBox">, {teamName[1].split(" ")[0]}-</div>
        <input class="smallInput" min="0" max="99" autocomplete="off" type="number" bind:value={substitutions[1].half1} />
      </div>
    {/if}
    {#if !halftime}
      <div>
        Shots: {teamName[0].split(" ")[0]}-{getShots(0).reduce((c, p) => c + p)}, {teamName[1].split(" ")[0]}-{getShots(1).reduce((c, p) => c + p)}
      </div>
      <div>
        Ground Balls: {teamName[0].split(" ")[0]}-{getGroundBalls(0).reduce((c,p)=>c+p,0)}, {teamName[1].split(" ")[0]}-{getGroundBalls(1).reduce((c,p)=>c+p,0)}
      </div>
      <div>
        Faceoffs: {teamName[0].split(" ")[0]}-{faceoffs[0].map((f) => f.won).reduce((c, p) => c + p)}, {teamName[1].split(" ")[0]}-{faceoffs[1].map((f) => f.won).reduce((c, p) => c + p)}
      </div>
      <div>
        Clears: {teamName[0].split(" ")[0]}-{clears[0].map((f) => f.won).reduce((c, p) => c + p)}, {teamName[1].split(" ")[0]}-{clears[1].map((f) => f.won).reduce((c, p) => c + p)}
      </div>
      <div>
        Fouls: {teamName[0].split(" ")[0]}-{penalties[0].filter((p) => checkObj(p)).length}, {teamName[1].split(" ")[0]}-{penalties[1].filter((p) => checkObj(p)).length}
      </div>
      <div>
        Saves: {teamName[0].split(" ")[0]}-{saves[0].map((save) => save.qtr1 + save.qtr2 + save.qtr3 + save.qtr4 + save.ot).reduce((prev, curr) => curr + prev)}, {teamName[1].split(" ")[0]}-{saves[1]
          .map((save) => save.qtr1 + save.qtr2 + save.qtr3 + save.qtr4 + save.ot)
          .reduce((prev, curr) => curr + prev)}
      </div>
      <div class="innerRow">
        <div class="smallBox">Turnovers:&nbsp</div>
        <div class="smallBox">{teamName[0].split(" ")[0]}-</div>
        <input class="smallInput" min="0" max="99" autocomplete="off" type="number" value={turnovers[0].half1 + turnovers[0].half2} onchange={(e) => modifyTurnoverHalf2(e, 0)} />
        <div class="smallBox">, {teamName[1].split(" ")[0]}-</div>
        <input class="smallInput" min="0" max="99" autocomplete="off" type="number" value={turnovers[1].half1 + turnovers[1].half2} onchange={(e) => modifyTurnoverHalf2(e, 1)} />
      </div>
      <div class="innerRow">
        <div class="smallBox">Substitutions:&nbsp</div>
        <div class="smallBox">{teamName[0].split(" ")[0]}-</div>
        <input class="smallInput" min="0" max="99" autocomplete="off" type="number" value={substitutions[0].half1 + substitutions[0].half2} onchange={(e) => modifySubsHalf2(e, 0)} />
        <div class="smallBox">, {teamName[1].split(" ")[0]}-</div>
        <input class="smallInput" min="0" max="99" autocomplete="off" type="number" value={substitutions[1].half1 + substitutions[1].half2} onchange={(e) => modifySubsHalf2(e, 1)} />
      </div>
    {/if}
    <div class="modal-actions">
      <button onclick={toggleHalftimeStats} class="sign-in-button">Back to Scoresheet</button>
    </div>
  </div>
</div>

<style>
  .parent {
    display: flex;
    flex-direction: column;
    gap: 20px; /* this adds vertical spacing */
  }

  .smallInput {
    text-align: center;
    min-width: 0;
    min-height: 0;
    opacity: 100%;
    box-sizing: border-box;
    height: 100%;
    flex: 0.15;
    border: 1px solid var(--clr-outer);
    border-radius: 5px;
    background-color: var(--clr-input);
    color: var(--clr-home);
  }

  .smallBox {
    all: unset;
    text-align: center;
    min-width: 0;
    min-height: 0;
    opacity: 100%;
    box-sizing: border-box;
  }

  .radio-group {
    flex: 1;
    display: flex;
    align-items: center;
    border: 1px solid var(--clr-outer);
    border-radius: 5px;
    background-color: var(--clr-input);
    color: var(--clr-home);
  }
</style>
