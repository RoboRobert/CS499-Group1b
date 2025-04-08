import { json } from "@sveltejs/kit";
import {v4 as uuidv4} from 'uuid';

import { type SheetData } from "$lib/components/scoresheet/data.svelte";
import { goalsToDBGoals, metaStatsToDBMetaStats, penaltiesToDbPenalties as penaltiesToDBPenalties, playersToDBPlayers, savesToDBSaves, statsToDBStats, timeoutsToDBTimeouts } from "$lib/conversion/sheetToDb.js";
import { addgameStats } from "$lib/database/gamestat.js";
import { addGoals } from "$lib/database/goals";
import { addPenalties } from "$lib/database/penalties";
import { addSaves } from "$lib/database/saves";
import { addSheetInfo } from "$lib/database/sheetinfos.js";
import { addSheetPlayers } from "$lib/database/sheetPlayers.js";
import { addGameIfPossible, addSheet, getSheetsByGame } from "$lib/database/sheets.js";
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
      groundBalls: rawData.groundBalls,
      shots: rawData.shots,
      clears: rawData.clears,
      faceoffs: rawData.faceoffs,
      extraMan: rawData.extraMan,
      timeouts: rawData.timeouts,
      penalties: rawData.penalties,
      metaStats: rawData.metaStats,
      goals: rawData.goals,
      goalTrack: rawData.goalTrack,
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
  
    await addSheetInfo(metaStatsToDBMetaStats(sheet_id, data.metaStats, data.coachName, data.teamName));
    await addgameStats(statsToDBStats(sheet_id, data.groundBalls, data.shots, data.clears, data.faceoffs, data.extraMan));
    await addPenalties(penaltiesToDBPenalties(sheet_id, data.penalties));
    await addTimeouts(timeoutsToDBTimeouts(sheet_id, data.timeouts));
    await addSaves(savesToDBSaves(sheet_id, data.saves));
    await addSheetPlayers(playersToDBPlayers(sheet_id, data.players));
    await addGoals(goalsToDBGoals(sheet_id, data.goalTrack));
  
    // Return a message
    return json({ message: "Sheet successfuly uploaded." });
  };