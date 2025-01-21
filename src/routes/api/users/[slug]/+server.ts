import { json, type RequestHandler } from '@sveltejs/kit';
import type { Player } from '$lib/Player';
import db from '$lib/db';
 
// Loads the data of the player corresponding to the id defined by the endpoint slug
export const GET: RequestHandler = async ({ params }) => {
    const id = params.slug

	const res = (await db.query('SELECT * FROM players WHERE id = $1', [id])).rows[0];

    let user: Player = {id: res.id, name: res.name, team: res.team}
    return json(user);
};