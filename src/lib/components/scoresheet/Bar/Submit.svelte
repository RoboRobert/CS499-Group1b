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
    saves,
    shots,
    teamName,
    timeouts,
  } from "../data.svelte";
  import type { SheetErr } from "$lib/backendChecker";
  import { addIDError } from "../frontendChecker.svelte";
  import { goto } from "$app/navigation";

  let showConfirmModal = false;
  let showConfirmButton = false;

  let message = "";

  // First checks if the scoresheet is valid.
  // If the scoresheet is valid, sends it to the scoresheet/add endpoint.
  async function confirmScoresheet() {
    // checkScoresheet();

    goto("/");
  }

  async function checkScoresheet() {
    const scoresheetData = {
      teamName: teamName,
      players: players,
      saves: saves,
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

    console.log(scoresheetJSON);

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
      
      let errors: SheetErr[] = data.errors;
      console.log(errors);
      if(errors.length > 0) {
        showConfirmModal = true;

        // Mark all the errors found by the backend validator
        for(const error of errors) {
          addIDError(error.elementID, error.message);
        }

        message = `${errors.length} errors detected in the scoresheet.\nAll errors have been marked in red on the sheet.`
      }
      else {
        showConfirmModal = true;
        showConfirmButton = true;

        message = "No errors detected in the scoresheet."
      }
    } catch (error) {
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
