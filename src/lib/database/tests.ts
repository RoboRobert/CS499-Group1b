import { sql } from "./postgres.server";
import type { Test } from "$lib/database/Test";

export async function getTests(): Promise<Test[]> {
  const test = await sql<Test[]>`
      SELECT * FROM tests;
    `;

  return test;
}

export async function addTest(test: Test) {
  let arr = test.arr;
  const result = await sql`
    INSERT INTO tests (arr) VALUES (${arr}) RETURNING *
  `;

  return result;
}

export async function dbTestReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'tests';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE tests(
            ARR INTEGER[]);`;

  const res = await addTest({
    arr: [1,2,3,4,5]
  });

  return res;
}
