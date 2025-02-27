<div class="outer">
    <input class="field" type="text">
    <input class="field" type="text">
    <input class="field" type="text" style="flex:2">
    <input class="field" type="text">
    <input class="field" type="text">
    <input class="field" type="text">
    <input class="field" type="text">
    <input class="field" type="text">
</div>

<style>
    .outer {
        display: flex;
        flex-direction:row;
        border: 1px solid black;
    }

    .field {
        box-sizing: border-box;
        text-align: center;
        flex: 1;
        min-width: 0;
        height:20px;
    }
</style>