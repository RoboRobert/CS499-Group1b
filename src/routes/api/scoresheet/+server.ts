import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from 'uuid';

import { coachName, type SheetData } from "$lib/components/scoresheet/data.svelte";
import { toTeamID } from "$lib/conversion/general.js";
import { goalsToDBGoals, metaStatsToDBMetaStats, otherStatsToDBOtherStats, penaltiesToDbPenalties as penaltiesToDBPenalties, playersToDBPlayers, playersToDBSheetPlayers, savesToDBSaves, statsToDBStats, timeoutsToDBTimeouts } from "$lib/conversion/sheetToDb.js";
import { addgameStats } from "$lib/database/gamestat.js";
import { addGoals } from "$lib/database/goals";
import { addOtherStats } from "$lib/database/otherStats.js";
import { addPenalties } from "$lib/database/penalties";
import { addSaves } from "$lib/database/saves";
import { addSheetInfo } from "$lib/database/sheetinfos.js";
import { addSheetPlayers } from "$lib/database/sheetPlayers.js";
import { addGameIfPossible, addSheet } from "$lib/database/sheets.js";
import { addOrUpdatePlayers, addTeamIfPossible } from "$lib/database/teams.js";
import { addTimeouts } from "$lib/database/timeouts";

export const POST = async ({ request }) => {
    // Parse incoming JSON data from the request body
    const rawData = await request.json();
  
    const data: SheetData = {
      game_id: rawData.game_id,
      teamName: rawData.teamName,
      coachName: rawData.coachName,
      players: rawData.players,
      saves: rawData.saves,
      clears: rawData.clears,
      faceoffs: rawData.faceoffs,
      extraMan: rawData.extraMan,
      timeouts: rawData.timeouts,
      penalties: rawData.penalties,
      metaStats: rawData.metaStats,
      goals: rawData.goals,
      goalTrack: rawData.goalTrack,
      turnovers: rawData.turnovers,
      substitutions: rawData.substitutions,
    };
    
    // Assign a game id to the scoresheet.
    // If one is supplied, use it. Otherwise, create a new one.
    let game_id = data.game_id;
    if(data.game_id == "") {
      game_id = `${data.teamName[0]}-${data.teamName[1]}-${data.metaStats.date}-${data.metaStats.gameStart}`;
    }

    // Use a random UUID to represent the sheet to prevent duplication.
    let sheet_uuid = uuidv4();
    const sheet_id = `${game_id}-${sheet_uuid}`;
  
    // Start by adding a game if necessary, then a sheet to that game.
    await addGameIfPossible({
      game_id: game_id,
      hometeam: data.teamName[0],
      awayteam: data.teamName[1],
      date: data.metaStats.date,
      time: data.metaStats.gameStart,
      homescore: data.goals[0].reduce((a, b) => b + a, 0),
      awayscore: data.goals[1].reduce((a, b) => b + a, 0),
    });
    await addSheet({
      game_id: game_id,
      sheet_id: sheet_id,
      scorekeeper: data.metaStats.scorekeeper,
    });
    
    await addGoals(goalsToDBGoals(sheet_id, data.goalTrack));
    await addSheetInfo(metaStatsToDBMetaStats(sheet_id, data.metaStats, data.coachName, data.teamName));
    await addgameStats(statsToDBStats(sheet_id, data.clears, data.faceoffs, data.extraMan));
    await addPenalties(penaltiesToDBPenalties(sheet_id, data.penalties));
    await addTimeouts(timeoutsToDBTimeouts(sheet_id, data.timeouts));
    await addSaves(savesToDBSaves(sheet_id, data.saves));
    await addSheetPlayers(playersToDBSheetPlayers(sheet_id, data.players));
    await addOtherStats(otherStatsToDBOtherStats(sheet_id, data.turnovers, data.substitutions));
    
    // If the scoresheet is added for the first time, update all related team and player stats
    if(data.game_id == "") {
      // Add home team if necessary
      await addTeamIfPossible({
        team_id: toTeamID(data.teamName[0]),
        team_name: data.teamName[0],
        hometown: "default",
        state: "default",
        coach: coachName[0],
      });

      // Add away team if necessary
      await addTeamIfPossible({
        team_id: toTeamID(data.teamName[1]),
        team_name: data.teamName[1],
        hometown: "default",
        state: "default",
        coach: coachName[1],
      });

      // Add players to home team or update them if they already exist
      await addOrUpdatePlayers(playersToDBPlayers(data.teamName[0], toTeamID(data.teamName[0]), data.players[0]));
      
      // Add players to away team or update them if they already exist
      await addOrUpdatePlayers(playersToDBPlayers(data.teamName[1], toTeamID(data.teamName[1]), data.players[1]));
    }
  
    // Return a message
    return json({ message: "Sheet successfuly uploaded." });
  };