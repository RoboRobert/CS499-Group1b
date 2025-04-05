import { error, json, type RequestHandler } from "@sveltejs/kit"

import {getTeams, addTeam, deleteTeam, updateTeam} from "$lib/database/teams"

// This probably wont work as indended because the table is not the same as the interface in the frontend
// But its a start
// api/teams Get
export const GET: RequestHandler = async (event) => {
    const token = event.cookies.get("user-role");
    if (token !== "admin" && token !== "coach") {
        error(403, "You don't have the right O you don't have the right");
    }
    console.log(event)
    const teams = await getTeams()
    return json(teams)
}

// I dont know what to do with this yet
// api/teams Post
export const POST: RequestHandler = async ({request, cookies}) => {
    const token = cookies.get("user-role");
    if (token !== "admin" && token !== "coach") {
        error(403, "You don't have the right O you don't have the right");
    }
    const team = await request.json()
    console.log(team);
    if(!team) {
        console.error("Team is invalid!");
        return;
    }
    addTeam(team)
    return json({message: "Post request"})
}

export const DELETE: RequestHandler = async ({request}) => {
    const teamID = await request.json();
    console.log(teamID);
    const response = deleteTeam(teamID);
    return new Response(JSON.stringify(response));
}
