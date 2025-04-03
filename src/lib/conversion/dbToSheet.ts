import { clears, extraMan, faceoffs, goals, goalTrack, groundBalls, metaStats, penalties, saves, shots, timeouts, toTime } from "$lib/components/scoresheet/data.svelte";
import type { GameStat } from "$lib/database/GameStats";
import type { Goal } from "$lib/database/Goal";
import type { Penalty } from "$lib/database/Penalty";
import type { Save } from "$lib/database/Save";
import type { SheetInfo } from "$lib/database/SheetInfo";
import type { Timeout } from "$lib/database/Timeout";

export function dbStatsToStats(gameStats: GameStat[]) {
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

export function dbDataToSheetData(sheetInfo: SheetInfo) {
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
  for(let i = 0; i < dbSaves.length && i < saves.length; i++) {
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
  for(let i = 0; i < dbTimeouts.length && i < saves.length; i++) {
    const timeout = dbTimeouts[i];
    const time1 = toTime(timeout.first_1_time);
    const time2 = toTime(timeout.first_2_time);
    const time3 = toTime(timeout.second_1_time);
    const time4 = toTime(timeout.second_2_time);
    const time5 = toTime(timeout.ot_1_time);
    const time6 = toTime(timeout.ot_2_time);

    timeouts[timeout.side][0].period = timeout.first_1_period;
    timeouts[timeout.side][0].time = time1;
    
    timeouts[timeout.side][1].period = timeout.first_2_period;
    timeouts[timeout.side][1].time = time2;
    
    timeouts[timeout.side][2].period = timeout.second_1_period;
    timeouts[timeout.side][2].time = time3;

    timeouts[timeout.side][3].period = timeout.second_2_period;
    timeouts[timeout.side][3].time = time4;
    
    timeouts[timeout.side][4].time = time5;

    timeouts[timeout.side][5].time = time6;
  }
}

export function dbPenaltiesToPenalties(dbPenalties: Penalty[]) {
  for(let i = 0; i < dbPenalties.length && i < penalties.length; i++) {
    const penalty = dbPenalties[i];
    penalties[penalty.side][i].timeout = toTime(penalty.timeout);
    penalties[penalty.side][i].playerno = penalty.player_number;
    penalties[penalty.side][i].infraction = penalty.infraction;
    penalties[penalty.side][i].quarter = penalty.quarter;
    penalties[penalty.side][i].time = toTime(penalty.time);
  }
}

export function dbGoalsToGoals(dbGoals: Goal[]) {
  for(let i = 0; i < dbGoals.length; i++) {
    const goal = dbGoals[i];
    goalTrack[goal.side][i].main = goal.playerno_score;
    goalTrack[goal.side][i].assist = goal.playerno_assist;
    goalTrack[goal.side][i].time = toTime(goal.time);
    goalTrack[goal.side][i].type = goal.goaltype;
  }
}