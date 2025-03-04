import postgres from 'postgres'
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { SheetInfo } from '$lib/SheetInfo';

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

  await sql`CREATE TABLE sheetinfos (
      name VARCHAR(100) NOT NULL
    );`

  const res = await sql`INSERT INTO players (name)
    VALUES ('Team A'), 
        ('Team B');`

  return res;
}