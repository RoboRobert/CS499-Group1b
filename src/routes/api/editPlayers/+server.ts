import { updatePlayer } from "$lib/database/teams"
import { error, json, type RequestHandler} from "@sveltejs/kit"


export const POST: RequestHandler = async ({request, cookies}) => {
    const token = cookies.get("user-role");
    if (token !== "admin" && token !== "coach") {
    error(403, "You don't have the right O you don't have the right");
    }

    const player = await request.json()
    console.log("Received player for edit:", player);
    if(!player){
        console.error("Player is Invalid")
        return;
    }
    updatePlayer(player)

    return json({message: "Post request"})
}