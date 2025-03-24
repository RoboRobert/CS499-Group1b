import type { RequestHandler } from "@sveltejs/kit";
import { deletePlayer} from "$lib/database/teams"



export const DELETE: RequestHandler = async ({request}) => {
    const { player } = await request.json();
    const response = deletePlayer(player.playerId);
    return new Response(JSON.stringify(response));
    
    
}