<script lang="ts">
</script>

<div class="outer">
    <div class="headerBox">SAVES</div>
    <div class="teamHeader">
        <div class="headerBox">GOALIE #</div>
        <div class="headerBox">QTR 1</div>
        <div class="headerBox">QTR 2</div>
        <div class="headerBox">QTR 3</div>
        <div class="headerBox">QTR 4</div>
        <div class="headerBox">O.T.</div>
        <div class="headerBox">TOTAL</div>
    </div>

    <div class="saves">
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <div class="headerBox">26</div>
    </div>
    <div class="saves">
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <div class="headerBox">26</div>
    </div>
    <div class="saves">
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <input class="field" type="number" />
        <div class="headerBox">26</div>
    </div>
</div>

<style>
    .teamHeader {
        display: flex;
        flex-direction: row;
        border: 1px solid black;
    }

    .headerBox {
        flex: 1;
        text-align: center;
        border: 1px solid black;
        box-sizing: border-box;
    }
    .outer {
        border: 1px solid black;
        resize: horizontal;
        overflow: hidden;
        max-width: 100%;
        margin-bottom:10px;
    }

    .saves {
        display: flex;
        flex-direction: row;
        border: 1px solid black;
    }

    .field {
        box-sizing: border-box;
        text-align: center;
        flex: 1;
        min-width: 0;
        max-height: 50px;
        min-height: 20px;
    }
</style>
