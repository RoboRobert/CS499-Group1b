import * as db from '$lib/db';
import { json, type RequestHandler } from '@sveltejs/kit';

// Sets up the database with tables containing the correct schemas
// Clears any old data from the database
export const GET: RequestHandler = async ({ request }) => {
  try {
    const res = db.dbReset();

    return json(res);
  } catch (error) {
    return json(error);
  }
};