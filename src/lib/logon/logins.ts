import sql from '$lib/database/postgres.server';
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Login } from '$lib/logon/Login';

export async function getLogins(): Promise<Login[]> {
  const users = await sql<Login[]>`
      SELECT * FROM logins
    `

  return users
}

export async function getLoginUser(user: string): Promise<Login> {
  const logins = await sql<Login[]>`
      SELECT * FROM logins WHERE username = ${user}
    `

  return logins[0]
}

export async function getLoginPass(user: string, pass: string): Promise<Login> {
  const logins = await sql<Login[]>`
      SELECT * FROM logins WHERE password = ${pass} and username = ${user}
    `

  return logins[0]
}

export async function getLoginRole(user: string, pass: string): Promise<string> {
  const logins = await sql<Login[]>`
      SELECT role FROM logins WHERE password = ${pass} and username = ${user}
    `

  // Check if logins has only one result
  if (logins.length > 0 && logins.length < 2) {
    return logins[0].role; // Return the role directly from the first entry
  } else {
    throw new Error("User not found, or too many accounts with the same username");
  }
}

export async function addLogin(login: Login) {
  let user = login.user;
  let pass = login.pass;
  let role = login.role;

  const result = await sql`
    INSERT INTO logins (username, password, role) VALUES (${user}, ${pass}, ${role}) RETURNING *
  `

  return result
}

export async function deleteLogin(user: string) {
  const result = await sql`
      DELETE FROM logins WHERE username = ${user}
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
            role varchar(20),
            primary key (username, password));`

  const res = await sql`INSERT INTO logins (username, password)
    VALUES ('Dudebro', 'Dudebro');`

  return res;
}