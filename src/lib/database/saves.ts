import sql from '$lib/database/postgres';
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Save } from '$lib/database/Save';

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
    INSERT INTO saves (sheetid, side, player, playerno, quarterone, quartertwo, quarterthree, quarterfour, ot, total) VALUES
    (501, 'Home', 'Alex Carter', 1, 3, 4, 5, 2, 1, 15),
    (502, 'Away', 'Jake Lee', 12, 2, 3, 4, 3, 0, 12),
    (503, 'Home', 'Chris Nguyen', 5, 1, 2, 3, 2, 0, 8),
    (504, 'Away', 'Liam Davis', 9, 4, 5, 4, 4, 1, 18),
    (505, 'Home', 'Sam Jordan', 7, 2, 2, 2, 2, 1, 9),
    (506, 'Away', 'Noah Kim', 10, 3, 3, 3, 3, 0, 12);`

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
            foreign key (SHEET_ID) references sheet_ID(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`

  const res = await sql`INSERT INTO players (SHEET_ID, SIDE, PLAYER_NAME, PLAYER_NUMBER, QUARTER_1, QUARTER_2, QUARTER_3, QUARTER_4, OT, TOTAL)
    VALUES ('0', 'Home', 'Dudebro', '0', '0', '0', '0', '0', '0', '0');`

  return res;
}