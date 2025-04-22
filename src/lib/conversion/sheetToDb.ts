import {
  type MetaStats,
  type ScoresheetPlayer,
  type SheetGoal,
  type SheetPenalty,
  type SheetSave,
  type SheetTimeout,
  type SheetTurnover,
  type Stat
} from "$lib/components/scoresheet/data.svelte";
import type { GameStat } from "$lib/database/GameStats";
import type { Goal } from "$lib/database/Goal";
import type { OtherStat } from "$lib/database/OtherStat";
import type { Penalty } from "$lib/database/Penalty";
import type { Save } from "$lib/database/Save";
import type { SheetInfo } from "$lib/database/SheetInfo";
import type { Player } from "$lib/database/Team";
import type { Timeout } from "$lib/database/Timeout";
import { toPlayerID } from "./general";

export function statsToDBStats(
  sheet_id: string,
  clears: Stat[][],
  faceoffs: Stat[][],
  extraMan: Stat[][]
): GameStat[] {
  let gameStats: GameStat[] = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < extraMan[0].length; j++) {
      const gameStat: GameStat = {
        sheet_id: sheet_id,
        side: i,
        quarter: j,
        ground: 0,
        shots: 0,
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
    index: input.index,
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

  for (let i = 0; i < penalties[1].length; i++) {
    const sheetPenalty: SheetPenalty = penalties[1][i];
    dbPenalties.push(convertPenalty(sheet_id, 1, sheetPenalty));
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

function convertSheetPlayer(sheet_id: string, input: ScoresheetPlayer): SheetPlayer {
  const player: SheetPlayer = {
    sheet_id: sheet_id,
    side: input.side,
    index: input.index,
    name: input.name,
    position: input.position,
    playerno: input.number,
    quarter_1: input.quarters.q1,
    quarter_2: input.quarters.q2,
    quarter_3: input.quarters.q3,
    quarter_4: input.quarters.q4,
    ot: input.quarters.ot,
    shots: input.shots,
    groundballs: input.groundBalls,
  };

  return player;
}

export function playersToDBSheetPlayers(sheet_id: string, players: ScoresheetPlayer[][]): SheetPlayer[] {
  let dbPlayers: SheetPlayer[] = [];
  for (let i = 0; i < players[0].length; i++) {
    const sheetPlayer: ScoresheetPlayer = players[0][i];
    dbPlayers.push(convertSheetPlayer(sheet_id, sheetPlayer));
  }

  for (let i = 0; i < players[1].length; i++) {
    const sheetPlayer: ScoresheetPlayer = players[1][i];
    dbPlayers.push(convertSheetPlayer(sheet_id, sheetPlayer));
  }

  return dbPlayers;
}

function convertGoal(sheet_id: string, side: number, input: SheetGoal): Goal {
  const goal: Goal = {
    sheet_id: sheet_id,
    index: input.index,
    side: side,
    time: input.time,
    playerno_score: input.main,
    playerno_assist: input.assist,
    goaltype: input.type,
    quarter: input.quarter,
  };

  return goal;
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

function convertPlayer(team_name: string, team_id: string, input: ScoresheetPlayer): Player {
  const player: Player = {
    team_id: team_id,
    player_id: toPlayerID(input.name, input.number, team_id),
    team_name: team_name,
    player_name: input.name,
    player_number: input.number,
    position: "default",
    player_class: "default",
    hometown: "default",
    state: "AL",
    height_feet: 0,
    height_inches: 0,
    weight: 0,
    num_games: 1,
    attempted_shots: input.shots.reduce((c,p)=>c+p,0),
    failed_shots: input.shots.reduce((c,p)=>c+p,0) - input.goals,
    goals: input.goals,
    ground_balls: input.groundBalls.reduce((c,p)=>c+p,0),
    assists: input.assists,
  };

  return player;
}

export function playersToDBPlayers(team_name: string, team_id: string, players: ScoresheetPlayer[]): Player[] {
  let dbPlayers: Player[] = [];
  for (const sheetPlayer of players) {
    dbPlayers.push(convertPlayer(team_name, team_id, sheetPlayer));
  }

  return dbPlayers;
}

export function otherStatsToDBOtherStats(sheet_id: string, turnovers: SheetTurnover[], substitutions: SheetTurnover[]): OtherStat[] {
  let dbOtherStats: OtherStat[] = [];
  for(let i = 0; i < turnovers.length; i++) {
    dbOtherStats.push({
      sheet_id: sheet_id,
      side: i,
      turnovers_half1: turnovers[i].half1,
      turnovers_half2: turnovers[i].half2,
      subs_half1: substitutions[i].half1,
      subs_half2: substitutions[i].half2
    })
  }

  return dbOtherStats;
}