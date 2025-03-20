<script lang="ts">
  import { base } from "$app/paths";
  import { json } from "@sveltejs/kit";
  import {
    awayGoals,
    awayGoalTrack,
    clears,
    extraMan,
    faceoffs,
    groundBalls,
    homeGoals,
    homeGoalTrack,
    metaStats,
    penalties,
    players,
    shots,
    timeouts,
  } from "../data.svelte";

  let showConfirmModal = false;
  let showConfirmButton = false;

  let message = "";

  // First checks if the scoresheet is valid.
  // If the scoresheet is valid, sends it to the scoresheet/add endpoint.
  async function confirmScoresheet() {
    checkScoresheet();
  }

  async function checkScoresheet() {
    const scoresheetData = {
      players: players,
      homeGoals: homeGoals,
      awayGoals: awayGoals,
      homeGoalTrack: homeGoalTrack,
      awayGoalTrack: awayGoalTrack,
      groundBalls: groundBalls,
      shots: shots,
      clears: clears,
      faceoffs: faceoffs,
      extraMan: extraMan,
      timeouts: timeouts,
      penalties: penalties,
      metaStats: metaStats,
    };
    const scoresheetJSON = JSON.stringify(scoresheetData);

    // Ask the scoresheet/check endpoint if the scoresheet is valid.
    try {
      const result = await fetch("/api/scoresheet/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: scoresheetJSON,
      });

      // Await the JSON data resolution
      const data = await result.json();

      // Check if the response is ok (status 200-299)
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      // Access the message after resolving the promise
      message = data.message;

      console.log(result);
      showConfirmModal = true;
      showConfirmButton = true;
    } catch (error) {
      showConfirmModal = true;
      console.error(error);
    }
  }
</script>

<div class="noBorder">
  <button onclick={checkScoresheet}>SUBMIT SCORESHEET</button>

  {#if showConfirmModal}
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2>SUBMIT SCORESHEET</h2>
        <h2>{message}</h2>
        {#if showConfirmButton}
          <div class="modal-actions">
            <button onclick={confirmScoresheet} class="sign-in-button">Confirm Scoresheet</button>
          </div>
        {/if}
        <div class="modal-actions">
          <button
            onclick={() => {
              showConfirmButton = false;
              showConfirmModal = false;
            }}
            class="sign-in-button">Keep Editing</button
          >
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .noBorder {
    /* display:flex; */
    align-content: end;
  }

  .modal-actions {
    margin: 10px;
  }

  button {
    justify-content: end;
    height: 100%;
  }
</style>
