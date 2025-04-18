import { json } from "@sveltejs/kit";

import { getTests } from "$lib/database/tests.js";

export async function GET({ request }) {
  // const url = new URL(request.url);
  // const gameid = url.searchParams.get('gameid'); // Get the 'gameid' query parameter
  const tests = await getTests();
  return json(tests);
}