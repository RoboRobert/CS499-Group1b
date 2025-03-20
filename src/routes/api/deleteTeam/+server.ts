import type { RequestHandler } from "@sveltejs/kit";
import { deleteTeam} from "$lib/database/teams"



export const DELETE: RequestHandler = async ({request}) => {
    const { team } = await request.json();
    const response = deleteTeam(team.teamId);
    return new Response(JSON.stringify(response));
    
    
}