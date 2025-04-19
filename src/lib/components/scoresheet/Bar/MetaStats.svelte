<script lang="ts">
  import { checkMetaStat } from "$lib/checkers/frontendChecker.svelte";
  import { metaStats } from "../data.svelte";

  function toggleMetaStats() {
    document.getElementById("metaStats").classList.toggle("hidden");
  }
  
</script>

<div  class="top-bar-item thin">
  <svg id="metaStatsButton" class="svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onpointerup={toggleMetaStats}>
    <path d="M5 19V6.2C5 5.0799 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.0799 19 6.2V17H7C5.89543 17 5 17.8954 5 19ZM5 19C5 20.1046 5.89543 21 7 21H19M18 17V21M15 13.5C14.7164 12.3589 13.481 11.5 12 11.5C10.519 11.5 9.28364 12.3589 9 13.5M12 7.5H12.01M13 7.5C13 8.05228 12.5523 8.5 12 8.5C11.4477 8.5 11 8.05228 11 7.5C11 6.94772 11.4477 6.5 12 6.5C12.5523 6.5 13 6.94772 13 7.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <!-- <div class="topText">META GAME STATS</div> -->
</div>


<div id="metaStats" class="modal-backdrop">
  <div class="modal-content">
    <h2>META STATS</h2>
    <!-- Bind input values and handle form submission -->
    <div class="form-group">
      <label for="date">Date:</label>
      <input id="metaStats-date" autocomplete="off" type="date" name="date" bind:value={metaStats.date} oninput={(e) => checkMetaStat(e)} />
    </div>
    <div class="form-group">
      <label for="site">Site:</label>
      <input id="metaStats-site" autocomplete="off" type="text" name="site" bind:value={metaStats.site} />
    </div>
    <div class="form-group">
      <label for="gameStart">Game Start:</label>
      <input id="metaStats-gameStart" autocomplete="off" type="time" name="gameStart" bind:value={metaStats.gameStart} oninput={(e) => checkMetaStat(e)}/>
    </div>
    <div class="form-group">
      <label for="scorekeeper">Scorekeeper:</label>
      <input id="metaStats-scorekeeper" autocomplete="off" type="text" name="scorekeeper" bind:value={metaStats.scorekeeper} oninput={(e) => checkMetaStat(e)}/>
    </div>
    <div class="form-group">
      <label for="oppScorekeeper">Away Scorekeeper:</label>
      <input id="metaStats-oppScorekeeper" autocomplete="off" type="text" name="oppScorekeeper" bind:value={metaStats.oppScorekeeper} />
    </div>
    <div class="form-group">
      <label for="timeKeeper">Time Keeper:</label>
      <input id="metaStats-timeKeeper" autocomplete="off" type="text" name="timeKeeper" bind:value={metaStats.timeKeeper} />
    </div>
    <div class="form-group">
      <label for="headOfficial">Head Official:</label>
      <input id="metaStats-headOfficial" autocomplete="off" type="text" name="headOfficial" bind:value={metaStats.headOfficial} />
    </div>
    <div class="form-group">
      <label for="umpire">Umpire:</label>
      <input id="metaStats-umpire" autocomplete="off" type="text" name="umpire" bind:value={metaStats.umpire} />
    </div>
    <div class="form-group">
      <label for="fieldJudge">Field Judge:</label>
      <input id="metaStats-fieldJudge" autocomplete="off" type="text" name="fieldJudge" bind:value={metaStats.fieldJudge} />
    </div>
    <div class="form-group">
      <label for="lengthOfQuarters">Length of Quarters:</label>
      <input id="metaStats-lengthOfQuarters" autocomplete="off" type="text" name="lengthOfQuarters" bind:value={metaStats.lengthOfQuarters} />
    </div>
    <div class="form-group">
      <label for="weatherCondition">Weather Condition:</label>
      <input id="metaStats-weatherCondition" autocomplete="off" type="text" name="weatherCondition" bind:value={metaStats.weatherCondition} />
    </div>
    <div class="modal-actions">
      <button onclick={toggleMetaStats} class="sign-in-button">Add Changes</button>
    </div>
  </div>
</div>
