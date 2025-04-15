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
  import { clears, faceoffs, groundBalls, shots, teamName, type SheetSave } from "../data.svelte";

  function toggleHalftimeStats() {
    document.getElementById("halftime").classList.toggle("hidden");
  }

  // function addSaves(save: SheetSave): number {
  //   return save.qtr1 + save.qtr2;
  // }
</script>

<div class="top-bar-item thin">
  <button onclick={toggleHalftimeStats}>OVERALL STATS</button>
</div>

<div id="halftime" class="modal-backdrop hidden">
  <div class="modal-content">
    <h2>HALFTIME STATS</h2>
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
      Fouls: {teamName[0].split(" ")[0]}-{clears[0][0].won + clears[0][1].won}, {teamName[1].split(" ")[0]}-{clears[1][1].won + clears[1][1].won}
    </div>
    <div>
      Saves: {teamName[0].split(" ")[0]}-{clears[0][0].won + clears[0][1].won}, {teamName[1].split(" ")[0]}-{clears[1][1].won + clears[1][1].won}
    </div>
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

  img:hover {
    background-color: lightgray;
  }
</style>
