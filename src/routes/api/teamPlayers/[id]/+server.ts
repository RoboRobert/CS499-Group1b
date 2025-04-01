import { json, type RequestHandler } from "@sveltejs/kit"

import {getPlayers, addPlayer, getPlayersByTeam,} from "$lib/database/teams"

// This probably wont work as indended because the table is not the same as the interface in the frontend
export async function GET({ params }) {
    // console.log(event)
    const { id } = params;
    console.log(id)
    const players = await getPlayersByTeam(id)
    return json(players)
}
