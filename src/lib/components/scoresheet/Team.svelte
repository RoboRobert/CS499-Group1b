<script lang="ts">
  import { readPlayerno, readString } from "$lib/checkers/frontendChecker.svelte";
  import { game_quarter, getPlayer, players } from "./data.svelte";

  interface Side {
    teamName: string;
    side: number;
  }

  function modifyShot(event: any, side: number, index: number) {
    const value = Number(event.target.value);

    const otherShots: number = players[side][index].shots.reduce((sum, value, index) => {
      return index === game_quarter.quarter ? sum : sum + value;}, 0);
    if (value < otherShots) {
      event.target.value = otherShots;
      return;
    }

    players[side][index].shots[game_quarter.quarter] = value - otherShots;
  }

  function modifyGB(event: any, side: number, index: number) {
    const value = Number(event.target.value);

    const otherGBs: number = players[side][index].groundBalls.reduce((sum, value, index) => {
      return index === game_quarter.quarter ? sum : sum + value;
    }, 0);
    if (value < otherGBs) {
      event.target.value = otherGBs;
      return;
    }

    players[side][index].groundBalls[game_quarter.quarter] = value - otherGBs;
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
    <div class="rowBox thin">GBS</div>
    <div class="rowBox thin">SHOTS</div>
    <div class="rowBox thin">G</div>
    <div class="rowBox thin">A</div>
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
          <input autocomplete="off" type="checkbox" bind:checked={players[side][i].quarters.q1} />
          <div class="custom-checkbox">1</div>
        </label>
        <label class="checkbox-wrapper">
          <input autocomplete="off" type="checkbox" bind:checked={players[side][i].quarters.q2} />
          <div class="custom-checkbox">2</div>
        </label>
        <label class="checkbox-wrapper">
          <input autocomplete="off" type="checkbox" bind:checked={players[side][i].quarters.q3} />
          <div class="custom-checkbox">3</div>
        </label>
        <label class="checkbox-wrapper">
          <input autocomplete="off" type="checkbox" bind:checked={players[side][i].quarters.q4} />
          <div class="custom-checkbox">4</div>
        </label>
        <label class="checkbox-wrapper">
          <input autocomplete="off" type="checkbox" bind:checked={players[side][i].quarters.ot} />
          <div class="custom-checkbox">OT</div>
        </label>
      </div>
      <!-- <input id="playerQuarters-{side}-{i}" autocomplete="off" class="field normal" type="text" bind:value={players[side][i].quarters}> -->
      <input
        id="playerGBs-{side}-{i}"
        min="0"
        autocomplete="off"
        class="field thin"
        type="number"
        value={players[side][i].groundBalls.reduce((c, p) => c + p)}
        onchange={(e) => modifyGB(e, side, i)}
      />
      <input id="playerShots-{side}-{i}" min="0" autocomplete="off" class="field thin" type="number" value={players[side][i].shots.reduce((c, p) => c + p, 0)} onchange={(e) => modifyShot(e, side, i)} />
      <div class="rowBox thin">{getPlayer(side, players[side][i].number).goals}</div>
      <div class="rowBox thin">{getPlayer(side, players[side][i].number).assists}</div>
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
    /* border-radius: 4px; */
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
    min-width: 0px;
    min-height: 0px;
    padding: 0px;
    font-size: 0.65vw;
    padding: 0px;
    text-align: center;
    /* box-sizing: border-box; */
  }

  /* Show text only when checked */
  .checkbox-wrapper input[type="checkbox"]:checked + .custom-checkbox::before {
    content: "✓";
    position: absolute;
    color: green;
    font-size: 0.8vw;
    padding: 0px;
    
  }

  /* Optional: Change background on check */
  .checkbox-wrapper input[type="checkbox"]:checked + .custom-checkbox {
    background-color: #e0ffe0;
    /* border-color: green; */
    border: 1px solid var(--clr-outer);
    padding: 0px;
  }
</style>
