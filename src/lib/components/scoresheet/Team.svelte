<script lang="ts">
    import { awayGoalTrack, homeGoalTrack, players } from "./data.svelte";

    interface Side {
        teamName: string,
        side:number,
    }

    // Maps player # to goals.
    // Stored as an array where goalMap[0] is home team, goalMap[1] is away team
    const goalMap = $derived.by(() => {
        let homeMap = new Map<number, number>();
        let awayMap = new Map<number, number>();
        homeGoalTrack.forEach((e) => {
            if(homeMap.has(e.main)) {
                let val = homeMap.get(e.main);
                val += 1;
                homeMap.set(e.main,val);
            }
            else {
                homeMap.set(e.main,1);
            }
        });

        awayGoalTrack.forEach((e) => {
            if(awayMap.has(e.main)) {
                let val = awayMap.get(e.main);
                val += 1;
                awayMap.set(e.main,val);
            }
            else {
                awayMap.set(e.main,1);
            }
        });

        return [homeMap,awayMap];
    })

    // Maps player # to assists.
    // Stored as an array where assistMap[0] is home team, assistMap[1] is away team
    const assistMap = $derived.by(() => {
        let homeMap = new Map<number, number>();
        let awayMap = new Map<number, number>();
        homeGoalTrack.forEach((e) => {
            if(homeMap.has(e.assist)) {
                let val = homeMap.get(e.assist);
                val += 1;
                homeMap.set(e.assist,val);
            }
            else {
                homeMap.set(e.assist,1);
            }
        });

        awayGoalTrack.forEach((e) => {
            if(awayMap.has(e.assist)) {
                let val = awayMap.get(e.assist);
                val += 1;
                awayMap.set(e.assist,val);
            }
            else {
                awayMap.set(e.assist,1);
            }
        });

        return [homeMap,awayMap];
    })

    let {teamName, side}: Side = $props();
</script>
<div class="outer">
    <div class="headerBox">{teamName}</div>
    <div class="headerRow">
        <div class="rowBox">PO</div>
        <div class="rowBox">#</div>
        <div class="rowBox" style="flex:2">Name</div>
        <div class="rowBox">Quarters</div>
        <div class="rowBox">Shots</div>
        <div class="rowBox">G</div>
        <div class="rowBox">A</div>
        <div class="rowBox">GBS</div>
    </div>
    {#each players[side] as player, i}
        <div class="innerRow">
            <input class="field" type="text">
            <input class="field" type="number" bind:value={players[side][i]}>
            <input class="field" type="text" style="flex:2">
            <input class="field" type="text">
            <input class="field" type="text">
            <div class="rowBox">{goalMap[side].get(players[side][i]) | 0}</div>
            <div class="rowBox">{assistMap[side].get(players[side][i]) | 0}</div>
            <input class="field" type="text">
        </div>
    {/each}
</div>