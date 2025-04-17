<script lang="ts">
  import { readPlayerno, readString } from "$lib/checkers/frontendChecker.svelte";
  import { getPlayer, players } from "./data.svelte";

  interface Side {
    teamName: string;
    side: number;
  }

  let { teamName, side }: Side = $props();
</script>

<div class="outer">
  <div class="headerBox">{teamName}</div>
  <div class="headerRow">
    <div class="rowBox thin">PO</div>
    <div class="rowBox thin">#</div>
    <div class="rowBox wide">NAME</div>
    <div class="rowBox normal">QUARTERS</div>
    <div class="rowBox thin">SHOTS</div>
    <div class="rowBox thin">G</div>
    <div class="rowBox thin">A</div>
    <div class="rowBox thin">GBS</div>
  </div>
  {#each players[side] as player, i}
    <div class="innerRow">
      <select id="playerPosition-{side}-{i}" class="dropdown small thin" name="options" bind:value={players[side][i].position} autocomplete="off" oninput={(e) => readString(e)}>
        <option value=""></option>
        <option value="Mid">Mid</option>
        <option value="Attack">Attack</option>
        <option value="Defense">Defense</option>
        <option value="Goalie">Goalie</option>
      </select>
      <input
        id="playerNumber-{side}-{i}"
        min="0"
        max="99"
        autocomplete="off"
        class="field thin"
        type="number"
        bind:value={players[side][i].number}
        oninput={(e) => (players[side][i].number = readPlayerno(e))}
      />
      <input id="playerName-{side}-{i}" autocomplete="off" class="field wide" type="text" bind:value={players[side][i].name} oninput={(e) => readString(e)} />
      <div class="innerRow normal">
        <label class="checkbox-wrapper">
          <input type="checkbox" bind:checked={players[side][i].quarters.q1}/>
          <div class="custom-checkbox">1</div>
        </label>
        <label class="checkbox-wrapper">
            <input type="checkbox" bind:checked={players[side][i].quarters.q2}/>
            <div class="custom-checkbox">2</div>
          </label>
          <label class="checkbox-wrapper">
            <input type="checkbox" bind:checked={players[side][i].quarters.q3}/>
            <div class="custom-checkbox">3</div>
          </label>
          <label class="checkbox-wrapper">
            <input type="checkbox" bind:checked={players[side][i].quarters.q4}/>
            <div class="custom-checkbox">4</div>
          </label>
          <label class="checkbox-wrapper">
            <input type="checkbox" bind:checked={players[side][i].quarters.ot}/>
            <div class="custom-checkbox">OT</div>
          </label>
      </div>
      <!-- <input id="playerQuarters-{side}-{i}" autocomplete="off" class="field normal" type="text" bind:value={players[side][i].quarters}> -->
      <input id="playerShots-{side}-{i}" min="0" autocomplete="off" class="field thin" type="number" bind:value={players[side][i].shots} />
      <div class="rowBox thin">{getPlayer(side, players[side][i].number).goals}</div>
      <div class="rowBox thin">{getPlayer(side, players[side][i].number).assists}</div>
      <input id="playerGBs-{side}-{i}" min="0" autocomplete="off" class="field thin" type="number" bind:value={players[side][i].groundBalls} />
    </div>
  {/each}
</div>

<style>
  .checkbox-wrapper {
    flex: 1;
    position: relative;
    cursor: pointer;
    padding: 0px;
    background-color: var(--clr-input);
    border: 1px solid var(--clr-outer);
    border-radius: 4px;
  }

  /* Hide the default checkbox */
  .checkbox-wrapper input[type="checkbox"] {
    display: none;
  }

  /* Custom checkbox appearance */
  .custom-checkbox {
    height: 100%;
    color: var(--clr-home);
    user-select: none;
    font-size: 0.7vw;
    min-width: 0px;
    min-height:0px;
    padding: 0px;
    font-size: 0.8vw;
    padding: 2px;
    border-radius: 4px;
  }

  /* Show text only when checked */
  .checkbox-wrapper input[type="checkbox"]:checked + .custom-checkbox::before {
    content: "✓";
    position: absolute;
    color: green;
  }

  /* Optional: Change background on check */
  .checkbox-wrapper input[type="checkbox"]:checked + .custom-checkbox {
    background-color: #e0ffe0;
    border-color: green;
  }
</style>
