import sql from '$lib/database/postgres';
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Sheet, Game } from '$lib/database/Sheet';

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

export async function dbResetGame() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'games';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE games (
      GAMEID INT NOT NULL,
      primary key (GAMEID));`

  const res = await sql`INSERT INTO games (GAMEID)
    VALUES ('0');`

  return res;
}

export async function dbResetSheet() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'sheets';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE sheets (
      SHEET_ID INT NOT NULL,
      GAMEID INT NOT NULL,
      PRIMARY KEY (SHEET_ID),
      FOREIGN KEY (GAMEID) REFERENCES games(GAMEID));`
    
  const res = await sql`INSERT INTO sheets (GAMEID, SHEET_ID)
    VALUES ('0', '0');`

  return res;
}