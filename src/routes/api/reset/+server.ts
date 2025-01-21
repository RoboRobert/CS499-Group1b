import pool from '$lib/dbtest1';
import { json, type RequestHandler } from '@sveltejs/kit';

// Sets up the database with tables containing the correct schemas
// Clears any old data from the database
export const GET: RequestHandler = async ({ request }) => {
  const dropTablesQuery = `
      DO $$ 
      DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
          EXECUTE 'DROP TABLE IF EXISTS public.' || r.tablename || ' CASCADE';
        END LOOP;
      END $$;
    `;

  // Drops all tables currently in the database
  await pool.query(
    dropTablesQuery
  );

  // Creates a table for storing players
  await pool.query(
    `CREATE TABLE players (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      team VARCHAR(100) NOT NULL
    );`
  )

  // Inserts some test players into the players table
  const result = await pool.query(
    `INSERT INTO players (name, team)
    VALUES ('John Doe', 'Team A'), 
        ('Jane Smith', 'Team B');`
  )

  return json(result);
};