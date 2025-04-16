<script lang="ts">
  import type { SheetErr } from "$lib/checkers/backendChecker";
  import { addIDError } from "$lib/checkers/frontendChecker.svelte";
  import { checkScoresheet, uploadScoresheet } from "$lib/conversion/submit";

  let showConfirmModal = false;
  let showConfirmButton = false;

  let message = "";

  // Sends the scoresheet to the add endpoint
  async function confirmScoresheet() {
    await uploadScoresheet();

    location.href = `/`;
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
  <button class="button" onclick={runCheck}>SUBMIT SCORESHEET</button>

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
    height: 75%;
  }
  .thin{
    display: flex;
    justify-content: end;
    margin-right: 10px;
    align-items: center;
  }
</style>
