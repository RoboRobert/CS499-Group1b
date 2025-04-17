<script lang="ts">
  import { game_id } from "../scoresheet/data.svelte";

  // Exit the current scoresheet
  async function exitScoresheet() {
    location.href = `/pastgames/${game_id.game_id}`;
  }
</script>

<div class="thin">
  <button class="button" onclick={exitScoresheet}>EXIT SCORESHEET</button>
</div>

<style>
  button {
    height: 75%;
  }
  
  .thin {
    display: flex;
    justify-content: end;
    margin-right: 10px;
    align-items: center;
  }
</style>
