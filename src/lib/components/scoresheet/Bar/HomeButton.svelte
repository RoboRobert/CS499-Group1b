<script lang="ts">
  
  function goHome() {
    location.href = `/`;
  }
</script>

<div class="top-bar-item thin">
  <img class="svg" src="/svgs/home-svgrepo-com.svg" alt="Button to go home" onpointerup={goHome} />
  <div>GO HOME</div>
</div>
