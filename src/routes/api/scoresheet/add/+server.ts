import type { SheetData } from "$lib/components/scoresheet/data.svelte";
import { json } from "@sveltejs/kit";
import type { SheetInfo } from "$lib/database/SheetInfo.js";
import { addSheetInfo } from "$lib/database/sheetinfos.js";
import { addGameStat } from "$lib/database/gamestat.js";
import type { GameStat } from "$lib/database/GameStats.js";
import { statsToGameStats } from "$lib/conversion/sheetToDb.js";

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

  const sheetInfo: SheetInfo = {
    sheet_id: "test",
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

//   const gameStats = statsToGameStats()

//   await addSheetInfo(sheetInfo);
//   await addGameStat(gameStat);

  // Return a message
  return json({ message: "Sheet successfuly uploaded." });
};
