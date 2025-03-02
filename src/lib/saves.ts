import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Saves } from '$lib/Save';

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

export async function getSaves(): Promise<Save[]> {
  const penalties = await sql<Penalty[]>`
      SELECT * FROM saves
    `

  return penalties
}

export async function getPenalty(sheetid: string): Promise<Penalty> {
  const penalties = await sql<Penalty[]>`
      SELECT * FROM saves WHERE sheetid = ${sheetid}
    `

  return penalties[0]
}

export async function addPenalty(penalties: Penalty) {
  let sheetid = penalties.sheetid;
  let side = penalties.side;
  let player = penalties.player;
  let playerno = penalties.playerno;
  let quarterone = penalties.quarterone;
  let quartertwo = penalties.quartertwo;
  let quarterthree = penalties.quarterthreee;
  let quarterfour = penalties.quarterfour;
  let ot = penalties.ot;
  let total = penalties.ot;
  const result = await sql`
    INSERT INTO teams (sheetid, side, player, playerno, quarterone, quartertwo, quarterthree, quarterfour, ot, total) VALUES (${sheetid}, ${side}, ${player}, ${playerno}, ${quarterone}, ${quartertwo}, ${quarterthree}, ${quarterfour}, ${ot}, ${total}) RETURNING *
  `

  return result
}

export async function deletePenalty(name: string) {
  const result = await sql`
      DELETE FROM saves WHERE name = ${name}
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