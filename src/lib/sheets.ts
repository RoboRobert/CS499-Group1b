import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Sheet } from '$lib/Sheet';

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

export async function getSheets(): Promise<Sheet[]> {
  const players = await sql<Sheet[]>`
      SELECT * FROM sheets
    `

  return players
}

export async function getSheet(sheetid: number): Promise<Sheet> {
  const players = await sql<Sheet[]>`
      SELECT * FROM sheets WHERE sheetid = ${sheetid}
    `

  return players[0]
}

export async function addSheet(sheet: Sheet) {
  let sheetID = sheet.sheetid;
  const result = await sql`
    INSERT INTO sheets (sheetid) VALUES (${sheetID}) RETURNING *
  `

  return result
}

export async function deleteSheet(sheetid: number) {
  const result = await sql`
      DELETE FROM teams WHERE name = ${sheetid}
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
  await sql`CREATE TABLE sheets (
      sheetid SERIAL PRIMARY KEY
    );`

  const res = await sql`INSERT INTO teams (name)
    VALUES ('Team A'), 
        ('Team B');`

  return res;
}