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

export async function addPenalty(penalty: Penalty) {
  let sheetid = penalty.sheet_id;
  let side = penalty.side;
  let pt = penalty.timeout;
  let playerno = penalty.player_number;
  let infraction = penalty.infraction;
  let quarter = penalty.quarter;
  let time = penalty.time;
  const result = await sql`
    INSERT INTO penalties (sheet_id, side, timeout, player_number, infraction, quarter, time) VALUES (${sheetid}, ${side}, ${pt}, ${playerno}, ${infraction}, ${quarter}, ${time}) RETURNING *
  `;

  return result;
}

export async function addPenalties(penalties: Penalty[]) {
  for(const penalty of penalties) {
    addPenalty(penalty);
  }
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
            SHEET_ID VARCHAR(100) NOT NULL,
            SIDE INT NOT NULL,
            TIMEOUT varchar(5),
            PLAYER_NUMBER INT,
            INFRACTION varchar(25),
            TIME varchar(5),
            QUARTER INT);`;

  await addPenalty({
    sheet_id: "dudes-bros-2025-04-03-15:20-0",
    side: 0,
    timeout: "3:20",
    player_number: 20,
    infraction: "Crosscheck",
    quarter: 2,
    time: "4:20",
  });

  const res = await addPenalty({
    sheet_id: "dudes-bros-2025-04-03-15:20-0",
    side: 0,
    timeout: "3:20",
    player_number: 69,
    infraction: "Crosscheck",
    quarter: 3,
    time: "5:20",
  });

  return res;
}
