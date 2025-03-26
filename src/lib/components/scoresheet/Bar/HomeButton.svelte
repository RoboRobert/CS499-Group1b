<script lang="ts">
  import { goto } from "$app/navigation";

  function goHome() {
    goto("/");
  }
</script>

<div class="noBorder">
  <img class="svg" src="/svgs/home-svgrepo-com.svg" alt="Button to go home" onpointerup={goHome} />
  <div>GO HOME</div>
</div>

<style>
</style>
