import { clears, coachName, extraMan, faceoffs, game_id, goalTrack, groundBalls, metaStats, penalties, players, saves, shots, teamName, timeouts } from "$lib/components/scoresheet/data.svelte";
import type { GameStat } from "$lib/database/GameStats";
import type { Goal } from "$lib/database/Goal";
import type { Penalty } from "$lib/database/Penalty";
import type { Save } from "$lib/database/Save";
import type { Sheet } from "$lib/database/Sheet";
import type { SheetInfo } from "$lib/database/SheetInfo";
import type { Timeout } from "$lib/database/Timeout";

export function dbStatsToStats(gameStats: GameStat[]) {
  for (const gameStat of gameStats) {
    shots[gameStat.side][gameStat.quarter] = gameStat.shots;

    groundBalls[gameStat.side][gameStat.quarter] = gameStat.ground;

    clears[gameStat.side][gameStat.quarter].won = gameStat.clears_pass;
    clears[gameStat.side][gameStat.quarter].lost = gameStat.clears_fail;

    faceoffs[gameStat.side][gameStat.quarter].won = gameStat.faceoff_win;
    faceoffs[gameStat.side][gameStat.quarter].lost = gameStat.faceoff_loss;

    extraMan[gameStat.side][gameStat.quarter].won = gameStat.extra_man_score;
    extraMan[gameStat.side][gameStat.quarter].lost = gameStat.extra_man_fail;
  }
}

export function dbMetaToMeta(sheet: Sheet) {
  game_id.sheet_id = sheet.sheet_id;
  game_id.game_id = sheet.game_id;
}

export function dbDataToSheetData(sheetInfo: SheetInfo) {
  teamName[0] = sheetInfo.hometeam;
  teamName[1] = sheetInfo.awayteam;
  coachName[0] = sheetInfo.homecoach;
  coachName[1] = sheetInfo.awaycoach;

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

export function dbSavesToSaves(dbSaves: Save[]) {
  const homeSaves = dbSaves.filter((x) => x.side == 0);
  const awaySaves = dbSaves.filter((x) => x.side == 1);
  for(let i = 0; i < homeSaves.length; i++) {
    const save = homeSaves[i];
    saves[0][i].goalie = save.player_number;
    saves[0][i].qtr1 = save.quarter_1;
    saves[0][i].qtr2 = save.quarter_2;
    saves[0][i].qtr3 = save.quarter_3;
    saves[0][i].qtr4 = save.quarter_4;
    saves[0][i].ot = save.ot;
  }

  for(let i = 0; i < awaySaves.length; i++) {
    const save = awaySaves[i];
    saves[1][i].goalie = save.player_number;
    saves[1][i].qtr1 = save.quarter_1;
    saves[1][i].qtr2 = save.quarter_2;
    saves[1][i].qtr3 = save.quarter_3;
    saves[1][i].qtr4 = save.quarter_4;
    saves[1][i].ot = save.ot;
  }
}

export function dbTimeoutsToTimeouts(dbTimeouts: Timeout[]) {
  for(let i = 0; i < dbTimeouts.length; i++) {
    const timeout = dbTimeouts[i];

    timeouts[timeout.side][0].period = timeout.first_1_period;
    timeouts[timeout.side][0].time = timeout.first_1_time;
    
    timeouts[timeout.side][1].period = timeout.first_2_period;
    timeouts[timeout.side][1].time = timeout.first_2_time;
    
    timeouts[timeout.side][2].period = timeout.second_1_period;
    timeouts[timeout.side][2].time = timeout.second_1_time;

    timeouts[timeout.side][3].period = timeout.second_2_period;
    timeouts[timeout.side][3].time = timeout.second_2_time;
    
    timeouts[timeout.side][4].time = timeout.ot_1_time;

    timeouts[timeout.side][5].time = timeout.ot_2_time;
  }
}

export function dbPenaltiesToPenalties(dbPenalties: Penalty[]) {
  for(let i = 0; i < dbPenalties.length; i++) {
    const penalty = dbPenalties[i];
    const s = penalty.side;
    const j = penalty.index;
    penalties[s][j].timeout = penalty.timeout;
    penalties[s][j].index = penalty.index;
    penalties[s][j].playerno = penalty.player_number;
    penalties[s][j].infraction = penalty.infraction;
    penalties[s][j].quarter = penalty.quarter;
    penalties[s][j].time = penalty.time
  }
}

export function dbGoalsToGoals(dbGoals: Goal[]) {
  for(let i = 0; i < dbGoals.length; i++) {
    const goal = dbGoals[i];
    const s = goal.side;
    const j = goal.index;
    goalTrack[s][j].main = goal.playerno_score;
    goalTrack[s][j].index = goal.index;
    goalTrack[s][j].assist = goal.playerno_assist;
    goalTrack[s][j].time = goal.time
    goalTrack[s][j].type = goal.goaltype;
  }
}

export function dbPlayersToPlayers(dbPlayers: SheetPlayer[]) {
  for(let i = 0; i < dbPlayers.length; i++) {
    const sheetPlayer = dbPlayers[i];
    const s = sheetPlayer.side;
    const j = sheetPlayer.index;
    players[s][j].side = sheetPlayer.side;
    players[s][j].index = sheetPlayer.index;
    players[s][j].name = sheetPlayer.name;
    players[s][j].number = sheetPlayer.playerno;
    players[s][j].position = sheetPlayer.position;
    players[s][j].groundBalls = sheetPlayer.groundballs;
    players[s][j].shots = sheetPlayer.shots;
  }
}