<script lang="ts">

</script>

<div class="outer">
    <div class="headerBox">STATISTICS</div>
    <div class="quarter">
        <div class="test">
            <p class="vertical">GROUNDBALLS</p>
        </div>
        <div class="testColumn">
            <div class="quarterBox">1</div>
            <div class="quarterBox">2</div>
            <div class="quarterBox">3</div>
            <div class="quarterBox">4</div>
            <div class="quarterBox">OT</div>
            <div class="quarterBox" style="border:none"></div>
        </div>
        <div style="min-width: 0;">
            <div class="quarter">
                <input class="field" type="text">
                <input class="field" type="text">
            </div>
            <div class="quarter">
                <input class="field" type="text">
                <input class="field" type="text">
            </div>
            <div class="quarter">
                <input class="field" type="text">
                <input class="field" type="text">
            </div>
            <div class="quarter">
                <input class="field" type="text">
                <input class="field" type="text">
            </div>
            <div class="quarter">
                <input class="field" type="text">
                <input class="field" type="text">
            </div>
            <div class="quarter">
                <div class="field" style="flex:3">TOTALS</div>
                <div class="field" style="flex:1">20</div>
            </div>
        </div>
    </div>
</div>

<style>
    .test {
        width:20px;
        display: flex;
        flex-direction: column;  /* Align children vertically */
        justify-content: flex-end;  /* Push children to the bottom */
    }

    .testColumn {
        display: flex;
        flex-direction: column;
    }

    .quarterBox {
        flex:1;
        font-size:smaller;
        text-align:center;
        border: 1px solid black;
        box-sizing: border-box;
        min-width: 25px;
    }

    .quarter {
        display: flex;
        flex-direction:row;
        /* border: 1px solid black; */
    }

    .headerBox {
        flex: 1;
        text-align:center;
        border: 1px solid black;
        box-sizing: border-box;
        height:100%;
    }
    .outer {
        resize:horizontal;
        overflow:hidden;
        max-width:100%;
    }

    .vertical {
        transform:rotate(-90deg);
        font-size:smaller;
    }

    .field {
        box-sizing: border-box;
        text-align: center;
        flex: 1;
        min-width: 0;
        max-height:50px;
        min-height:20px;
        border: 1px solid black;
    }
</style>