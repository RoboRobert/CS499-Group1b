<script lang="ts">
  import { metaStats } from "../data.svelte";

  function toggleMetaStats() {
    document.getElementById("metaStats").classList.toggle("hidden");
  }
  
</script>

<div  class="top-bar-item">
  <img id="metaStatsButton" class="svg" src="/svgs/book-user-svgrepo-com.svg" alt="The list of game meta information" onpointerup={toggleMetaStats} />
  <div>META GAME STATS</div>
</div>


<div id="metaStats" class="modal-backdrop">
  <div class="modal-content">
    <h2>META STATS</h2>
    <!-- Bind input values and handle form submission -->
    <div class="form-group">
      <label for="date">Date:</label>
      <input id="metaStats-date" type="date" name="date" bind:value={metaStats.date} />
    </div>
    <div class="form-group">
      <label for="site">Site:</label>
      <input id="metaStats-site" type="text" name="site" bind:value={metaStats.site} />
    </div>
    <div class="form-group">
      <label for="gameStart">Game Start:</label>
      <input id="metaStats-gameStart" type="time" name="gameStart" bind:value={metaStats.gameStart} />
    </div>
    <div class="form-group">
      <label for="scorekeeper">Scorekeeper:</label>
      <input id="metaStats-scorekeeper" type="text" name="scorekeeper" bind:value={metaStats.scorekeeper} />
    </div>
    <div class="form-group">
      <label for="oppScorekeeper">Away Scorekeeper:</label>
      <input id="metaStats-oppScorekeeper" type="text" name="oppScorekeeper" bind:value={metaStats.oppScorekeeper} />
    </div>
    <div class="form-group">
      <label for="timeKeeper">Time Keeper:</label>
      <input id="metaStats-timeKeeper" type="text" name="timeKeeper" bind:value={metaStats.timeKeeper} />
    </div>
    <div class="form-group">
      <label for="headOfficial">Head Official:</label>
      <input id="metaStats-headOfficial" type="text" name="headOfficial" bind:value={metaStats.headOfficial} />
    </div>
    <div class="form-group">
      <label for="umpire">Umpire:</label>
      <input id="metaStats-umpire" type="text" name="umpire" bind:value={metaStats.umpire} />
    </div>
    <div class="form-group">
      <label for="fieldJudge">Field Judge:</label>
      <input id="metaStats-fieldJudge" type="text" name="fieldJudge" bind:value={metaStats.fieldJudge} />
    </div>
    <div class="form-group">
      <label for="lengthOfQuarters">Length of Quarters:</label>
      <input id="metaStats-lengthOfQuarters" type="text" name="lengthOfQuarters" bind:value={metaStats.lengthOfQuarters} />
    </div>
    <div class="form-group">
      <label for="weatherCondition">Weather Condition:</label>
      <input id="metaStats-weatherCondition" type="text" name="weatherCondition" bind:value={metaStats.weatherCondition} />
    </div>
    <div class="modal-actions">
      <button onclick={toggleMetaStats} class="sign-in-button">Add Changes</button>
    </div>
  </div>
</div>


<style>
  img {
    width: 50px;
    height: 50px;
  }

  img:hover {
    background-color: lightgray;
  }
</style>
