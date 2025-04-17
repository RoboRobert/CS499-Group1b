import type { OtherStat } from "./OtherStat";
import { sql } from "./postgres.server";

export async function getOtherStats(sheetid: string): Promise<OtherStat[]> {
  const otherStats = await sql<OtherStat[]>`
      SELECT * FROM otherstats WHERE sheet_id = ${sheetid}
    `;

  return otherStats;
}

export async function addOtherStat(otherStat: OtherStat) {
  let sheetid = otherStat.sheet_id;
  let side = otherStat.side;
  let turnovers_half1 = otherStat.turnovers_half1;
  let turnovers_half2 = otherStat.turnovers_half2;
  let subs_half1 = otherStat.subs_half1;
  let subs_half2 = otherStat.subs_half2;
  const result = await sql`
    INSERT INTO otherstats (sheet_id, side, turnovers_half1, turnovers_half2, subs_half1, subs_half2) VALUES (${sheetid}, ${side}, ${turnovers_half1}, ${turnovers_half2}, ${subs_half1}, ${subs_half2}) RETURNING *
  `;

  return result;
}

export async function addOtherStats(otherStats: OtherStat[]) {
  for (const otherstat of otherStats) {
    addOtherStat(otherstat);
  }
}

export async function dbOtherStatsReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'otherstats';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE otherstats(
            SHEET_ID VARCHAR(100) NOT NULL,
            SIDE INT NOT NULL,
            TURNOVERS_HALF1 INT,
            TURNOVERS_HALF2 INT,
            SUBS_HALF1 INT,
            SUBS_HALF2 INT,
            Foreign key (SHEET_ID) references sheets(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`;

  await addOtherStat({
    sheet_id: "dudes-bros-2025-04-03-15:20-0",
    side: 0,
    turnovers_half1: 3,
    turnovers_half2: 4,
    subs_half1: 2,
    subs_half2: 10,
  });

  const res = await addOtherStat({
    sheet_id: "dudes-bros-2025-04-03-15:20-0",
    side: 1,
    turnovers_half1: 6,
    turnovers_half2: 9,
    subs_half1: 4,
    subs_half2: 20,
  });

  return res;
}
