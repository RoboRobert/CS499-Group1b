<script lang="ts">
  import { metaStats } from "../data.svelte";

  let showMetaStats = false;
  function toggleMetaStats() {
    showMetaStats = !showMetaStats;
  }

  let formErrors = {
    date: "",
    site: "",
    gameStart: "",
    scorekeeper: "",
    oppScorekeeper: "",
    timeKeeper: "",
    headOfficial: "",
    umpire: "",
    fieldJudge: "",
    lengthOfQuarters: "",
    weatherCondition: "",
  };
</script>

<div class="noBorder">
  <img class="svg" src="/svgs/book-user-svgrepo-com.svg" alt="The list of game meta information" onpointerup={toggleMetaStats} />

  {#if showMetaStats}
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2>META STATS</h2>
        <!-- Bind input values and handle form submission -->
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="text" name="date" bind:value={metaStats.date} />
          {#if formErrors.date}
            <p class="error">{formErrors.date}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="site">Site:</label>
          <input type="text" name="site" bind:value={metaStats.site} />
          {#if formErrors.site}
            <p class="error">{formErrors.site}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="gameStart">Game Start:</label>
          <input type="text" name="gameStart" bind:value={metaStats.gameStart} />
          {#if formErrors.gameStart}
            <p class="error">{formErrors.gameStart}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="scorekeeper">Scorekeeper:</label>
          <input type="text" name="scorekeeper" bind:value={metaStats.scorekeeper} />
          {#if formErrors.scorekeeper}
            <p class="error">{formErrors.scorekeeper}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="oppScorekeeper">Away Scorekeeper:</label>
          <input type="text" name="oppScorekeeper" bind:value={metaStats.oppScorekeeper} />
          {#if formErrors.oppScorekeeper}
            <p class="error">{formErrors.oppScorekeeper}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="timeKeeper">Time Keeper:</label>
          <input type="text" name="timeKeeper" bind:value={metaStats.timeKeeper} />
          {#if formErrors.timeKeeper}
            <p class="error">{formErrors.timeKeeper}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="headOfficial">Head Official:</label>
          <input type="text" name="headOfficial" bind:value={metaStats.headOfficial} />
          {#if formErrors.headOfficial}
            <p class="error">{formErrors.headOfficial}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="umpire">Umpire:</label>
          <input type="text" name="umpire" bind:value={metaStats.umpire} />
          {#if formErrors.umpire}
            <p class="error">{formErrors.umpire}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="fieldJudge">Field Judge:</label>
          <input type="text" name="fieldJudge" bind:value={metaStats.fieldJudge} />
          {#if formErrors.fieldJudge}
            <p class="error">{formErrors.fieldJudge}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="lengthOfQuarters">Length of Quarters:</label>
          <input type="text" name="lengthOfQuarters" bind:value={metaStats.lengthOfQuarters} />
          {#if formErrors.lengthOfQuarters}
            <p class="error">{formErrors.lengthOfQuarters}</p>
          {/if}
        </div>
        <div class="form-group">
          <label for="weatherCondition">Weather Condition:</label>
          <input type="text" name="weatherCondition" bind:value={metaStats.weatherCondition} />
          {#if formErrors.weatherCondition}
            <p class="error">{formErrors.weatherCondition}</p>
          {/if}
        </div>
        <div class="modal-actions">
          <button onclick={toggleMetaStats} class="sign-in-button">Add Changes</button>
        </div>
      </div>
    </div>
  {/if}
  <div>SETTINGS</div>
</div>

<style>
  .dropdown {
    position: fixed;
    height: 100px;
    width: 1000px;
    background-color: aliceblue;
  }

  img {
    width: 50px;
    height: 50px;
  }

  img:hover {
    background-color: lightgray;
  }
</style>
