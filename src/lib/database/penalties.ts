import sql from '$lib/database/postgres';
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Penalty } from '$lib/database/Penalty';

export async function getPenalties(): Promise<Penalty[]> {
  const penalties = await sql<Penalty[]>`
      SELECT * FROM penalties
    `

  return penalties
}

export async function getPenalty(sheetid: string): Promise<Penalty> {
  const penalties = await sql<Penalty[]>`
      SELECT * FROM penalties WHERE sheetid = ${sheetid}
    `

  return penalties[0]
}

export async function addPenalty(penalties: Penalty) {
  let sheetid = penalties.sheetid;
  let side = penalties.side;
  let pt = penalties.pt;
  let playerno = penalties.playerno;
  let infraction = penalties.infraction;
  let quarter = penalties.quarter;
  let time = penalties.time;
  const result = await sql`
    INSERT INTO teams (sheetid, side, pt, playerno, infraction, quarter, time) VALUES (${sheetid}, ${side}, ${pt}, ${playerno}, ${infraction}, ${quarter}, ${time}) RETURNING *
    INSERT INTO penalties (sheetid, side, pt, playerno, infraction, quarter, time) VALUES
      (401, 'Home', 1, 7, 'Holding', 1, 120),
      (402, 'Away', 2, 11, 'Slashing', 2, 305),
      (403, 'Home', 3, 5, 'Tripping', 2, 450),
      (404, 'Away', 4, 14, 'Cross-checking', 3, 615),
      (405, 'Home', 5, 3, 'Interference', 3, 730),
      (406, 'Away', 6, 10, 'Delay of game', 4, 840),
      (407, 'Home', 7, 6, 'Unsportsmanlike conduct', 4, 950),
      (408, 'Away', 8, 8, 'High-sticking', 1, 110),
      (409, 'Home', 9, 2, 'Hooking', 2, 250),
      (410, 'Away', 10, 12, 'Boarding', 3, 670);
        `

  return result
}

export async function deletePenalty(name: string) {
  const result = await sql`
      DELETE FROM penalties WHERE name = ${name}
    `

  return result
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
            SIDE varchar(25),
            PT INT NOT NULL,
            PLAYER_NUMBER INT NOT NULL,
            INFRACTION varchar(25),
            TIME INT NOT NULL,
            Foreign key (SHEET_ID) references Sheet_ID(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`

  const res = await sql`INSERT INTO players (SHEET_ID, SIDE, PT, PLAYER_NUMBER, INFRACTION, TIME)
    VALUES ('0', 'Home', '0', '0', 'None', '0');`

  return res;
}