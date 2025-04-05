import { updatePlayer } from "$lib/database/teams"
import { json, type RequestHandler} from "@sveltejs/kit"


export const POST: RequestHandler = async ({request}) => {
    const player = await request.json()
    if(!player){
        console.error("Player is Invalid")
        return;
    }
    updatePlayer(player)

    return json({message: "Post request"})
}