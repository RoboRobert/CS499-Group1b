<script lang="ts">
    export let playerName: string = "";
</script>

<div class="outer">
    <input class="field" type="text">
    <input class="field" type="text">
    <input class="field" type="text">
</div>

<style>
    .outer {
        display: flex;
        flex-direction:row;
        border: 1px solid black;
        width: 200px;
        height:50px;
    }

    .field {
        border: 1px solid red;
        width: 50px;
        height:50px;
    }
</style>