import sql from '$lib/database/postgres.server';
import type { SheetInfo } from '$lib/database/SheetInfo';

export async function getSheetInfos(): Promise<SheetInfo[]> {
  const penalties = await sql<SheetInfo[]>`
      SELECT * FROM sheetinfos
    `

  return penalties
}

export async function getSheetInfo(sheetid: string): Promise<SheetInfo> {
  const penalties = await sql<SheetInfo[]>`
      SELECT * FROM saves WHERE sheetid = ${sheetid}
    `

  return penalties[0]
}

export async function addSheetInfo(sheetinfos: SheetInfo) {
  let sheetid = sheetinfos.sheetid;
  let date = sheetinfos.date;
  let site = sheetinfos.site;
  let start = sheetinfos.start;
  let scorekeeper = sheetinfos.scorekeeper;
  let oppscorekeeper = sheetinfos.oppscorekeeper;
  let timekeeper = sheetinfos.timekeeper;
  let headofficial = sheetinfos.headofficial;
  let umpire = sheetinfos.umpire;
  let fieldjudge = sheetinfos.fieldjudge;
  const result = await sql`
    INSERT INTO sheetinfos (sheetid, date, site, start, scorekeeper, oppscorekeeper, timekeeper, headofficial, umpire, fieldjudge) VALUES (${sheetid}, ${date}, ${site}, ${start}, ${scorekeeper}, ${oppscorekeeper}, ${timekeeper}, ${headofficial}, ${umpire}, ${fieldjudge}) RETURNING *
  `

  return result
}

export async function deletePenalty(name: string) {
  const result = await sql`
      DELETE FROM sheetinfos WHERE name = ${name}
    `

  return result
}

export async function dbSheetInfoReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'sheetinfos';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE sheetinfos (
            SHEET_ID INT NOT NULL,
            DATE INT NOT NULL,
            SITE varchar(25),
            START_TIME INT NOT NULL,
            SCOREKEEPER varchar(25),
            OPPONENT_SCORE INT,
            TIMEKEEPER VARCHAR(25),
            HEAD_OFFICIAL varchar(25),
            UMPIRE varchar(25),
            FIELD_JUDGE varchar(25),
            PRIMARY KEY (SHEET_ID));`

  const res = await sql`INSERT INTO sheetinfos (SHEET_ID, DATE, SITE, START_TIME, SCOREKEEPER, OPPONENT_SCORE, TIMEKEEPER, HEAD_OFFICIAL, UMPIRE, FIELD_JUDGE)
    VALUES ('0', '0', 'None', '0', 'Dudebro', '0', 'Dudebro', 'Dudebro', 'Dudebro', 'Dudebro');`

  return res;
}