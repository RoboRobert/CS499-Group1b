import { updateTeam } from "$lib/database/teams";
import { type RequestHandler, json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request}) => {
    const team = await request.json()
    if(!team) {
        console.error("Team is invalid!");
        return;
    }
    updateTeam(team)
    return json({message: "Post request"})
}