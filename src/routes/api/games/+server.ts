import { getGames } from "$lib/database/sheets"
import { json, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async (event) => {
    const games = await getGames()

    return json(games)
}