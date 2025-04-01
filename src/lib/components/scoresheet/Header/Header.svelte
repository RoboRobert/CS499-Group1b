<script lang="ts">
  import Goals from "./Goals.svelte";

  import { homeGoalTrack, awayGoalTrack, teamName } from "../data.svelte";
  import { notEmpty, readPlayerno, readTime } from "../frontendChecker.svelte";

  let numGoals = 30;
</script>

<div class="wideRow">
  <div class="outer noBorder">
    <div class="innerRow">
      <input id="teamName-0" class="field bigField" type="text" value={teamName[0]} placeholder="Home Team" oninput={(e) => notEmpty(e)} />
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input autocomplete="off" class="field goal" style="flex:3" type="text" oninput={(e) => homeGoalTrack[i].time = readTime(e)} />
          <input autocomplete="off" class="field normal" type="text" bind:value={homeGoalTrack[i].type} />
        </div>
      {/each}
    </div>
    <div class="innerRow" style="margin-bottom:10px;">
      <input autocomplete="off" class="field bigField" type="text" placeholder="Coach"/>
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input autocomplete="off" class="field normal" type="numeric" oninput={(e) => homeGoalTrack[i].main = readPlayerno(e)}/>
          <input autocomplete="off" class="field normal" inputmode="numeric" oninput={(e) => homeGoalTrack[i].assist = readPlayerno(e)}/>
        </div>
      {/each}
    </div>
    <div class="innerRow">
      <input id="teamName-1" autocomplete="off" class="field bigField" type="text" value={teamName[1]} placeholder="Away Team" oninput={(e) => notEmpty(e)} />
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input autocomplete="off" class="field goal" style="flex:3" type="text" oninput={(e) => awayGoalTrack[i].time = readTime(e)} />
          <input autocomplete="off" class="field normal" type="text" bind:value={awayGoalTrack[i].type} />
        </div>
      {/each}
    </div>
    <div class="innerRow">
      <input autocomplete="off" class="field bigField" type="text" placeholder="Coach" />
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input autocomplete="off" class="field normal" inputmode="numeric" oninput={(e) => awayGoalTrack[i].main = readPlayerno(e)} />
          <input autocomplete="off" class="field normal" inputmode="numeric" oninput={(e) => awayGoalTrack[i].assist = readPlayerno(e)} />
        </div>
      {/each}
    </div>
  </div>

  <Goals></Goals>
</div>

<style>
  .goal{
    font-size:10px;
  }

  .boxes {
    flex: 1;
    max-width: 100%;
    flex-direction: row;
    display: flex;
    min-width: 0;
  }

  .outer {
    max-width: 85%;
    margin-right: 10px;
  }

  .bigField {
    flex: 3;
    text-align: left;
    margin-right: 10px;
  }
</style>
