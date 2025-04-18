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
  let index = player.index;
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
      INSERT INTO sheetplayers (sheet_id, side, index, name, position, playerno, quarter_1, quarter_2, quarter_3, quarter_4, ot, shots, groundballs) 
      VALUES (${sheet_id}, ${side}, ${index}, ${name}, ${position}, ${playerno}, ${quarter_1}, ${quarter_2}, ${quarter_3}, ${quarter_4}, ${ot}, ${shots}, ${groundballs}) RETURNING *;`;
}

export async function addSheetPlayers(players: SheetPlayer[]) {
  for(const sheetPlayer of players) {
    addSheetPlayer(sheetPlayer);
  }
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
              SHEET_ID varchar(300),
              SIDE INT,
              INDEX INT,
              NAME varchar(100),
              POSITION VARCHAR(100),
              PLAYERNO INT,
              QUARTER_1 BOOLEAN,
              QUARTER_2 BOOLEAN,
              QUARTER_3 BOOLEAN,
              QUARTER_4 BOOLEAN,
              OT BOOLEAN,
              SHOTS INTEGER[],
              GROUNDBALLS INTEGER[],
              Foreign key (SHEET_ID) references sheets(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`;

  const res = await addSheetPlayer({
    sheet_id: "dudes-bros-2025-04-03-15:20-0",
    side: 0,
    index: 0,
    name: "Woah There",
    position: "Attack",
    playerno: 42,
    quarter_1: true,
    quarter_2: false,
    quarter_3: true,
    quarter_4: false,
    ot: true,
    shots: [1,6,7,1,2],
    groundballs: [2,4,8,4,2],
  })

  return res;
}
