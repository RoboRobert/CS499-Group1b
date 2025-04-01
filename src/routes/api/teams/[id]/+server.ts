import { json, type RequestHandler } from "@sveltejs/kit"

import {getTeams, addTeam} from "$lib/database/teams"
import { getTeam } from "$lib/database/teams";

// This probably wont work as indended because the table is not the same as the interface in the frontend
// But its a start
// api/teams Get
export async function GET({ params }) {
    const { id } = params;
    const team = await getTeam(id)
    return json(team)
}

// I dont know what to do with this yet
// api/teams Post
export const POST: RequestHandler = async ({request}) => {
    const {team} = await request.json()
    addTeam(team)
    return json({message: "Post request"})
}
