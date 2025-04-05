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
      SELECT * FROM sheets WHERE game_id = ${game_id}
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
      SELECT * FROM sheets WHERE GAME_ID = ${gameId}
    `

  return sheets
}

export async function getGame(game_id: string): Promise<Game> {
  const games = await sql<Game[]>`
      SELECT * FROM games WHERE game_id = ${game_id}
    `

  return games[0]
}

export async function addSheet(sheet: Sheet) {
  let game_id = sheet.game_id;
  let sheetid = sheet.sheet_id;
  let scorekeeper = sheet.scorekeeper;
  const result = await sql`
    INSERT INTO sheets (game_id, sheet_id, scorekeeper) VALUES (${game_id}, ${sheetid}, ${scorekeeper}) RETURNING *
  `

  return result
}

export async function addGame(game: Game) {
  let game_id = game.game_id;
  let hometeam = game.hometeam;
  let awayteam = game.awayteam;
  let date = game.date;
  let time = game.time;
  let homescore = game.homescore;
  let awayscore = game.awayscore;
  const result = await sql`
    INSERT INTO games (game_id, hometeam, awayteam, date, time, homescore, awayscore) VALUES (${game_id}, ${hometeam}, ${awayteam}, ${date}, ${time}, ${homescore}, ${awayscore}) RETURNING *
  `

  return result
}

export async function addGameIfPossible(game: Game) {
  let game_id = game.game_id;
  let hometeam = game.hometeam;
  let awayteam = game.awayteam;
  let date = game.date;
  let time = game.time;
  let homescore = game.homescore;
  let awayscore = game.awayscore;
  const result = await sql`
   INSERT INTO games (game_id, hometeam, awayteam, date, time, homescore, awayscore) VALUES (${game_id}, ${hometeam}, ${awayteam}, ${date}, ${time}, ${homescore}, ${awayscore}) 
   ON CONFLICT (game_id) DO NOTHING RETURNING *;
  `

  return result
}

export async function deleteSheet(sheetid: string) {
  const result = await sql`
      DELETE FROM sheets WHERE sheet_id = ${sheetid}
    `

  return result
}

export async function deleteGame(game_id: string) {
  const result = await sql`
      DELETE FROM games WHERE game_id = ${game_id}
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
      GAME_ID VARCHAR(100) NOT NULL,
      HOMETEAM VARCHAR(100),
      AWAYTEAM VARCHAR(100),
      DATE VARCHAR(100),
      TIME VARCHAR(100),
      HOMESCORE INT,
      AWAYSCORE INT,
      primary key (GAME_ID));`

  const res = await addGame({
    game_id: 'dudes-bros-2025-04-03-15:20',
    hometeam: 'Dudes',
    awayteam: 'Bros',
    date: '2025-04-03',
    time: '15:20',
    homescore: 5,
    awayscore: 9
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
      GAME_ID VARCHAR(100) NOT NULL,
      SCOREKEEPER VARCHAR(100),
      PRIMARY KEY (SHEET_ID),
      FOREIGN KEY (GAME_ID) REFERENCES games(GAME_ID) ON DELETE CASCADE);`
    
  addSheet({
    game_id: "dudes-bros-2025-04-03-15:20", sheet_id: "dudes-bros-2025-04-03-15:20-0",
    scorekeeper: 'Dumb'
  })
  addSheet({
    game_id: "dudes-bros-2025-04-03-15:20", sheet_id: "dudes-bros-2025-04-03-15:20-1",
    scorekeeper: 'Dumber'
  })

  return res;
}