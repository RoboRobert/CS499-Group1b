import { json } from "@sveltejs/kit";

import { getGameStat as getGameStats } from "$lib/database/gamestat.js";
import { getGoals } from "$lib/database/goals.js";
import { getPenalties } from "$lib/database/penalties.js";
import { getSaves } from "$lib/database/saves.js";
import { getSheetInfo } from "$lib/database/sheetinfos";
import { getSheetPlayers } from "$lib/database/sheetPlayers.js";
import { deleteSheet, getSheet } from "$lib/database/sheets.js";
import { getTimeouts } from "$lib/database/timeouts.js";

export async function GET({ params }) {
    const { sheet_id } = params;
    const sheet = await getSheet(sheet_id);
    const gameStats = await getGameStats(sheet_id);
    const penalties = await getPenalties(sheet_id);
    const saves = await getSaves(sheet_id);
    const sheetInfo = await getSheetInfo(sheet_id);
    const timeouts = await getTimeouts(sheet_id);
    const goals = await getGoals(sheet_id);
    const sheetPlayers = await getSheetPlayers(sheet_id);
    return json({sheet, gameStats, penalties, saves, sheetInfo, timeouts, goals, sheetPlayers});
}

export async function DELETE({ params }) {
    const { sheet_id } = params;

    deleteSheet(sheet_id);

    return json({message: `Sheet ${sheet_id} deleted successfully.`})
}