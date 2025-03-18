<script lang="ts">
  import Goals from "./Goals.svelte";

  import { homeGoalTrack, awayGoalTrack } from "../data.svelte";

  let numGoals = 30;
</script>

<div class="wideRow">
  <div class="outer noBorder">
    <div class="innerRow">
      <input class="field bigField" type="text" placeholder="Home Team" />
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input autocomplete="off" class="field" style="flex:3" type="text" bind:value={homeGoalTrack[i].time} />
          <input autocomplete="off" class="field normal" type="text" bind:value={homeGoalTrack[i].type} />
        </div>
      {/each}
    </div>
    <div class="innerRow" style="margin-bottom:10px;">
      <input autocomplete="off" class="field bigField" type="text" placeholder="Coach" />
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input autocomplete="off" class="field normal" type="text" oninput={(e) => (homeGoalTrack[i].main = Number(e.currentTarget.value))} />
          <input autocomplete="off" class="field normal" inputmode="numeric" oninput={(e) => (homeGoalTrack[i].assist = Number(e.currentTarget.value))} />
        </div>
      {/each}
    </div>
    <div class="innerRow">
      <input autocomplete="off" class="field bigField" type="text" placeholder="Away Team" />
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input autocomplete="off" class="field" style="flex:3" type="text" bind:value={awayGoalTrack[i].time} />
          <input autocomplete="off" class="field normal" type="text" bind:value={awayGoalTrack[i].type} />
        </div>
      {/each}
    </div>
    <div class="innerRow">
      <input autocomplete="off" class="field bigField" type="text" placeholder="Coach" />
      {#each Array(numGoals) as attempt, i}
        <div class="boxes">
          <input autocomplete="off" class="field normal" inputmode="numeric" oninput={(e) => (awayGoalTrack[i].main = Number(e.currentTarget.value))} />
          <input autocomplete="off" class="field normal" inputmode="numeric" oninput={(e) => (awayGoalTrack[i].assist = Number(e.currentTarget.value))} />
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
