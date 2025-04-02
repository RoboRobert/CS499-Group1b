import { shots } from "$lib/components/scoresheet/data.svelte";
import type { GameStat } from "$lib/database/GameStats";

export function gameStatsToStats(gameStats: GameStat[]) {
    let newShots: number[][] = shots;

    for(const gameStat of gameStats) {
        newShots[gameStat.side][gameStat.quarter-1] = gameStat.shots;
    }

    return {
        shots: newShots,
    }
}