import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { GameStat } from '$lib/database/GameStats';

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
  await sql`CREATE TABLE gamestats (
      sheetid SERIAL PRIMARY KEY
    );`

  const res = await sql`INSERT INTO teams (name)
    VALUES ('Team A'), 
        ('Team B');`

  return res;
}