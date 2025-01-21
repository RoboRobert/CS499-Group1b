import pool from '$lib/db';
import { json, type RequestHandler } from '@sveltejs/kit';

// Inserts a new player into the "players table"
export const POST: RequestHandler = async ({ request }) => {
	const { name, team } = await request.json();

  // Query to insert data into the "users" table
  const result = await pool.query(
    'INSERT INTO players (user, email) VALUES ($1, $2) RETURNING *',
    [name, team]
  );

  return json(result);
};