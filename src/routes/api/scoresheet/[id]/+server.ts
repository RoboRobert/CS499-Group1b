import { json } from "@sveltejs/kit";

import { getGameStat as getGameStats } from "$lib/database/gamestat.js";
import { getGoals } from "$lib/database/goals.js";
import { getPenalties } from "$lib/database/penalties.js";
import { getSaves } from "$lib/database/saves.js";
import { getSheetInfo } from "$lib/database/sheetinfos";
import { getSheetPlayers } from "$lib/database/sheetPlayers.js";
import { deleteSheet } from "$lib/database/sheets.js";
import { getTimeouts } from "$lib/database/timeouts.js";

export async function GET({ params }) {
    const { id } = params;
    const gameStats = await getGameStats(id);
    const penalties = await getPenalties(id);
    const saves = await getSaves(id);
    const sheetInfo = await getSheetInfo(id);
    const timeouts = await getTimeouts(id);
    const goals = await getGoals(id);
    const sheetPlayers = await getSheetPlayers(id);
    return json({gameStats, penalties, saves, sheetInfo, timeouts, goals, sheetPlayers});
}

export async function DELETE({ params }) {
    const { id } = params;

    deleteSheet(id);

    return json({message: `Sheet ${id} deleted successfully.`})
}