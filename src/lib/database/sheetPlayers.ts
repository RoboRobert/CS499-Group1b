import sql from "$lib/database/postgres.server";

export async function getSheetPlayers(sheet_id: string): Promise<SheetPlayer[]> {
  const sheetPlayers = await sql<SheetPlayer[]>`
        SELECT * FROM sheetplayers WHERE sheet_id = ${sheet_id}
      `;
  return sheetPlayers;
}

export async function addSheetPlayer(player: SheetPlayer) {
  let sheet_id = player.sheet_id;
  let side = player.side;
  let name = player.name;
  let position = player.position;
  let playerno = player.playerno;
  let quarter_1 = player.quarter_1;
  let quarter_2 = player.quarter_2;
  let quarter_3 = player.quarter_3;
  let quarter_4 = player.quarter_4;
  let ot = player.ot;
  let shots = player.shots;
  let groundballs = player.groundballs;
  const result = await sql`
      INSERT INTO sheetplayers (sheet_id, side, name, position, playerno, quarter_1, quarter_2, quarter_3, quarter_4, ot, shots, groundballs) 
      VALUES (${sheet_id}, ${side}, ${name}, ${position}, ${playerno}, ${quarter_1}, ${quarter_2}, ${quarter_3}, ${quarter_4}, ${ot}, ${shots}, ${groundballs}) RETURNING *;`;
}

export async function dbSheetPlayersReset() {
  await sql`DO $$ 
              DECLARE
                table_name text := 'sheetplayers';
              BEGIN
                EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
              END $$;
      `;

  //Not entirely sure about this for the table
  await sql`CREATE TABLE sheetplayers(
              SHEET_ID varchar(100),
              SIDE INT,
              NAME varchar(100),
              POSITION VARCHAR(100),
              PLAYERNO INT,
              QUARTER_1 BOOLEAN,
              QUARTER_2 BOOLEAN,
              QUARTER_3 BOOLEAN,
              QUARTER_4 BOOLEAN,
              OT BOOLEAN,
              SHOTS INT,
              GROUNDBALLS INT,
              Foreign key (SHEET_ID) references sheets(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`;

  const res = await addSheetPlayer({
      sheet_id: "dudes-bros-2025-04-03-15:20-0",
      side: 0,
      name: "Woah There",
      position: "ATTACK",
      playerno: 42,
      quarter_1: true,
      quarter_2: false,
      quarter_3: true,
      quarter_4: false,
      ot: true,
      shots: 10,
      groundballs: 5,
  })

  return res;
}
