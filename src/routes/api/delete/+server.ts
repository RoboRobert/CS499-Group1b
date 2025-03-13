import { json, type RequestHandler } from '@sveltejs/kit';
import type { Player } from '$lib/Player';
import * as db from '$lib/db';
 
// Loads the data of the player corresponding to the id defined by the endpoint slug
export const DELETE: RequestHandler = async ({ request }) => {
    const { id } = await request.json();
	const res = db.deletePlayer(id)

    return json(res);
};