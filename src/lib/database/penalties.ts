import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Penalty } from '$lib/database/Penalty';

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

export default sql

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

  await sql`CREATE TABLE penalty (
      name VARCHAR(100) NOT NULL
    );`

  const res = await sql`INSERT INTO players (name)
    VALUES ('Team A'), 
        ('Team B');`

  return res;
}