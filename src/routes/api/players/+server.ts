import { json, type RequestHandler } from "@sveltejs/kit"

import {getPlayers, addPlayer} from "$lib/database/teams"

// This probably wont work as indended because the table is not the same as the interface in the frontend
// But its a start
// api/players Get
export const GET: RequestHandler = async (event) => {
    console.log(event)
    const players = await getPlayers()
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