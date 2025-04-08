import { error, json, type RequestHandler } from "@sveltejs/kit";

import { addPlayer, getPlayerByID } from "$lib/database/teams";

// This probably wont work as indended because the table is not the same as the interface in the frontend
export async function GET({ params, cookies }) {
    const token = cookies.get("user-role");
    if (token !== "admin" && token !== "coach") {
        error(403, "You don't have the right O you don't have the right");
    }
    
    console.log(params);
    const { name } = params;
    const players = await getPlayerByID(name);
    return json(players)
}

// I dont know what to do with this yet
// api/teams Post
export const POST: RequestHandler = async ({request,cookies}) => {
    const token = cookies.get("user-role");
    if (token !== "admin" && token !== "coach") {
        error(403, "You don't have the right O you don't have the right");
    }
    console.log(request)
    const player = await request.json()
    addPlayer(player)

    return json({message: "Post request"})
}