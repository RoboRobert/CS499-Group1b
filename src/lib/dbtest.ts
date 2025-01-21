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

async function getUsersOver(age) {
    const users = await sql`
      select
        name,
        age
      from users
      where age > ${age}
    `
    // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
    return users
}

async function insertUser({ name, age }) {
    const users = await sql`
      insert into users
        (name, age)
      values
        (${name}, ${age})
      returning name, age
    `
    // users = Result [{ name: "Murray", age: 68 }]
    return users
}

export async function getPlayers(): Promise<Player[]> {
    const players = await sql<Player[]>`
      SELECT * FROM players
    `

    return players
}