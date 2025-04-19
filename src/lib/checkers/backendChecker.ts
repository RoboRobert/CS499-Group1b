import {
  type ScoresheetPlayer,
  type SheetData,
  type SheetGoal,
  type SheetPenalty,
  type SheetSave,
  type Stat
} from "$lib/components/scoresheet/data.svelte";

export interface SheetErr {
  elementID: string;
  message: string;
}

const validNumberMsg = "Field must contain an integer.";
const emptyFieldMsg = "Field cannot be empty.";
const fieldTooLongMsg = "Field cannot be longer than 100 characters.";

function invalidString(input: string): string {
  if(input.length > 100) {
    return fieldTooLongMsg;
  }
  
  if(!input) {
    return emptyFieldMsg;
  }

  return "";
}

function invalidTime(input: string): string {
  if(!/^(\d{1,2}):(\d{2})$/.test(input)) {
    return "Please enter a time in the format mm:ss";
  }

  return "";
}

function invalidGoalType(input: string): string {
  if(!/^[BCFODX]$/.test(input)) {
    return "Please enter a valid goal type. Valid types are: B, C, F, O, D and X";
  }

  return "";
}

function falsyData(input: any): string {
  if(!input) {
    return emptyFieldMsg;
  }

  return "";
}

// If the error contains a message, append it. If not, don't append it
function appendError(errors: SheetErr[], error: SheetErr) {
  if(error.message == "") {
    return;
  }

  errors.push(error);
}

