<script lang="ts">
    // Only allows digits to be entered
    function allowDigits(event: any) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
</script>

<div class="outer">
    <div class="headerBox">TIMEOUTS</div>
    <div class="headerRow">
        <div class="rowBox">First Half</div>
        <div class="rowBox">Second Half</div>
        <div class="rowBox">1 O.T.</div>
        <div class="rowBox">2 O.T.</div>
    </div>

    <div class="innerRow">
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
