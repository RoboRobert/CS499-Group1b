import sql from '$lib/database/postgres.server';
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Login } from '$lib/logon/Login';

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

export async function dbLoginReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'logins';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

    //Not entirely sure about this for the table
  await sql`CREATE TABLE logins (
            username varchar(25),
            password varchar(25),
            primary key (username, password));`

  const res = await sql`INSERT INTO logins (username, password)
    VALUES ('Dudebro', 'Dudebro');`

  return res;
}