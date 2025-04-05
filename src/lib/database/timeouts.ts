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

export async function addTimeout(timeout: Timeout) {
  let sheet_id = timeout.sheet_id;
  let side = timeout.side;
  let first_1_time = timeout.first_1_time;
  let first_1_period = timeout.first_1_period;
  let first_2_time = timeout.first_2_time;
  let first_2_period = timeout.first_2_period;
  let second_1_time = timeout.second_1_time;
  let second_1_period = timeout.second_1_period;
  let second_2_time = timeout.second_2_time;
  let second_2_period = timeout.second_2_period;
  let ot_1_time = timeout.ot_1_time;
  let ot_2_time = timeout.ot_2_time;
  
  const result = await sql`
    INSERT INTO timeouts 
    (sheet_id, side, first_1_time, first_1_period, first_2_time, first_2_period, second_1_time, second_1_period, second_2_time, second_2_period, ot_1_time, ot_2_time) VALUES 
    (${sheet_id}, ${side}, ${first_1_time}, ${first_1_period}, ${first_2_time}, ${first_2_period}, ${second_1_time}, ${second_1_period}, ${second_2_time}, ${second_2_period}, ${ot_1_time}, ${ot_2_time}) RETURNING *;
  `

  return result
}

export async function addTimeouts(timeouts: Timeout[]) {
  for(const timeout of timeouts) {
    addTimeout(timeout);
  }
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
            SHEET_ID VARCHAR(100),
            SIDE INT,
            first_1_time VARCHAR(5),
            first_1_period INT,
            first_2_time VARCHAR(5),
            first_2_period INT,
            second_1_time VARCHAR(5),
            second_1_period INT,
            second_2_time VARCHAR(5),
            second_2_period INT,
            ot_1_time VARCHAR(5),
            ot_2_time VARCHAR(5));`;

  const res = await addTimeout({
    sheet_id: "first",
    side: 0,
    first_1_time: '03:30',
    first_1_period: 3,
    first_2_time: '03:40',
    first_2_period: 5,
    second_1_time: '03:50',
    second_1_period: 7,
    second_2_time: '04:20',
    second_2_period: 1,
    ot_1_time: '06:20',
    ot_2_time: '06:40'
  })

  return res;
}