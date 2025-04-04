import sql from '$lib/database/postgres.server';
import type { Sheet, Game } from '$lib/database/Sheet';

export async function getSheets(): Promise<Sheet[]> {
  const sheets = await sql<Sheet[]>`
      SELECT * FROM sheets
    `

  return sheets
}

export async function getSheetsByGame(game_id: string): Promise<Sheet[]> {
  const sheets = await sql<Sheet[]>`
      SELECT * FROM sheets WHERE gameid = ${game_id}
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
      SELECT * FROM sheets WHERE sheet_id = ${sheetid}
    `

  return sheets[0]
}

export async function getGameSheets(gameId: string): Promise<Sheet[]> {
  const sheets = await sql<Sheet[]>`
      SELECT * FROM sheets WHERE GAMEID = ${gameId}
    `

  return sheets
}

export async function getGame(gameid: string): Promise<Game> {
  const games = await sql<Game[]>`
      SELECT * FROM games WHERE gameid = ${gameid}
    `

  return games[0]
}

export async function addSheet(sheet: Sheet) {
  let gameid = sheet.gameid;
  let sheetid = sheet.sheet_id;
  const result = await sql`
    INSERT INTO sheets (gameid, sheet_id) VALUES (${gameid}, ${sheetid}) RETURNING *
  `

  return result
}

export async function addGame(game: Game) {
  let gameid = game.gameid;
  const result = await sql`
    INSERT INTO games (gameid) VALUES (${gameid}) RETURNING *
  `

  return result
}

export async function addGameIfPossible(game: Game) {
  let gameid = game.gameid;
  const result = await sql`
   INSERT INTO games (gameid) VALUES (${gameid}) ON CONFLICT (gameid) DO NOTHING RETURNING *;
  `

  return result
}

export async function deleteSheet(sheetid: string) {
  const result = await sql`
      DELETE FROM sheets WHERE sheet_id = ${sheetid}
    `

  return result
}

export async function deleteGame(gameid: string) {
  const result = await sql`
      DELETE FROM games WHERE gameid = ${gameid}
    `

  return result
}

export async function dbGameReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'games';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE games (
      GAMEID VARCHAR(100) NOT NULL,
      primary key (GAMEID));`

  const res = await addGame({
    gameid: '0'
  });

  return res;
}

export async function dbSheetReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'sheets';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  const res = await sql`CREATE TABLE sheets (
      SHEET_ID VARCHAR(100) NOT NULL,
      GAMEID VARCHAR(100) NOT NULL,
      PRIMARY KEY (SHEET_ID),
      FOREIGN KEY (GAMEID) REFERENCES games(GAMEID));`
    
  addSheet({gameid: "0", sheet_id: "first"})
  addSheet({gameid: "0", sheet_id: "second"})

  return res;
}