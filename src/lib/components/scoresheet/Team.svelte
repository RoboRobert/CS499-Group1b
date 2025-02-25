<script>
    import Player from "./Player.svelte";

    let numPlayers = 31;
</script>
<div class="outer">
    <div class="header">HOME TEAM</div>
    <div class="teamHeader">
        <div class="headerBox">PO</div>
    </div>
    {#each Array(numPlayers) as player}
        <Player></Player>
    {/each}
</div>

<style>
    .header {
        border: 1px solid black;
    }

    .teamHeader {
        display: flex;
        flex-direction:row;
        border: 1px solid black;
        width: 200px;
        height:fit-content;
    }

    .headerBox {
        border: 1px solid red;
    }
    .outer {
        border: 1px solid black;
        width: 200px;
    }
</style>