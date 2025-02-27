<script>
    import Player from "./Player.svelte";

    let numPlayers = 31;
</script>
<div class="outer">
    <div class="headerBox">HOME TEAM</div>
    <div class="teamHeader">
        <div class="headerBox">PO</div>
        <div class="headerBox">#</div>
        <div class="headerBox" style="flex:2">Name</div>
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
    .teamHeader {
        display: flex;
        flex-direction:row;
        border: 1px solid black;
    }

    .headerBox {
        flex: 1;
        text-align:center;
        border: 1px solid black;
        box-sizing: border-box;
    }
    .outer {
        border: 1px solid black;
        resize:horizontal;
        overflow:hidden;
    }
</style>