import { json } from "@sveltejs/kit";

import { getSheetsByGame } from "$lib/database/sheets";

export async function GET({ request }) {
  const url = new URL(request.url);
  const gameid = url.searchParams.get('gameid'); // Get the 'gameid' query parameter
  const sheets = await getSheetsByGame(gameid);
  return json(sheets);
}