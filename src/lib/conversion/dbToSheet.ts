import { clears, extraMan, faceoffs, groundBalls, metaStats, shots } from "$lib/components/scoresheet/data.svelte";
import type { GameStat } from "$lib/database/GameStats";
import type { SheetInfo } from "$lib/database/SheetInfo";

export function gameStatsToStats(gameStats: GameStat[]) {
  for (const gameStat of gameStats) {
    shots[gameStat.side][gameStat.quarter - 1] = gameStat.shots;

    groundBalls[gameStat.side][gameStat.quarter - 1] = gameStat.ground;

    clears[gameStat.side][gameStat.quarter - 1].won = gameStat.clears_pass;
    clears[gameStat.side][gameStat.quarter - 1].lost = gameStat.clears_fail;

    faceoffs[gameStat.side][gameStat.quarter - 1].won = gameStat.faceoff_win;
    faceoffs[gameStat.side][gameStat.quarter - 1].lost = gameStat.faceoff_loss;

    extraMan[gameStat.side][gameStat.quarter - 1].won = gameStat.extra_man_score;
    extraMan[gameStat.side][gameStat.quarter - 1].lost = gameStat.extra_man_fail;
  }
}

export function sheetInfoToMetaData(sheetInfo: SheetInfo) {
  metaStats.date = sheetInfo.date;
  metaStats.site = sheetInfo.site;
  metaStats.gameStart = sheetInfo.start_time;
  metaStats.scorekeeper = sheetInfo.scorekeeper;
  metaStats.oppScorekeeper = sheetInfo.oppscorekeeper;
  metaStats.timeKeeper = sheetInfo.timekeeper;
  metaStats.headOfficial = sheetInfo.head_official;
  metaStats.umpire = sheetInfo.umpire;
  metaStats.fieldJudge = sheetInfo.field_judge;
  metaStats.lengthOfQuarters = sheetInfo.lengthofquarters;
  metaStats.weatherCondition = sheetInfo.weathercondition;
}


