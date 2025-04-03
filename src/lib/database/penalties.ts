import { sql } from "./postgres.server";
import type { Penalty } from "$lib/database/Penalty";

// export async function getPenalties(): Promise<Penalty[]> {
//   const penalties = await sql<Penalty[]>`
//       SELECT * FROM penalties
//     `

//   return penalties
// }

export async function getPenalties(sheetid: string): Promise<Penalty[]> {
  const penalties = await sql<Penalty[]>`
      SELECT * FROM penalties WHERE sheet_id = ${sheetid}
    `;

  return penalties;
}

export async function addPenalty(penalties: Penalty) {
  let sheetid = penalties.sheet_id;
  let side = penalties.side;
  let pt = penalties.timeout;
  let playerno = penalties.player_number;
  let infraction = penalties.infraction;
  let quarter = penalties.quarter;
  let time = penalties.time;
  const result = await sql`
    INSERT INTO penalties (sheet_id, side, timeout, player_number, infraction, quarter, time) VALUES (${sheetid}, ${side}, ${pt}, ${playerno}, ${infraction}, ${quarter}, ${time}) RETURNING *
  `;

  return result;
}

export async function deletePenalty(name: string) {
  const result = await sql`
      DELETE FROM penalties WHERE name = ${name}
    `;

  return result;
}

export async function dbPenaltyReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'penalties';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE penalties(
            SHEET_ID INT NOT NULL,
            SIDE INT,
            TIMEOUT varchar(5),
            PLAYER_NUMBER INT NOT NULL,
            INFRACTION varchar(25),
            TIME varchar(5),
            QUARTER INT,
            PRIMARY KEY (PLAYER_NUMBER, SIDE));`;

  await addPenalty({
    sheet_id: 0,
    side: 0,
    timeout: "3:20",
    player_number: 20,
    infraction: "Crosscheck",
    quarter: 2,
    time: "4:20",
  });

  const res = await addPenalty({
    sheet_id: 0,
    side: 0,
    timeout: "3:20",
    player_number: 69,
    infraction: "Crosscheck",
    quarter: 2,
    time: "4:20",
  });

  return res;
}
