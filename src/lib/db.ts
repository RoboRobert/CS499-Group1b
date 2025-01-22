import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Player } from '$lib/Player';

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

export async function getPlayer(id: number): Promise<Player> {
  const players = await sql<Player[]>`
      SELECT * FROM players WHERE id = ${id}
    `

  return players[0]
}

export async function addPlayer(player: Player) {
  let name = player.name;
  let team = player.team;
  const result = await sql`
    INSERT INTO players (name, team) VALUES (${name}, ${team}) RETURNING *
  `

  return result
}

export async function deletePlayer(id: number) {
  const result = await sql`
      DELETE FROM players WHERE id = ${id}
    `

  return result
}