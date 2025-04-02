import { json } from "@sveltejs/kit";

import { getGameStat as getGameStats } from "$lib/database/gamestat.js";
import { getIndividualScores } from "$lib/database/individualscore.js";
import { getPenalties } from "$lib/database/penalties.js";
import { getSaves } from "$lib/database/saves.js";
import { getSheetInfo } from "$lib/database/sheetinfos";

export async function GET({ params }) {
    const { id } = params;
    const gameStats = await getGameStats(id);
    const penalties = await getPenalties(id);
    const saves = await getSaves(id);
    const individualScores = await getIndividualScores(id);
    const sheetInfo = await getSheetInfo(id);
    return json({gameStats, penalties, saves, individualScores, sheetInfo});
}
