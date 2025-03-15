import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Login } from '$lib/logon/Login';

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

export async function getLogins(): Promise<Login[]> {
  const users = await sql<Login[]>`
      SELECT * FROM logins
    `

  return users
}

export async function getLogin(user: string): Promise<Login> {
  const logins = await sql<Login[]>`
      SELECT * FROM gamestats WHERE sheetid = ${user}
    `

  return logins[0]
}

export async function addLogin(login: Login) {
  let user = login.user;
  let pass = login.pass;

  const result = await sql`
    INSERT INTO gamestats (user, pass) VALUES (${user}, ${pass}) RETURNING *
  `

  return result
}

export async function deleteLogin(user: string) {
  const result = await sql`
      DELETE FROM gamestats WHERE sheetid = ${user}
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

    //Not entirely sure about this for the table
  await sql`CREATE TABLE logins (
      sheetid SERIAL PRIMARY KEY
    );`

  const res = await sql`INSERT INTO teams (name)
    VALUES ('Team A'), 
        ('Team B');`

  return res;
}