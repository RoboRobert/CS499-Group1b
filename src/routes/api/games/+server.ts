import { getGames } from "$lib/database/sheets"
import { error, json, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async (event) => {
    const token = event.cookies.get("user-role");
    // if (token !== "admin" && token !== "coach" && token !== 'score-keeper') {
    //     error(403, "You don't have the right O you don't have the right");
    // }
    const games = await getGames()

    return json(games)
}