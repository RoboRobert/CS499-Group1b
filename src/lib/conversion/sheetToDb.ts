import type { MetaStats, Stat } from "$lib/components/scoresheet/data.svelte";
import type { GameStat } from "$lib/database/GameStats";
import type { SheetInfo } from "$lib/database/SheetInfo";

export function statsToGameStats(sheet_id: string, groundBalls: number[][], shots: number[][], clears: Stat[][], faceoffs: Stat[][], extraMan: Stat[][]): GameStat[] {
  let gameStats: GameStat[] = [];
  for(let i = 0; i < 2; i++) {
    for(let j = 0; j < groundBalls[0].length; j++) {
      const gameStat: GameStat = {
        sheet_id: sheet_id,
        side: i,
        quarter: j,
        ground: groundBalls[i][j],
        shots: shots[i][j],
        clears_pass: clears[i][j].won,
        clears_fail: clears[i][j].won,
        extra_man_score: extraMan[i][j].won,
        extra_man_fail: extraMan[i][j].won,
        faceoff_win: faceoffs[i][j].won,
        faceoff_loss: faceoffs[i][j].won
      }
      gameStats.push(gameStat);
    }
  }

  return gameStats;
}

export function metaStatsToDbInfo(sheet_id: string, metaStats: MetaStats, coachName: string[], teamName: string[]): SheetInfo {
  const sheetInfo: SheetInfo = {
    sheet_id: sheet_id,
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
