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
  import { checkScoresheet, uploadScoresheet } from "$lib/conversion/submit";

  let showConfirmModal = false;
  let showConfirmButton = false;

  let message = "";

  // Sends the scoresheet to the add endpoint
  async function confirmScoresheet() {
    await uploadScoresheet();

    goto("/", { invalidateAll: true });
  }

  async function runCheck() {
    let errors: SheetErr[] = await checkScoresheet();
    if (errors.length > 0) {
      showConfirmButton = false;

      // Mark all the errors found by the backend validator
      for (const error of errors) {
        // Try to mark an error. If failure, move on to the next one.
        try {
          addIDError(error.elementID, error.message);
        } catch {}
      }

      message = `${errors.length} errors detected in the scoresheet.\nAll errors have been marked in red on the sheet.`;
    } else {
      showConfirmButton = true;

      message = "No errors detected in the scoresheet.";
    }
    showConfirmModal = true;
  }
</script>

<div class="thin">
  <button onclick={runCheck}>SUBMIT SCORESHEET</button>

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
  .modal-actions {
    margin: 10px;
  }

  button {
    justify-content: end;
    height: 100%;
  }
</style>
