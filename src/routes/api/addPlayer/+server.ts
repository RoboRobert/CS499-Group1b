import { json, type RequestHandler } from '@sveltejs/kit';
import * as db from '$lib/db';
import type { Player } from '$lib/Player';

// Loads the data of the player corresponding to the id defined by the endpoint slug
export const POST: RequestHandler = async ({ request }) => {
  console.log(request);
  const data = await request.formData();
  let player: Player = { name: data.get('name').toString(), team: data.get('team').toString() };

  const res = db.addPlayer(player);

  return json(res);
};