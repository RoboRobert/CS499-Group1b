<script lang="ts">
    import { base } from "$app/paths";


    let settings = false;
    function toggleSettings() {
        settings = !settings;
    }
</script>

<div>
    <img class="svg" src="/svgs/gear-svgrepo-com.svg" alt="The settings menu" onpointerup={toggleSettings}>

    {#if settings}
        <div class="dropdown"></div>
    {/if}
</div>


<style>
    .dropdown {
        position:fixed;
        background-color: aliceblue;
        height:100px;
        width:1000px;
    }
</style>