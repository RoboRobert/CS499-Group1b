<script lang="ts">
    // Only allows digits to be entered
    function allowDigits(event: any) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
</script>

<div class="outer">
    <div class="headerBox">TIMEOUTS</div>
    <div class="teamHeader">
        <div class="headerBox">First Half</div>
        <div class="headerBox">Second Half</div>
        <div class="headerBox">1 O.T.</div>
        <div class="headerBox">2 O.T.</div>
    </div>

    <div class="timeout">
        <input class="field" type="text" />
        <input class="field" type="text" />
        <input class="field" type="text" />
        <input class="field" type="text" />
        <input class="field" type="text" />
        <input class="field" type="text" />
        <input class="field" type="text" />
        <input class="field" type="text" />
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

    .timeout {
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
