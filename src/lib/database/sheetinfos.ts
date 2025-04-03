import sql from '$lib/database/postgres.server';
import type { SheetInfo } from '$lib/database/SheetInfo';


export async function getSheetInfo(sheetid: string): Promise<SheetInfo> {
  const sheetInfo = await sql<SheetInfo[]>`
      SELECT * FROM sheetinfo WHERE sheet_id = ${sheetid}
    `

  return sheetInfo[0];
}

export async function addSheetInfo(sheetinfo: SheetInfo) {
  let sheetid = sheetinfo.sheetid;
  let date = sheetinfo.date;
  let site = sheetinfo.site;
  let start = sheetinfo.start_time;
  let scorekeeper = sheetinfo.scorekeeper;
  let oppscorekeeper = sheetinfo.oppscorekeeper;
  let timekeeper = sheetinfo.timekeeper;
  let headofficial = sheetinfo.head_official;
  let umpire = sheetinfo.umpire;
  let fieldjudge = sheetinfo.field_judge;
  let weatherCondition = sheetinfo.weathercondition;
  let lengthOfQuarters = sheetinfo.lengthofquarters;
  const result = await sql`
    INSERT INTO sheetinfo (SHEET_ID, DATE, SITE, START_TIME, SCOREKEEPER, OPPSCOREKEEPER, TIMEKEEPER, HEAD_OFFICIAL, UMPIRE, FIELD_JUDGE, WEATHERCONDITION, LENGTHOFQUARTERS) VALUES (${sheetid}, ${date}, ${site}, ${start}, ${scorekeeper}, ${oppscorekeeper}, ${timekeeper}, ${headofficial}, ${umpire}, ${fieldjudge}, ${weatherCondition}, ${lengthOfQuarters}) RETURNING *
  `

  return result
}

export async function deletePenalty(name: string) {
  const result = await sql`
      DELETE FROM sheetinfo WHERE name = ${name}
    `

  return result
}

export async function dbSheetInfoReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'sheetinfo';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE sheetinfo (
            SHEET_ID VARCHAR(100) NOT NULL,
            DATE INT NOT NULL,
            SITE varchar(25),
            START_TIME INT NOT NULL,
            SCOREKEEPER varchar(25),
            OPPSCOREKEEPER varchar(25),
            TIMEKEEPER VARCHAR(25),
            HEAD_OFFICIAL varchar(25),
            UMPIRE varchar(25),
            FIELD_JUDGE varchar(25),
            WEATHERCONDITION varchar(25),
            LENGTHOFQUARTERS varchar(25),
            PRIMARY KEY (SHEET_ID));`

  const res = await addSheetInfo({
    sheetid: 'first',
    date: '0',
    site: '0',
    start_time: '0',
    scorekeeper: 'Dudebro',
    oppscorekeeper: 'Dudebro2',
    timekeeper: 'Dudebro3',
    head_official: 'Dudebro4',
    umpire: 'Dudebro5',
    field_judge: 'Dudebro6',
    lengthofquarters: 'LMAO',
    weathercondition: 'XD'
  });

  return res;
}