import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Team } from '$lib/Team';

// const sql = postgres({
//   user: PGUSER,
//   password: PGPASSWORD,
//   host: PGHOST,
//   port: parseInt(PGPORT),
//   database: PGDATABASE,
// });

const sql = postgres({
  user: "postgres",
  password: "test",
  host: "localhost",
  port: 5432,
  database: "template1",
});

export default sql

export async function getTeams(): Promise<Team[]> {
  const players = await sql<Team[]>`
      SELECT * FROM teams
    `

  return players
}

export async function getTeam(name: string): Promise<Team> {
  const players = await sql<Team[]>`
      SELECT * FROM teams WHERE name = ${name}
    `

  return players[0]
}

export async function addTeam(player: Team) {
  let name = teams.name;
  const result = await sql`
    INSERT INTO teams (name) VALUES (${name}) RETURNING *
  `

  return result
}

export async function deleteTeam(name: string) {
  const result = await sql`
      DELETE FROM teams WHERE name = ${name}
    `

  return result
}

export async function dbReset() {
  await sql`DO $$ 
      DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
          EXECUTE 'DROP TABLE IF EXISTS public.' || r.tablename || ' CASCADE';
        END LOOP;
      END $$;
    `;

  await sql`CREATE TABLE teams (
      name VARCHAR(100) NOT NULL
    );`

  const res = await sql`INSERT INTO teams (name)
    VALUES ('Team A'), 
        ('Team B');`

  return res;
}