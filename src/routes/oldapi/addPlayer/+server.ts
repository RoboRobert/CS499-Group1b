import pool from '$lib/dbtest1';
import { json, type RequestHandler } from '@sveltejs/kit';

// Inserts a new player into the "players table"
export const POST: RequestHandler = async ({ request }) => {
	const { name, team } = await request.json();

  // Query to insert data into the "players" table
  const result = await pool.query(
    'INSERT INTO players (name, team) VALUES ($1, $2) RETURNING *',
    [name, team]
  );

  return json(result);
};