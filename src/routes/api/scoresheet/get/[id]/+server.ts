import { json, type RequestHandler } from "@sveltejs/kit";

import { getGameStat } from "$lib/database/gamestat.js";

export async function GET({ params }) {
    const { id } = params;
    const gameStats = await getGameStat(id);
    return json(gameStats)
}
