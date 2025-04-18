<script lang="ts">
  import Goals from "./Goals.svelte";

  import { coachName, game_quarter, goalTrack, teamName } from "../data.svelte";
  import { readGoalType, readPlayerno, readString, readTime } from "$lib/checkers/frontendChecker.svelte";

  let numGoals = 30;
</script>

<div class="wideRow">
  <div class="outer top-bar-item">
    <div class="innerRow">
      <input id="teamName-0" class="field bigField" type="text" value={teamName[0]} placeholder="Home Team" oninput={(e) => teamName[0] = readString(e)} />
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input id="goalTrackTime-0-{i}" autocomplete="off" class="field goal" style="flex:3" type="text" value={goalTrack[0][i].time} oninput={(e) => {goalTrack[0][i].time = readTime(e); goalTrack[0][i].quarter = game_quarter.quarter}} />
          <input id="goalTrackType-0-{i}" autocomplete="off" class="field normal" type="text" bind:value={goalTrack[0][i].type} oninput={(e) => {goalTrack[0][i].type = readGoalType(e); goalTrack[0][i].quarter = game_quarter.quarter }}/>
        </div>
      {/each}
    </div>
    <div class="innerRow" style="margin-bottom:10px;">
      <input autocomplete="off" class="field bigField" type="text" value={coachName[0]} oninput={(e) => coachName[0] = readString(e)} placeholder="Coach"/>
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input id="goalTrackMain-0-{i}" autocomplete="off" class="field normal" inputmode="numeric" value={goalTrack[0][i].main} oninput={(e) => {goalTrack[0][i].main = readPlayerno(e); goalTrack[0][i].quarter = game_quarter.quarter}}/>
          <input id="goalTrackAssist-0-{i}" autocomplete="off" class="field normal" inputmode="numeric" value={goalTrack[0][i].assist} oninput={(e) => {goalTrack[0][i].assist = readPlayerno(e); goalTrack[0][i].quarter = game_quarter.quarter}}/>
        </div>
      {/each}
    </div>
    <div class="innerRow">
      <input id="teamName-1" autocomplete="off" class="field bigField" type="text" value={teamName[1]} placeholder="Away Team" oninput={(e) => teamName[1] = readString(e)} />
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input id="goalTrackTime-1-{i}" autocomplete="off" class="field goal" style="flex:3" type="text" value={goalTrack[1][i].time} oninput={(e) => {goalTrack[1][i].time = readTime(e); goalTrack[1][i].quarter = game_quarter.quarter}} />
          <input id="goalTrackType-1-{i}" autocomplete="off" class="field normal" type="text" bind:value={goalTrack[1][i].type} oninput={(e) => {goalTrack[1][i].type = readGoalType(e); goalTrack[1][i].quarter = game_quarter.quarter }}/>
        </div>
      {/each}
    </div>
    <div class="innerRow">
      <input autocomplete="off" class="field bigField" type="text" value={coachName[1]} oninput={(e) => coachName[1] = readString(e)} placeholder="Coach" />
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input id="goalTrackMain-1-{i}" autocomplete="off" class="field normal" inputmode="numeric" value={goalTrack[1][i].main} oninput={(e) => {goalTrack[1][i].main = readPlayerno(e); goalTrack[1][i].quarter = game_quarter.quarter}} />
          <input id="goalTrackAssist-1-{i}" autocomplete="off" class="field normal" inputmode="numeric" value={goalTrack[1][i].assist} oninput={(e) => {goalTrack[1][i].type = readGoalType(e); goalTrack[1][i].quarter = game_quarter.quarter }} />
        </div>
      {/each}
    </div>
  </div>

  <Goals></Goals>
</div>

<style>
  .boxes {
    flex: 1;
    max-width: 100%;
    flex-direction: row;
    display: flex;
    min-width: 0;
    border: 1.5px solid var(--clr-outer);
  }
  .boxes:hover {
    border: 1.5px solid var(--clr-hover);
  }

  .outer {
    max-width: 85%;
    margin-right: 10px;
   
  }
  .outer:hover {
    border: none;
  }

 

  .bigField {
    flex: 3;
    text-align: left;
    margin-right: 10px;
    border: 1.5px solid var(--clr-outer);
  }
  .bigField:hover {
    border: 1.5px solid var(--clr-hover);
  }

</style>
