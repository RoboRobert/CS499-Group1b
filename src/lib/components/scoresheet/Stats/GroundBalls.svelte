<script lang="ts">

</script>

<div class="outer">
    <div class="headerBox">GROUND BALLS</div>
    <div class="grid">
        <div class="headerBox">QTR 1</div>
        <input class="field" type="number" value="0">
        <div class="headerBox">QTR 2</div>
        <input class="field" type="number" value="0">
        <div class="headerBox">QTR 3</div>
        <input class="field" type="number" value="0">
        <div class="headerBox">QTR 4</div>
        <input class="field" type="number" value="0">
        <div class="headerBox">O.T.</div>
        <input class="field" type="number" value="0">
        <div class="headerBox">TOTALS</div>
        <div class="headerBox">26</div>
    </div>
</div>

<style>
    .headerBox {
        flex: 1;
        text-align:center;
        border: 1px solid black;
        box-sizing: border-box;
    }

    .grid {
        display:grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(6, 1fr);
    }

    .field {
        box-sizing: border-box;
        text-align: center;
        flex: 1;
        min-width: 0;
        max-height:50px;
        min-height:20px;
    }

    .outer {
        border: 1px solid black;
        resize:horizontal;
        overflow:hidden;
        max-width:100%;
        margin-bottom:10px;
    }
</style>