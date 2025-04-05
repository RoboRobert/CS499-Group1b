import { clears, coachName, extraMan, faceoffs, goalTrack, groundBalls, metaStats, penalties, players, saves, shots, teamName, timeouts, type ScoresheetPlayer } from "$lib/components/scoresheet/data.svelte";
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
  const homePenalties = dbPenalties.filter((x) => x.side == 0);
  const awayPenalties = dbPenalties.filter((x) => x.side == 1);
  for(let i = 0; i < homePenalties.length; i++) {
    const penalty = homePenalties[i];
    penalties[0][i].timeout = penalty.timeout;
    penalties[0][i].playerno = penalty.player_number;
    penalties[0][i].infraction = penalty.infraction;
    penalties[0][i].quarter = penalty.quarter;
    penalties[0][i].time = penalty.time
  }

  for(let i = 0; i < awayPenalties.length; i++) {
    const penalty = awayPenalties[i];
    penalties[1][i].timeout = penalty.timeout;
    penalties[1][i].playerno = penalty.player_number;
    penalties[1][i].infraction = penalty.infraction;
    penalties[1][i].quarter = penalty.quarter;
    penalties[1][i].time = penalty.time
  }
}

export function dbGoalsToGoals(dbGoals: Goal[]) {
  const homeGoals = dbGoals.filter((x) => x.side == 0);
  const awayGoals = dbGoals.filter((x) => x.side == 1);
  for(let i = 0; i < homeGoals.length; i++) {
    const goal = homeGoals[i];
    goalTrack[0][i].main = goal.playerno_score;
    goalTrack[0][i].assist = goal.playerno_assist;
    goalTrack[0][i].time = goal.time
    goalTrack[0][i].type = goal.goaltype;
  }

  for(let i = 0; i < awayGoals.length; i++) {
    const goal = awayGoals[i];
    goalTrack[1][i].main = goal.playerno_score;
    goalTrack[1][i].assist = goal.playerno_assist;
    goalTrack[1][i].time = goal.time
    goalTrack[1][i].type = goal.goaltype;
  }
}

export function dbPlayersToPlayers(dbPlayers: SheetPlayer[]) {
  console.log(dbPlayers);
  const homePlayers = dbPlayers.filter((x) => x.side == 0).sort((a, b) => (a.position < b.position ? -1 : 1));
  const awayPlayers = dbPlayers.filter((x) => x.side == 1).sort((a, b) => (a.position < b.position ? -1 : 1));

  console.log(homePlayers)
  console.log(awayPlayers)
  for(let i = 0; i < homePlayers.length; i++) {
    const sheetPlayer = homePlayers[i];
    players[0][i].side = sheetPlayer.side;
    players[0][i].name = sheetPlayer.name;
    players[0][i].number = sheetPlayer.playerno;
    players[0][i].position = sheetPlayer.position;
    players[0][i].groundBalls = sheetPlayer.groundballs;
    players[0][i].shots = sheetPlayer.shots;
  }

  for(let i = 0; i < awayPlayers.length; i++) {
    const sheetPlayer = awayPlayers[i];
    players[0][i].side = sheetPlayer.side;
    players[1][i].name = sheetPlayer.name;
    players[1][i].number = sheetPlayer.playerno;
    players[1][i].position = sheetPlayer.position;
    players[1][i].groundBalls = sheetPlayer.groundballs;
    players[1][i].shots = sheetPlayer.shots;
  }
}