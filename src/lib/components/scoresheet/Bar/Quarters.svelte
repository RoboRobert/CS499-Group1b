<script lang="ts">
  import { game_quarter } from "../data.svelte";  
</script>

<div class="quarters thin">
  <div class="radio-group thickBorder">
    <div>CURRENT QUARTER: </div>
    <div class="radio-item">
      <input type="radio" id="option1" name="quarter" value="1" bind:group={game_quarter.quarter}/>
      <label for="option1">1</label>
    </div>
    <div class="radio-item">
      <input type="radio" id="option2" name="quarter" value="2" bind:group={game_quarter.quarter}/>
      <label for="option2">2</label>
    </div>
    <div class="radio-item">
      <input type="radio" id="option3" name="quarter" value="3" bind:group={game_quarter.quarter}/>
      <label for="option3">3</label>
    </div>
    <div class="radio-item">
      <input type="radio" id="option4" name="quarter" value="4" bind:group={game_quarter.quarter}/>
      <label for="option4">4</label>
    </div>
    <div class="radio-item">
      <input type="radio" id="option5" name="quarter" value="5" bind:group={game_quarter.quarter}/>
      <label for="option5">O.T.</label>
    </div>
  </div>
</div>


<style>
  .radio-group {
    flex:1;
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
    padding:5px;
  }

  .radio-item {
    text-align: center;
    margin:5px;
  }

  .radio-item label {
    display: block;
    margin-top: 5px;
  }
</style>
