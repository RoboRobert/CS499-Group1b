import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Save } from '$lib/Save';

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
  const penalties = await sql<Save[]>`
      SELECT * FROM saves
    `

  return penalties
}

export async function getSave(sheetid: string): Promise<Save> {
  const saves = await sql<Save[]>`
      SELECT * FROM saves WHERE sheetid = ${sheetid}
    `

  return saves[0]
}

export async function addSave(saves: Save) {
  let sheetid = saves.sheetid;
  let side = saves.side;
  let player = saves.player;
  let playerno = saves.playerno;
  let quarterone = saves.quarterone;
  let quartertwo = saves.quartertwo;
  let quarterthree = saves.quarterthreee;
  let quarterfour = saves.quarterfour;
  let ot = saves.ot;
  let total = saves.total;
  const result = await sql`
    INSERT INTO teams (sheetid, side, player, playerno, quarterone, quartertwo, quarterthree, quarterfour, ot, total) VALUES (${sheetid}, ${side}, ${player}, ${playerno}, ${quarterone}, ${quartertwo}, ${quarterthree}, ${quarterfour}, ${ot}, ${total}) RETURNING *
  `

  return result
}

export async function deleteSave(name: string) {
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