import { updateTeam } from "$lib/database/teams";
import { type RequestHandler, error, json } from "@sveltejs/kit";

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
    updateTeam(team)
    return json({message: "Post request"})
}