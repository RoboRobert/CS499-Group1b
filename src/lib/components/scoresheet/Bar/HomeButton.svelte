<script lang="ts">
  import { goto } from "$app/navigation";

  function goHome() {
    goto("/", {replaceState:true});
  }
</script>

<div class="top-bar-item">
  <img class="svg" src="/svgs/home-svgrepo-com.svg" alt="Button to go home" onpointerup={goHome} />
  <div>GO HOME</div>
</div>
