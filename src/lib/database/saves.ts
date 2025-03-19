import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Save } from '$lib/database/Save';

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
  let quarterthree = saves.quarterthree;
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

export async function dbSaveReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'saves';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE saves(
            SHEET_ID INT NOT NULL,
            SIDE varchar(25),
            PLAYER_NAME varchar(25),
            PLAYER_NUMBER INT NOT NULL,
            QUARTER_1 INT,
            QUARTER_2 INT,
            QUARTER_3 INT,
            QUARTER_4 INT,
            OT INT,
            TOTAL INT,
            foreign key (SHEET_ID) references Sheet_ID(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`

  const res = await sql`INSERT INTO players (SHEET_ID, SIDE, PLAYER_NAME, PLAYER_NUMBER, QUARTER_1, QUARTER_2, QUARTER_3, QUARTER_4, OT, TOTAL)
    VALUES ('0', 'Home', 'Dudebro', '0', '0', '0', '0', '0', '0', '0');`

  return res;
}