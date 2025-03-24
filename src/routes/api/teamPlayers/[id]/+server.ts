import { json, type RequestHandler } from "@sveltejs/kit"

import {getPlayers, addPlayer, getPlayerFromTeam} from "$lib/database/teams"

// This probably wont work as indended because the table is not the same as the interface in the frontend
export async function GET({ params }) {
    // console.log(event)
    const { id } = params;
    const players = await getPlayerFromTeam(id)
    return json(players)
}

// I dont know what to do with this yet
// api/teams Post
export const POST: RequestHandler = async ({request}) => {
    console.log(request)
    const {player} = await request.json()
    addPlayer(player)

    return json({message: "Post request"})
}