import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Timeout } from '$lib/Timeout';

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
  await sql`CREATE TABLE timeouts (
      sheetid SERIAL PRIMARY KEY
    );`

  const res = await sql`INSERT INTO timeouts (name)
    VALUES ('Team A'), 
        ('Team B');`

  return res;
}