import type { SheetData } from "$lib/components/scoresheet/data.svelte";
import { json } from "@sveltejs/kit";
import type { SheetInfo } from "$lib/database/SheetInfo.js";
import { addSheetInfo } from "$lib/database/sheetinfos.js";
import { addGameStat } from "$lib/database/gamestat.js";
import type { GameStat } from "$lib/database/GameStats.js";
import { statsToGameStats } from "$lib/conversion/sheetToDb.js";
import { addGame, addGameIfPossible, addSheet, getSheetsByGame } from "$lib/database/sheets.js";

export const POST = async ({ request }) => {
  // Parse incoming JSON data from the request body
  const rawData = await request.json();

  const data: SheetData = {
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

  const game_id = `${data.teamName[0]}-${data.teamName[1]}-${data.metaStats.date}-${data.metaStats.gameStart}`;
  const numSheets = (await getSheetsByGame(game_id)).length;
  const sheet_id = `${game_id}-${numSheets}`;

  const sheetInfo: SheetInfo = {
    sheet_id: sheet_id,
    date: data.metaStats.date,
    site: data.metaStats.site,
    start_time: data.metaStats.gameStart,
    scorekeeper: data.metaStats.scorekeeper,
    oppscorekeeper: data.metaStats.oppScorekeeper,
    timekeeper: data.metaStats.timeKeeper,
    head_official: data.metaStats.headOfficial,
    umpire: data.metaStats.umpire,
    field_judge: data.metaStats.fieldJudge,
    lengthofquarters: data.metaStats.lengthOfQuarters,
    weathercondition: data.metaStats.weatherCondition,
    homecoach: data.coachName[0],
    awaycoach: data.coachName[1],
    hometeam: data.teamName[0],
    awayteam: data.teamName[1],
  };

  // const gameStats = statsToGameStats()

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
  await addSheetInfo(sheetInfo);
  // await addGameStat(gameStat);

  // Return a message
  return json({ message: "Sheet successfuly uploaded." });
};
