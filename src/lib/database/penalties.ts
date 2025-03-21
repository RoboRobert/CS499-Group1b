import sql from '$lib/database/postgres.server';
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
    VALUES ('0', 'None', '0', '0', 'None', '0');`

  return res;
}