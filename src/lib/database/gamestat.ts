import sql from '$lib/database/postgres';
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { GameStat } from '$lib/database/GameStats';

export async function getGameStats(): Promise<GameStat[]> {
  const players = await sql<GameStat[]>`
      SELECT * FROM gamestats
    `

  return players
}

export async function getGameStat(sheetid: number): Promise<GameStat> {
  const players = await sql<GameStat[]>`
      SELECT * FROM gamestats WHERE sheetid = ${sheetid}
    `

  return players[0]
}

export async function addGameStat(gamestat: GameStat) {
  let sheetID = gamestat.sheetid;
  let side = gamestat.side;
  let quarter = gamestat.quarter;
  let ground = gamestat.ground;
  let shots = gamestat.shots;
  let clearpass = gamestat.clearpass;
  let clearfail = gamestat.clearfail;
  let extrascore = gamestat.extrascore;
  let extrafail = gamestat.extrafail;
  let faceoffwin = gamestat.faceoffwin;
  let faceoffloss = gamestat.faceoffloss;
  const result = await sql`
    INSERT INTO gamestats (sheetid, side, quarter, ground, shots, clearpass, clearfail, extrascore, extrafail, faceoffwin, faceoffloss) VALUES (${sheetID}, ${side}, ${quarter}, ${ground}, ${shots}, ${clearpass}, ${clearfail}, ${extrascore}, ${extrafail}, ${faceoffwin}, ${faceoffloss}) RETURNING *
  `

  return result
}

export async function deleteGameStat(sheetid: number) {
  const result = await sql`
      DELETE FROM gamestats WHERE sheetid = ${sheetid}
    `

  return result
}

export async function dbGameStatReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'gamestats';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

    //Not entirely sure about this for the table
  await sql`CREATE TABLE gamestats(
            SHEET_ID INT,
            SIDE varchar(25),
            QUARTER INT,
            SHOTS INT,
            CLEARS_PASS INT,
            CLEARS_FAIL INT,
            EXTRA_MAN_SCORE INT,
            EXTRA_MAN_FAIL INT,
            FACEOFF_WIN INT,
            FACEOFF_LOSS INT,
            primary key (SHEET_ID, SIDE));`

  const res = await sql`INSERT INTO teams (name)
    VALUES ('Team A'), 
        ('Team B');`

  return res;
}