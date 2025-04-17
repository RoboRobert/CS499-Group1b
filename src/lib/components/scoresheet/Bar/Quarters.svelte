<script lang="ts">
  import { game_quarter } from "../data.svelte";  
</script>

<div class="radio-group">
  <button class="button toggleButton {game_quarter.quarter === 1 ? 'active' : ''}" onclick={() => game_quarter.quarter = 1}>QTR 1</button>

  <button class="button toggleButton {game_quarter.quarter === 2 ? 'active' : ''}" onclick={() => game_quarter.quarter = 2}>QTR 2</button>

  <button class="button toggleButton {game_quarter.quarter === 3 ? 'active' : ''}" onclick={() => game_quarter.quarter = 3}>QTR 3</button>

  <button class="button toggleButton {game_quarter.quarter === 4 ? 'active' : ''}" onclick={() => game_quarter.quarter = 4}>QTR 4</button>

  <button class="button toggleButton {game_quarter.quarter === 5 ? 'active' : ''}" onclick={() => game_quarter.quarter = 5}>O.T.</button>
</div>

<style> 
  .radio-group {
    flex: 0.5;
    display: flex;
    align-items: center;
    border: 1px solid var(--clr-outer);
    border-radius: 5px;
    background-color: var(--clr-input);
    color: var(--clr-home);
    min-width: 0px;
  }

  .toggleButton {
    font-size: 0.7vw;
  }
</style>