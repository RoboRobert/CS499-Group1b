import { error, json, type RequestHandler } from "@sveltejs/kit"

import {getTeams, addTeam} from "$lib/database/teams"
import { getTeam } from "$lib/database/teams";

// This probably wont work as indended because the table is not the same as the interface in the frontend
// But its a start
// api/teams Get
export async function GET({ params, cookies}) {
    const token = cookies.get("user-role");
    if (token !== "admin" && token !== "coach") {
        error(403, "You don't have the right O you don't have the right");
    }
    console.log(params)
    const { id } = params;
    const team = await getTeam(id)
    return json(team)
}

// I dont know what to do with this yet
// api/teams Post
export const POST: RequestHandler = async ({request, cookies}) => {
    const token = cookies.get("user-role");
    if (token !== "admin" && token !== "coach") {
        error(403, "You don't have the right O you don't have the right");
    }
    console.log(request)
    const {team} = await request.json()
    addTeam(team)
    return json({message: "Post request"})
}



