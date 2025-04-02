import { json } from "@sveltejs/kit";

import { getGameStat as getGameStats } from "$lib/database/gamestat.js";
import { getIndividualScores } from "$lib/database/individualscore.js";
import { getPenalties } from "$lib/database/penalties.js";
import { getSaves } from "$lib/database/saves.js";
import { getSheetInfo } from "$lib/database/sheetinfos";
import { getTimeouts } from "$lib/database/timeouts.js";
import { getGoals } from "$lib/database/goals.js";

export async function GET({ params }) {
    const { id } = params;
    const gameStats = await getGameStats(id);
    const penalties = await getPenalties(id);
    const saves = await getSaves(id);
    const sheetInfo = await getSheetInfo(id);
    const timeouts = await getTimeouts(id);
    const goals = await getGoals(id);
    return json({gameStats, penalties, saves, sheetInfo, timeouts, goals});
}
