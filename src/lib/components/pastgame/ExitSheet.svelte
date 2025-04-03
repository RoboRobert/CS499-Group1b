<script lang="ts">
    import { goto } from "$app/navigation";
  
    // Exit the current scoresheet
    async function exitScoresheet() {
      goto("/");
    }
  </script>
  
  <div class="noBorder">
    <button onclick={exitScoresheet}>EXIT SCORESHEET</button>
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
  