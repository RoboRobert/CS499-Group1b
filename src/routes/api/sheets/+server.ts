import { json, type RequestHandler } from "@sveltejs/kit"

import {getGameSheets} from "$lib/database/sheets"

export async function GET({ request }) {
  const url = new URL(request.url);
  const gameid = url.searchParams.get('gameid'); // Get the 'gameid' query parameter
  const sheets = await getGameSheets(gameid);
  return json(sheets);
}