import sql from '$lib/database/postgres.server';
import type { Timeout } from '$lib/database/Timeout';

// export async function getTimeouts(): Promise<Timeout[]> {
//   const players = await sql<Timeout[]>`
//       SELECT * FROM timeouts
//     `

//   return players
// }

export async function getTimeouts(sheetid: string): Promise<Timeout[]> {
  const timeouts = await sql<Timeout[]>`
      SELECT * FROM timeouts WHERE sheet_id = ${sheetid}
    `

  return timeouts;
}

export async function addTimeout(timeouts: Timeout) {
  let sheetid = timeouts.sheetid;
  let side = timeouts.side;
  let halfone = timeouts.half_1_time;
  let halftwo = timeouts.half_2_time;
  let otone = timeouts.ot_1_time;
  let ottwo = timeouts.ot_2_time;
  const result = await sql`
    INSERT INTO timeouts (sheet_id, side, HALF_1_TIME, HALF_2_TIME, OT_1_TIME, OT_2_TIME) VALUES (${sheetid}, ${side}, ${halfone}, ${halftwo}, ${otone}, ${ottwo}) RETURNING *
  `

  return result
}

export async function deleteTimeout(sheetid: number) {
  const result = await sql`
      DELETE FROM timeouts WHERE name = ${sheetid}
    `

  return result
}

export async function dbTimeoutReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'timeouts';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE timeouts (
            SHEET_ID INT,
            SIDE INT,
            HALF_1_TIME VARCHAR(25),
            HALF_2_TIME VARCHAR(25),
            OT_1_TIME VARCHAR(25),
            OT_2_TIME VARCHAR(25),
            PRIMARY KEY (SHEET_ID, SIDE));`;

  const res = await addTimeout({
    sheetid: 0,
    side: 0,
    half_1_time: '3:30',
    half_2_time: '4:20',
    ot_1_time: '06:90',
    ot_2_time: '1:20'
  })

  return res;
}