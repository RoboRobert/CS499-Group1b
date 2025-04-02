import { json, type RequestHandler } from "@sveltejs/kit";

import { getGameStat as getGameStats } from "$lib/database/gamestat.js";
import { gameStatsToStats } from "$lib/conversion/dbToSheet.js";

export async function GET({ params }) {
    const { id } = params;
    const gameStats = await getGameStats(id);
    const stats = gameStatsToStats(gameStats);
    return json(stats);
}
