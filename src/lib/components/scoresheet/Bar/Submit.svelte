<script lang="ts">
  import { base } from "$app/paths";
  import { json } from "@sveltejs/kit";
  import { awayGoals, awayGoalTrack, clears, extraMan, faceoffs, groundBalls, homeGoals, homeGoalTrack, metaStats, players, shots, timeouts } from "../data.svelte";

  function submitScoresheet() {
    const scoresheetData = {
      players: players,
      homeGoals: homeGoals,
      awayGoals: awayGoals,
      homeGoalTrack: homeGoalTrack,
      awayGoalTrack: awayGoalTrack,
      groundBalls: groundBalls,
      shots:shots,
      clears: clears,
      faceoffs: faceoffs,
      extraMan: extraMan,
      timeouts: timeouts,
      metaStats: metaStats,
    };
    const scoresheetJSON = JSON.stringify(scoresheetData);
    console.log(scoresheetJSON);
  }
</script>

<div class="noBorder">
  <button onclick={submitScoresheet}>SUBMIT SCORESHEET</button>
</div>

<style>
  .noBorder {
    align-content: end;
  }

  button {
    height: 100%;
  }
</style>
