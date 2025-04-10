<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import type { SheetErr } from "$lib/checkers/backendChecker";
  import {
    clears,
    coachName,
    extraMan,
    faceoffs,
    game_id,
    getPlayerMap,
    goals,
    goalTrack,
    groundBalls,
    metaStats,
    penalties,
    saves,
    shots,
    teamName,
    timeouts,
    type SheetData,
  } from "../data.svelte";
  import { addIDError } from "$lib/checkers/frontendChecker.svelte";

  let showConfirmModal = false;
  let showConfirmButton = false;

  let message = "";

  function checkObj(object): boolean {
    return Object.values(object).every((value) => value != null && value != undefined);
  }

  function getScoresheetData(): SheetData {
    return {
      game_id: game_id.game_id,
      coachName: coachName,
      teamName: teamName,
      players: [Array.from(getPlayerMap(0).values()), Array.from(getPlayerMap(1).values())],
      saves: saves,
      goals: goals,
      goalTrack: [goalTrack[0].filter((p) => checkObj(p)), goalTrack[1].filter((p) => checkObj(p))],
      groundBalls: groundBalls,
      shots: shots,
      clears: clears,
      faceoffs: faceoffs,
      extraMan: extraMan,
      timeouts: timeouts,
      penalties: [penalties[0].filter((p) => checkObj(p)), penalties[1].filter((p) => checkObj(p))],
      metaStats: metaStats,
    };
  }

  // Sends the scoresheet to the add endpoint
  async function confirmScoresheet() {
    uploadScoresheet();

    goto("/", {invalidateAll: true});
  }

  async function uploadScoresheet() {
    const scoresheetData: SheetData = getScoresheetData();
    const scoresheetJSON = JSON.stringify(scoresheetData);

    // Send the scoresheet data to the scoresheet/add endpoint
    try {
      const result = await fetch("/api/scoresheet/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: scoresheetJSON,
      });

      // Await the JSON data resolution
      const data = await result.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function checkScoresheet() {
    const scoresheetData: SheetData = getScoresheetData();
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
      if (errors.length > 0) {
        showConfirmModal = true;

        // Mark all the errors found by the backend validator
        for (const error of errors) {
          // Try to mark an error. If failure, move on to the next one.
          try {
            addIDError(error.elementID, error.message);
          }
          catch {}
        }

        message = `${errors.length} errors detected in the scoresheet.\nAll errors have been marked in red on the sheet.`;
      } else {
        showConfirmModal = true;
        showConfirmButton = true;

        message = "No errors detected in the scoresheet.";
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
            class="cancel-button">Keep Editing</button
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
