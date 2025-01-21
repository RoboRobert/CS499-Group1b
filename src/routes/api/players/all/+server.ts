import { json, type RequestHandler } from '@sveltejs/kit';
import type { Player } from '$lib/Player';
import db from '$lib/db';
 
// Loads the data of the player corresponding to the id defined by the endpoint slug
export const GET: RequestHandler = async ({ params }) => {
	const res = (await db.query('SELECT * FROM players'));

    let players: Player[] = []

    res.rows.forEach((player) => players.push({id: player.id, name: player.name, team: player.team}))
    return json(players);
};