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
        <h2>Edit Team</h2>
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
        <div class="modal-actions">
          <button type="button" onclick={toggleMetaStats} class="cancel-button">Cancel</button>
          <button class="sign-in-button">Add Changes</button>
        </div>
      </div>
    </div>
  {/if}
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
