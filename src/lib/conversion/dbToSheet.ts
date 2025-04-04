import { clears, coachName, extraMan, faceoffs, goalTrack, groundBalls, metaStats, penalties, players, saves, shots, teamName, timeouts } from "$lib/components/scoresheet/data.svelte";
import type { GameStat } from "$lib/database/GameStats";
import type { Goal } from "$lib/database/Goal";
import type { Penalty } from "$lib/database/Penalty";
import type { Save } from "$lib/database/Save";
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
  for(let i = 0; i < dbSaves.length; i++) {
    const save = dbSaves[i];
    saves[save.side][i].goalie = save.player_number;
    saves[save.side][i].qtr1 = save.quarter_1;
    saves[save.side][i].qtr2 = save.quarter_2;
    saves[save.side][i].qtr3 = save.quarter_3;
    saves[save.side][i].qtr4 = save.quarter_4;
    saves[save.side][i].ot = save.ot;
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
    penalties[penalty.side][i].timeout = penalty.timeout;
    penalties[penalty.side][i].playerno = penalty.player_number;
    penalties[penalty.side][i].infraction = penalty.infraction;
    penalties[penalty.side][i].quarter = penalty.quarter;
    penalties[penalty.side][i].time = penalty.time
  }
}

export function dbGoalsToGoals(dbGoals: Goal[]) {
  for(let i = 0; i < dbGoals.length; i++) {
    const goal = dbGoals[i];
    goalTrack[goal.side][i].main = goal.playerno_score;
    goalTrack[goal.side][i].assist = goal.playerno_assist;
    goalTrack[goal.side][i].time = goal.time
    goalTrack[goal.side][i].type = goal.goaltype;
  }
}

export function dbPlayersToPlayers(dbPlayers: SheetPlayer[]) {
  for(let i = 0; i < dbPlayers.length; i++) {
    const sheetPlayer = dbPlayers[i];
    players[sheetPlayer.side][i].name = sheetPlayer.name;
    players[sheetPlayer.side][i].number = sheetPlayer.playerno;
    players[sheetPlayer.side][i].position = sheetPlayer.position;
    players[sheetPlayer.side][i].groundBalls = sheetPlayer.groundballs;
    players[sheetPlayer.side][i].shots = sheetPlayer.shots;
  }
}