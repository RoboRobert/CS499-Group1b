<script lang="ts">
    let settings = false;
    function toggleSettings() {
        settings = !settings;
    }
</script>

<div class="noBorder">
    <img class="svg" src="/svgs/book-user-svgrepo-com.svg" alt="The list of game meta information" onpointerup={toggleSettings}>

    {#if settings}
        <div class="dropdown"></div>
    {/if}
</div>


<style>
    .dropdown {
        position:fixed;
        height:100px;
        width:1000px;
        background-color: aliceblue;
    }

    img {
        width:50px;
        height:50px;
    }

    img:hover {
        background-color: lightgray;
    }
</style>