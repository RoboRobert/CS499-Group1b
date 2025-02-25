<script>
    import Player from "./Player.svelte";

    let numPlayers = 31;
</script>
<div class="outer">
    <div class="header">HOME TEAM</div>
    <div class="teamHeader">
        <div class="headerBox">PO</div>
        <div class="headerBox">#</div>
        <div class="headerBox">Name</div>
        <div class="headerBox">Quarters</div>
        <div class="headerBox">Shots</div>
        <div class="headerBox">G</div>
        <div class="headerBox">A</div>
        <div class="headerBox">GBS</div>
    </div>
    {#each Array(numPlayers) as player}
        <Player></Player>
    {/each}
</div>

<style>
    .header {
        border: 1px solid black;
        text-align: center;
    }

    .teamHeader {
        display: flex;
        flex-direction:row;
        justify-content: space-evenly;
        border: 1px solid black;
    }

    .headerBox {
        border: 1px solid red;
        text-align: center;
        flex-grow: 1;
    }
    .outer {
        border: 1px solid black;
        max-width:300px;
    }
</style>