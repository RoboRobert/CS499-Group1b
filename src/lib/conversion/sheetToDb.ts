import type { MetaStats, SheetPenalty, SheetSave, SheetTimeout, Stat } from "$lib/components/scoresheet/data.svelte";
import type { GameStat } from "$lib/database/GameStats";
import type { Penalty } from "$lib/database/Penalty";
import type { Save } from "$lib/database/Save";
import type { SheetInfo } from "$lib/database/SheetInfo";
import type { Timeout } from "$lib/database/Timeout";

export function statsToDBStats(
  sheet_id: string,
  groundBalls: number[][],
  shots: number[][],
  clears: Stat[][],
  faceoffs: Stat[][],
  extraMan: Stat[][]
): GameStat[] {
  let gameStats: GameStat[] = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < groundBalls[0].length; j++) {
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
        faceoff_loss: faceoffs[i][j].won,
      };
      gameStats.push(gameStat);
    }
  }

  return gameStats;
}

export function metaStatsToDBMetaStats(sheet_id: string, metaStats: MetaStats, coachName: string[], teamName: string[]): SheetInfo {
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

export function penaltiesToDbPenalties(sheet_id: string, penalties: SheetPenalty[][]): Penalty[] {
  let dbPenalties: Penalty[] = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < penalties[0].length; j++) {
      const sheetPenalty: SheetPenalty = penalties[i][j];
      const penalty: Penalty = {
        sheet_id: sheet_id,
        side: i,
        timeout: sheetPenalty.timeout,
        player_number: sheetPenalty.playerno,
        infraction: sheetPenalty.infraction,
        quarter: sheetPenalty.quarter,
        time: sheetPenalty.time,
      };
      dbPenalties.push(penalty);
    }
  }

  return dbPenalties;
}

export function timeoutsToDBTimeouts(sheet_id: string, timeouts: SheetTimeout[][]): Timeout[] {
  let dbTimeouts: Timeout[] = [];
  for (let i = 0; i < 2; i++) {
    const timeout: Timeout = {
      sheet_id: sheet_id,
      side: i,
      first_1_time: timeouts[i][0].time,
      first_1_period: timeouts[i][0].period,
      first_2_time: timeouts[i][1].time,
      first_2_period: timeouts[i][1].period,
      second_1_time: timeouts[i][2].time,
      second_1_period: timeouts[i][2].period,
      second_2_time: timeouts[i][3].time,
      second_2_period: timeouts[i][3].period,
      ot_1_time: timeouts[i][4].time,
      ot_2_time: timeouts[i][5].time,
    };
    dbTimeouts.push(timeout);
  }

  return dbTimeouts;
}

export function savesToDBSaves(sheet_id: string, saves: SheetSave[][]): Save[] {
  let dbSaves: Save[] = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < saves[0].length; j++) {
      const sheetSave: SheetSave = saves[i][j];
      const save: Save = {
        sheet_id: sheet_id,
        side: i,
        player_number: sheetSave.goalie,
        quarter_1: sheetSave.qtr1,
        quarter_2: sheetSave.qtr2,
        quarter_3: sheetSave.qtr3,
        quarter_4: sheetSave.qtr4,
        ot: sheetSave.ot,
      };
      dbSaves.push(save);
    }
  }
  return dbSaves;
}
