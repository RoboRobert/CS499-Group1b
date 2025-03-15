import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { IndividualScore } from '$lib/database/IndividualScores';

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

export async function getIndividualScores(): Promise<IndividualScore[]> {
  const players = await sql<IndividualScore[]>`
      SELECT * FROM individualscores
    `

  return players
}

export async function getIndividualScore(sheetid: number): Promise<IndividualScore> {
  const players = await sql<IndividualScore[]>`
      SELECT * FROM individualscores WHERE sheetid = ${sheetid}
    `

  return players[0]
}

export async function addIndividualScore(indiv: IndividualScore) {
  let sheetID = indiv.sheetid;
  let side = indiv.side;
  let playerno = indiv.playerno;
  let player = indiv.player;
  let goals = indiv.goals;
  let attempts = indiv.attempts;
  let fails = indiv.fails;
  const result = await sql`
    INSERT INTO individualscores (sheetid, side, playerno, player, goals, attempts, fails) VALUES (${sheetID}, ${side}, ${playerno}, ${player}, ${goals}, ${attempts}, ${fails}) RETURNING *
  `

  return result
}

export async function deleteIndividualScore(sheetid: number) {
  const result = await sql`
      DELETE FROM individualscores WHERE name = ${sheetid}
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
  await sql`CREATE TABLE individualscore(
            SHEET_ID INT,
            SIDE varchar(25),
            PLAYER_NUMBER INT NOT NULL,
            PLAYER_NAME varchar(25),
            GOALS INT,
            ATTEMPTS INT,
            FAILS INT,
            foreign key (SHEET_ID) references Game_Stats(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`

  const res = await sql`INSERT INTO teams (SHEET_ID, SIDE, PLAYER_NUMBER, PLAYER_NAME, GOALS, ATTEMPTS, FAILS)
    VALUES ('0', 'Home', '0', 'Dudebro', '0', '0', '0');`

  return res;
}