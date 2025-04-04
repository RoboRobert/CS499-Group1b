import sql from '$lib/database/postgres.server';
import type { Save } from '$lib/database/Save';

// export async function getSaves(): Promise<Save[]> {
//   const penalties = await sql<Save[]>`
//       SELECT * FROM saves
//     `

//   return penalties
// }

export async function getSaves(sheetid: string): Promise<Save[]> {
  const saves = await sql<Save[]>`
      SELECT * FROM saves WHERE sheet_id = ${sheetid}
    `

  return saves;
}

export async function addSave(saves: Save) {
  let sheetid = saves.sheet_id;
  let side = saves.side;
  let playerno = saves.player_number;
  let quarterone = saves.quarter_1;
  let quartertwo = saves.quarter_2;
  let quarterthree = saves.quarter_3;
  let quarterfour = saves.quarter_4;
  let ot = saves.ot;
  const result = await sql`
    INSERT INTO saves (sheet_id, side, player_number, quarter_1, quarter_2, quarter_3, quarter_4, ot) VALUES (${sheetid}, ${side}, ${playerno}, ${quarterone}, ${quartertwo}, ${quarterthree}, ${quarterfour}, ${ot}) RETURNING *
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
            SHEET_ID VARCHAR(100) NOT NULL,
            SIDE INT,
            PLAYER_NUMBER INT NOT NULL,
            QUARTER_1 INT,
            QUARTER_2 INT,
            QUARTER_3 INT,
            QUARTER_4 INT,
            OT INT,
            PRIMARY KEY (PLAYER_NUMBER, SIDE));`;

  const res = await addSave({
    sheet_id: "dudes-bros-2025-04-03-15:20-0",
    side: 0,
    player_number: 69,
    quarter_1: 1,
    quarter_2: 2,
    quarter_3: 3,
    quarter_4: 4,
    ot: 5,
  }) 

  return res;
}