export function checkSheet(rawData: any): SheetErr[] {
  const data: SheetData = {
    game_id: rawData.game_id,
    teamName: rawData.teamName,
    players: rawData.players,
    saves: rawData.saves,
    goalTrack: rawData.goalTrack,
    clears: rawData.clears,
    faceoffs: rawData.faceoffs,
    extraMan: rawData.extraMan,
    timeouts: rawData.timeouts,
    penalties: rawData.penalties,
    metaStats: rawData.metaStats,
    goals: rawData.goals,
    coachName: [],
    turnovers: [],
    substitutions: [],
  };

  let errors: SheetErr[] = [];

  // Check the meta stats
  if (!data.metaStats.gameStart || !data.metaStats.date || !data.metaStats.scorekeeper) {
    errors.push({ elementID: `metaStatsButton`, message: "The Meta Game Stats contains errors." });
  }
  if (!data.metaStats.gameStart) {
    errors.push({ elementID: `metaStats-gameStart`, message: "You must specify a valid game start time." });
    
  }
  if (!data.metaStats.date) {
    errors.push({ elementID: `metaStats-date`, message: "You must specify a valid date." });
  }
  appendError(errors, {elementID: `metaStats-scorekeeper`, message: invalidString(data.metaStats.scorekeeper)});

  // Check all the team names and make sure they're not empty.
  for (let i = 0; i < data.teamName.length; i++) {
    const name: string = data.teamName[i];
    if (!name) {
      errors.push({ elementID: `teamName-${i}`, message: "Team name cannot be empty." });
    }
  }

  // Check all the players.
  for (let i = 0; i < data.players.length; i++) {
    for (let j = 0; j < data.players[i].length; j++) {
      let player: ScoresheetPlayer = data.players[i][j];
      if (!player.name) {
        errors.push({ elementID: `playerName-${i}-${player.index}`, message: emptyFieldMsg });
      }
      if (player.number == null) {
        errors.push({ elementID: `playerNumber-${i}-${player.index}`, message: "Please enter a number in the range 0-99" });
      }
      if (!player.position) {
        errors.push({ elementID: `playerPosition-${i}-${player.index}`, message: "Player must have a valid position." });
      }
    }
  }

  // Check all the saves
  for (let i = 0; i < data.saves.length; i++) {
    for (let j = 0; j < data.saves[i].length; j++) {
      let save: SheetSave = data.saves[i][j];
      // If the save is empty, ignore it.
      if (!save.goalie) {
        continue;
      }

      // Otherwise, if the save has some data, check all its fields
      if (save.qtr1 == null) {
        errors.push({ elementID: `savesQ1-${i}-${j}`, message: validNumberMsg });
      }
      if (save.qtr2 == null) {
        errors.push({ elementID: `savesQ2-${i}-${j}`, message: validNumberMsg });
      }
      if (save.qtr3 == null) {
        errors.push({ elementID: `savesQ3-${i}-${j}`, message: validNumberMsg });
      }
      if (save.qtr4 == null) {
        errors.push({ elementID: `savesQ4-${i}-${j}`, message: validNumberMsg });
      }
      if (save.ot == null) {
        errors.push({ elementID: `savesOT-${i}-${j}`, message: validNumberMsg });
      }
    }
  }

  // Check all the penalties
  for (let i = 0; i < data.penalties.length; i++) {
    for (let j = 0; j < data.penalties[i].length; j++) {
      let penalty: SheetPenalty = data.penalties[i][j];

      appendError(errors, {elementID: `penaltyTimeout-${i}-${penalty.index}`, message: invalidTime(penalty.timeout)});
      if (penalty.playerno == null) {
        errors.push({ elementID: `penaltyNumber-${i}-${penalty.index}`, message: "Field must contain a player number." });
      }

      if (!penalty.infraction) {
        errors.push({ elementID: `penaltyInfraction-${i}-${penalty.index}`, message: emptyFieldMsg });
      }

      if (!penalty.quarter) {
        errors.push({ elementID: `penaltyQuarter-${i}-${penalty.index}`, message: "Please enter a valid game quarter." });
      }

      appendError(errors, {elementID: `penaltyTime-${i}-${penalty.index}`, message: invalidTime(penalty.time)});
    }
  }

  for (let i = 0; i < data.timeouts.length; i++) {
    for (let j = 0; j < data.timeouts[i].length; j++) {
      const timeout = data.timeouts[i][j];

      // Only check the timeout if it isn't falsy
      if (!timeout.period && !timeout.time) {
        continue;
      }
      appendError(errors, {elementID: `timeoutTime-${i}-${j}`, message: invalidTime(timeout.time)});
      if (j < 4 && !timeout.period) {
        errors.push({ elementID: `timeoutPeriod-${i}-${j}`, message: "Please enter a valid game quarter." });
      }
    }
  }

  // // Check all the ground balls
  // for (let i = 0; i < data.groundBalls.length; i++) {
  //   for (let j = 0; j < data.groundBalls[i].length; j++) {
  //     let groundBall: number = data.groundBalls[i][j];
  //     // If the groundBall field is empty, mark it on the sheet.
  //     if (groundBall == null) {
  //       errors.push({ elementID: `groundBalls-${i}-${j}`, message: validNumberMsg });
  //     }
  //   }
  // }

  // // Check all the shots
  // for (let i = 0; i < data.shots.length; i++) {
  //   for (let j = 0; j < data.shots[i].length; j++) {
  //     let groundBall: number = data.shots[i][j];
  //     // If the groundBall field is empty, mark it on the sheet.
  //     if (groundBall == null) {
  //       errors.push({ elementID: `shots-${i}-${j}`, message: validNumberMsg });
  //     }
  //   }
  // }

  // Check all the clears
  for (let i = 0; i < data.clears.length; i++) {
    for (let j = 0; j < data.clears[i].length; j++) {
      let clear: Stat = data.clears[i][j];
      // If the clear field is empty, mark it on the sheet.
      if (clear.won == null) {
        errors.push({ elementID: `clearsWon-${i}-${j}`, message: validNumberMsg });
      }

      if (clear.lost == null) {
        errors.push({ elementID: `clearsLost-${i}-${j}`, message: validNumberMsg });
      }
    }
  }

  // Check all the extra man
  for (let i = 0; i < data.extraMan.length; i++) {
    for (let j = 0; j < data.extraMan[i].length; j++) {
      let extraMan: Stat = data.extraMan[i][j];
      // If any extra man field is empty, mark it on the sheet.
      if (extraMan.won == null) {
        errors.push({ elementID: `extraManWon-${i}-${j}`, message: validNumberMsg });
      }

      if (extraMan.lost == null) {
        errors.push({ elementID: `extraManLost-${i}-${j}`, message: validNumberMsg });
      }
    }
  }

  // Check all the faceoffs
  for (let i = 0; i < data.faceoffs.length; i++) {
    for (let j = 0; j < data.faceoffs[i].length; j++) {
      let faceoff: Stat = data.faceoffs[i][j];
      // If any faceoff field is empty, mark it on the sheet.
      if (faceoff.won == null) {
        errors.push({ elementID: `faceoffsWon-${i}-${j}`, message: validNumberMsg });
      }

      if (faceoff.lost == null) {
        errors.push({ elementID: `faceoffsLost-${i}-${j}`, message: validNumberMsg });
      }
    }
  }

  // Check all the goal track
  for (let i = 0; i < data.goalTrack.length; i++) {
    for (let j = 0; j < data.goalTrack[i].length; j++) {
      let goal: SheetGoal = data.goalTrack[i][j];
      if (!goal.main) {
        errors.push({ elementID: `goalTrackMain-${i}-${goal.index}`, message: "Field must contain a player number." });
      }
      appendError(errors, {elementID: `goalTrackTime-${i}-${goal.index}`, message: invalidTime(goal.time)});
      appendError(errors, {elementID: `goalTrackType-${i}-${goal.index}`, message: invalidGoalType(goal.type)});
    }
  }

  return errors;
}
