import { type SheetPenalty, type ScoresheetPlayer, type SheetSave, type SheetData, type Stat, metaStats } from "$lib/components/scoresheet/data.svelte";

export interface SheetErr {
  elementID: string;
  message: string;
}

const validNumberMsg = "Field must contain an integer.";
const emptyFieldMsg = "Field cannot be empty.";

export function checkSheet(rawData: any): SheetErr[] {
  const data: SheetData = {
    game_id: rawData.game_id,
    teamName: rawData.teamName,
    players: rawData.players,
    saves: rawData.saves,
    goals: rawData.goals,
    goalTrack: rawData.goalTrack,
    groundBalls: rawData.groundBalls,
    shots: rawData.shots,
    clears: rawData.clears,
    faceoffs: rawData.faceoffs,
    extraMan: rawData.extraMan,
    timeouts: rawData.timeouts,
    penalties: rawData.penalties,
    metaStats: rawData.metaStats,
    coachName: []
  };
  
  let errors: SheetErr[] = [];

  // Check the meta stats
  if(!data.metaStats.gameStart || !data.metaStats.date || !data.metaStats.scorekeeper) {
    errors.push({ elementID: `metaStatsButton`, message: "There are errors in the Meta Game Stats." });
  }

  if(!data.metaStats.gameStart) {
    errors.push({ elementID: `metaStats-gameStart`, message: "You must specify a valid game start time." });
  }
  if(!data.metaStats.date) {
    errors.push({ elementID: `metaStats-date`, message: "You must specify a valid date." });
  }
  if(!data.metaStats.scorekeeper) {
    errors.push({ elementID: `metaStats-scorekeeper`, message: "You must specify a valid name for the scorekeeper" });
  }

  // Check all the team names and make sure they're not empty.
  for (let i = 0; i < data.teamName.length; i++) {
    const name: string = data.teamName[i];
    if (!name) {
      errors.push({ elementID: `teamName-${i}`, message: "Team name is invalid." });
    }
  }

  // Check all the players.
  for (let i = 0; i < data.players.length; i++) {
    for (let j = 0; j < data.players[i].length; j++) {
      let player: ScoresheetPlayer = data.players[i][j];
      // Otherwise, if the player has some data, check all its fields
      if (!player.name) {
        errors.push({ elementID: `playerName-${i}-${j}`, message: "Player name is invalid."});
      }
      if (!player.number) {
        errors.push({ elementID: `playerNumber-${i}-${j}`, message: "Player number is invalid."});
      }
      if (!player.position) {
        errors.push({ elementID: `playerPosition-${i}-${j}`, message: "Player position is invalid."});
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
        errors.push({ elementID: `savesQ1-${i}-${j}`, message: emptyFieldMsg});
      }
      if (save.qtr2 == null) {
        errors.push({ elementID: `savesQ2-${i}-${j}`, message: emptyFieldMsg });
      }
      if (save.qtr3 == null) {
        errors.push({ elementID: `savesQ3-${i}-${j}`, message: emptyFieldMsg });
      }
      if (save.qtr4 == null) {
        errors.push({ elementID: `savesQ4-${i}-${j}`, message: emptyFieldMsg });
      }
      if (save.ot == null) {
        errors.push({ elementID: `savesOT-${i}-${j}`, message: emptyFieldMsg });
      }
    }
  }

  // Check all the penalties
  for (let i = 0; i < data.penalties.length; i++) {
    for (let j = 0; j < data.penalties[i].length; j++) {
      let penalty: SheetPenalty = data.penalties[i][j];
      // If the penalty is empty, ignore it.
      if (!penalty.infraction && penalty.playerno == null && !penalty.quarter && !penalty.time && !penalty.timeout) {
        continue;
      }

      if (!penalty.timeout) {
        errors.push({ elementID: `penaltyTimeout-${i}-${j}`, message: emptyFieldMsg });
      }

      if (penalty.playerno == null) {
        errors.push({ elementID: `penaltyNumber-${i}-${j}`, message: emptyFieldMsg });
      }

      if (!penalty.infraction) {
        errors.push({ elementID: `penaltyInfraction-${i}-${j}`, message: emptyFieldMsg });
      }

      if (!penalty.quarter) {
        errors.push({ elementID: `penaltyQuarter-${i}-${j}`, message: emptyFieldMsg });
      }

      if (!penalty.time) {
        errors.push({ elementID: `penaltyTime-${i}-${j}`, message: emptyFieldMsg });
      }
    }
  }

  for(let i = 0; i < data.timeouts.length; i++) {
      console.log(data.timeouts[i].length)
      for(let j = 0; j < data.timeouts[i].length; j++) {
        const timeout = data.timeouts[i][j];
        if(!timeout.period) {
          // If the timeout has data, check if 
          if (!timeout.period) {
            errors.push({ elementID: `timeout-${i}-${j}`, message: emptyFieldMsg});
          }
          if (!timeout.time) {
            errors.push({ elementID: `timeout-${i}-${j}`, message: emptyFieldMsg});
          }
        }
      }
  }

  // Check all the ground balls
  for (let i = 0; i < data.groundBalls.length; i++) {
    for (let j = 0; j < data.groundBalls[i].length; j++) {
      let groundBall: number = data.groundBalls[i][j];
      // If the groundBall field is empty, mark it on the sheet.
      if (groundBall == null) {
        errors.push({ elementID: `groundBalls-${i}-${j}`, message: validNumberMsg });
      }
    }
  }

  // Check all the shots
  for (let i = 0; i < data.shots.length; i++) {
    for (let j = 0; j < data.shots[i].length; j++) {
      let groundBall: number = data.shots[i][j];
      // If the groundBall field is empty, mark it on the sheet.
      if (groundBall == null) {
        errors.push({ elementID: `shots-${i}-${j}`, message: validNumberMsg });
      }
    }
  }

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

  return errors;
}
