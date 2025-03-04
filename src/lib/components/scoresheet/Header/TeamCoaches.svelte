<script lang="ts">
    let numPenalties = 18;
</script>

<div class="outer">
    <input class="field" type="">
    <div class="field"></div>
    <div class="field"></div>
    <div class="field"></div>
</div>

<style>
    .field {
        box-sizing: border-box;
        text-align: center;
        flex: 1;
        min-width: 0;
        max-height:50px;
        min-height:20px;
        border: 1px solid black;
    }

    .outer {
        border: 1px solid black;
        resize:horizontal;
        overflow:hidden;
        max-width:100%;
        margin-bottom:10px;
        width:100px;
    }
</style>