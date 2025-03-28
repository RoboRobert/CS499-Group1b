import sql from '$lib/database/postgres.server';
import type { Timeout } from '$lib/database/Timeout';

export async function getTimeouts(): Promise<Timeout[]> {
  const players = await sql<Timeout[]>`
      SELECT * FROM timeouts
    `

  return players
}

export async function getTimeout(sheetid: number): Promise<Timeout> {
  const timeouts = await sql<Timeout[]>`
      SELECT * FROM timeouts WHERE sheetid = ${sheetid}
    `

  return timeouts[0]
}

export async function addTimeout(timeouts: Timeout) {
  let sheetid = timeouts.sheetid;
  let side = timeouts.side;
  let halfone = timeouts.halfone;
  let halftwo = timeouts.halftwo;
  let otone = timeouts.otone;
  let ottwo = timeouts.ottwo;
  const result = await sql`
    INSERT INTO timeouts (sheetid, side, halfone, halftwo, otone, ottwo) VALUES (${sheetid}, ${side}, ${halfone}, ${halftwo}, ${otone}, ${ottwo}) RETURNING *
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
            SIDE varchar(25),
            HALF_1_TIME INT,
            HALF_2_TIME INT,
            OT_1_TIME INT,
            OT_2_TIME INT,
            foreign key (SHEET_ID) references gamestats(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`

  const res = await sql`INSERT INTO timeouts (SHEET_ID, SIDE, HALF_1_TIME, HALF_2_TIME, OT_1_TIME, OT_2_TIME)
    VALUES ('0', 'None', '0', '0', '0', '0');`

  return res;
}