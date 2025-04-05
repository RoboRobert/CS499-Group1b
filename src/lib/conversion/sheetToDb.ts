import {
  goalTrack,
  type MetaStats,
  type ScoresheetPlayer,
  type SheetGoal,
  type SheetPenalty,
  type SheetSave,
  type SheetTimeout,
  type Stat,
} from "$lib/components/scoresheet/data.svelte";
import type { GameStat } from "$lib/database/GameStats";
import type { Goal } from "$lib/database/Goal";
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

function convertPenalty(sheet_id: string, side: number, input: SheetPenalty): Penalty {
  const penalty: Penalty = {
    sheet_id: sheet_id,
    side: side,
    timeout: input.timeout,
    player_number: input.playerno,
    infraction: input.infraction,
    quarter: input.quarter,
    time: input.time,
  };

  return penalty;
}

export function penaltiesToDbPenalties(sheet_id: string, penalties: SheetPenalty[][]): Penalty[] {
  let dbPenalties: Penalty[] = [];
  for (let i = 0; i < penalties[0].length; i++) {
    const sheetPenalty: SheetPenalty = penalties[0][i];

    dbPenalties.push(convertPenalty(sheet_id, 0, sheetPenalty));
  }

  for (let i = 0; i < penalties[0].length; i++) {
    const sheetPenalty: SheetPenalty = penalties[1][i];
    dbPenalties.push(convertPenalty(sheet_id, 0, sheetPenalty));
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

function convertPlayer(sheet_id: string, input: ScoresheetPlayer): SheetPlayer {
  const player: SheetPlayer = {
    sheet_id: sheet_id,
    side: input.side,
    name: input.name,
    position: input.position,
    playerno: input.number,
    quarter_1: false,
    quarter_2: false,
    quarter_3: false,
    quarter_4: false,
    ot: false,
    shots: input.shots,
    groundballs: input.groundBalls,
  };

  return player;
}

export function playersToDBPlayers(sheet_id: string, players: ScoresheetPlayer[][]): SheetPlayer[] {
  let dbPlayers: SheetPlayer[] = [];
  for (let i = 0; i < players[0].length; i++) {
    const sheetPlayer: ScoresheetPlayer = players[0][i];
    dbPlayers.push(convertPlayer(sheet_id, sheetPlayer));
  }

  for (let i = 0; i < players[1].length; i++) {
    const sheetPlayer: ScoresheetPlayer = players[1][i];
    dbPlayers.push(convertPlayer(sheet_id, sheetPlayer));
  }

  return dbPlayers;
}

function convertGoal(sheet_id: string, side: number, input: SheetGoal): Goal {
  const player: Goal = {
    sheet_id: sheet_id,
    side: side,
    time: input.time,
    playerno_score: input.main,
    playerno_assist: input.assist,
    goaltype: input.type,
  };

  return player;
}

export function goalsToDBGoals(sheet_id: string, goalTrack: SheetGoal[][]): Goal[] {
  let dbGoals: Goal[] = [];
  for (let i = 0; i < goalTrack[0].length; i++) {
    const sheetGoal: SheetGoal = goalTrack[0][i];
    dbGoals.push(convertGoal(sheet_id, 0, sheetGoal));
  }

  for (let i = 0; i < goalTrack[1].length; i++) {
    const sheetGoal: SheetGoal = goalTrack[1][i];
    dbGoals.push(convertGoal(sheet_id, 1, sheetGoal));
  }

  return dbGoals;
}
