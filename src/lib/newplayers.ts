import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Player } from '$lib/NewPlayer';

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

export async function getPlayers(): Promise<Player[]> {
  const players = await sql<Player[]>`
      SELECT * FROM players
    `

  return players
}

export async function getPlayer(name: string): Promise<Player> {
  const players = await sql<Player[]>`
      SELECT * FROM players WHERE name = ${name}
    `

  return players[0]
}

export async function addPlayer(players: Player) {
  let team = players.team;
  let name = players.name;
  let number = players.number;
  let position = players.position;
  let quarter = players.quarter;
  let shots = players.shots;
  let goals = players.goals;
  let miss = players.miss;
  let ground = players.ground;
  const result = await sql`
    INSERT INTO teams (team, name, number, position, quarter, shots, goals, miss, ground) VALUES (${team}, ${name}, ${number}, ${position}, ${quarter}, ${shots}, ${goals}, ${miss}, ${ground}) RETURNING *
  `

  return result
}

export async function deletePlayer(name: string) {
  const result = await sql`
      DELETE FROM players WHERE name = ${name}
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

  await sql`CREATE TABLE players (
      name VARCHAR(100) NOT NULL
    );`

  const res = await sql`INSERT INTO players (name)
    VALUES ('Team A'), 
        ('Team B');`

  return res;
}