import sql from '$lib/database/postgres';
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
    INSERT INTO logins (user, pass) VALUES
    ('alex.carter', 'pass1234'),
    ('sam.jordan', 'securePass!'),
    ('jake.lee', 'qwerty2025'),
    ('liam.davis', 'LiamPass789'),
    ('chris.nguyen', 'Nguyen#456'),
    ('noah.kim', 'KimSecure99'),
    ('ryan.moore', 'Moore@321'),
    ('daniel.smith', 'Smith!2025');
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
            USER varchar(25),
            PASS varchar(25),
            primary key (USER, PASS));`

  const res = await sql`INSERT INTO logins (USER, PASS)
    VALUES ('Dudebro', 'Dudebro');`

  return res;
}