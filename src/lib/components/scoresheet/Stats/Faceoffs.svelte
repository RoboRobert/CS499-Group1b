<script lang="ts">

</script>

<div class="outer">
    <div class="headerBox">FACEOFFS</div>
    <div class="grid">
        <div class="headerBox"></div>
        <div class="headerBox">WON</div>
        <div class="headerBox">LOST</div>
        <div class="headerBox"></div>
        <div class="headerBox">QTR 1</div>
        <input class="field" type="number" value="0">
        <input class="field" type="number" value="0">
        <div class="headerBox">7/11</div>
        <div class="headerBox">QTR 2</div>
        <input class="field" type="number" value="0">
        <input class="field" type="number" value="0">
        <div class="headerBox">7/11</div>
        <div class="headerBox">QTR 3</div>
        <input class="field" type="number" value="0">
        <input class="field" type="number" value="0">
        <div class="headerBox">7/11</div>
        <div class="headerBox">QTR 4</div>
        <input class="field" type="number" value="0">
        <input class="field" type="number" value="0">
        <div class="headerBox">7/11</div>
        <div class="headerBox">O.T.</div>
        <input class="field" type="number" value="0">
        <input class="field" type="number" value="0">
        <div class="headerBox">7/11</div>
        <div class="headerBox"></div>
        <div class="headerBox" style="grid-column: 2 / span 2;">TOTALS</div>
        <div class="headerBox">35/55</div>
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
        grid-template-columns: repeat(4, 1fr);
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