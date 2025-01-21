import postgres from 'postgres'
import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Player } from '$lib/Player';

// const sql = postgres({ /* options */ }) // will use psql environment variables

const sql = postgres({
    user: PGUSER,
      password: PGPASSWORD,
      host: PGHOST,
      port: parseInt(PGPORT),
      database: PGDATABASE,
}); // will use psql environment variables

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