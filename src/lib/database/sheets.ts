import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Sheet, Game } from '$lib/database/Sheet';

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

export async function getSheets(): Promise<Sheet[]> {
  const sheets = await sql<Sheet[]>`
      SELECT * FROM sheets
    `

  return sheets
}

export async function getGames(): Promise<Game[]> {
  const games = await sql<Game[]>`
      SELECT * FROM games
    `

  return games
}

export async function getSheet(sheetid: string): Promise<Sheet> {
  const sheets = await sql<Sheet[]>`
      SELECT * FROM sheets WHERE sheetid = ${sheetid}
    `

  return sheets[0]
}

export async function getGame(gameid: string): Promise<Game> {
  const games = await sql<Game[]>`
      SELECT * FROM games WHERE gameid = ${gameid}
    `

  return games[0]
}

export async function addSheet(sheet: Sheet) {
  let gameid = sheet.gameid;
  let sheetid = sheet.sheetid;
  const result = await sql`
    INSERT INTO sheets (gameid, sheetid) VALUES (${gameid}, ${sheetid}) RETURNING *
  `

  return result
}

export async function addGame(sheet: Game) {
  let gameid = sheet.gameid;
  const result = await sql`
    INSERT INTO games (gameid) VALUES (${gameid}) RETURNING *
  `

  return result
}

export async function deleteSheet(sheetid: string) {
  const result = await sql`
      DELETE FROM sheets WHERE sheetid = ${sheetid}
    `

  return result
}

export async function deleteGame(gameid: string) {
  const result = await sql`
      DELETE FROM games WHERE gameid = ${gameid}
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
      gameid SERIAL PRIMARY KEY
      sheetid SERIAL PRIMARY KEY
    );`

  await sql`CREATE TABLE games (
      gameid SERIAL PRIMARY KEY
    );`

  const res = await sql`INSERT INTO teams (name)
    VALUES ('Team A'), 
        ('Team B');`

  return res;
}