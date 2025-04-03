import type { MetaStats, Stat } from "$lib/components/scoresheet/data.svelte";
import type { GameStat } from "$lib/database/GameStats";
import type { SheetInfo } from "$lib/database/SheetInfo";

export function statsToGameStats(groundBalls: number[][]): GameStat[] {
  let gameStats: GameStat[] = [];

  return gameStats;
}

export function metaStatsToDbInfo(metaStats: MetaStats, coachName: string[], teamName: string[]): SheetInfo {
  const sheetInfo: SheetInfo = {
    sheet_id: "test",
    date: metaStats.date,
    site: metaStats.site,
    start_time: metaStats.gameStart,
    scorekeeper: metaStats.scorekeeper,
    oppscorekeeper: metaStats.oppScorekeeper,
    timekeeper: metaStats.timeKeeper,
    head_official: metaStats.headOfficial,
    umpire: metaStats.umpire,
    field_judge: metaStats.fieldJudge,
    lengthofquarters: metaStats.lengthOfQuarters,
    weathercondition: metaStats.weatherCondition,
    homecoach: coachName[0],
    awaycoach: coachName[1],
    hometeam: teamName[0],
    awayteam: teamName[1],
  };

  return sheetInfo;
}
