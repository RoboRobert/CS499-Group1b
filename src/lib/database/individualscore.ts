import sql from '$lib/database/postgres.server';
import type { IndividualScore } from '$lib/database/IndividualScores';


// export async function getIndividualScores(): Promise<IndividualScore[]> {
//   const players = await sql<IndividualScore[]>`
//       SELECT * FROM individualscores
//     `

//   return players
// }

export async function getIndividualScores(sheetid: string): Promise<IndividualScore[]> {
  const players = await sql<IndividualScore[]>`
      SELECT * FROM individualscore WHERE sheet_id = ${sheetid}
    `

  return players;
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
    INSERT INTO individualscore (sheetid, side, playerno, player, goals, attempts, fails) VALUES (${sheetID}, ${side}, ${playerno}, ${player}, ${goals}, ${attempts}, ${fails}) RETURNING *
  `

  return result
}

export async function deleteIndividualScore(sheetid: number) {
  const result = await sql`
      DELETE FROM individualscore WHERE name = ${sheetid}
    `

  return result
}

export async function dbIndividualScoreReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'individualscore';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

    //Not entirely sure about this for the table
  await sql`CREATE TABLE individualscore(
            SHEET_ID INT,
            SIDE INT,
            PLAYER_NUMBER INT NOT NULL,
            PLAYER_NAME varchar(100),
            GOALS INT,
            ATTEMPTS INT,
            FAILS INT,
            PRIMARY KEY (PLAYER_NUMBER, SIDE));`;

  const res = await sql`INSERT INTO individualscore (SHEET_ID, SIDE, PLAYER_NUMBER, PLAYER_NAME, GOALS, ATTEMPTS, FAILS)
    VALUES (0, 0, '0', 'Dudebro', '0', '0', '0');`

  return res;
}