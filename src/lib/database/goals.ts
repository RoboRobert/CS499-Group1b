import sql from "$lib/database/postgres.server";
import type { Goal } from "$lib/database/Goal";

export async function getGoals(): Promise<Goal[]> {
  const players = await sql<Goal[]>`
      SELECT * FROM goals
    `;

  return players;
}

export async function getGoal(sheetid: number): Promise<Goal> {
  const players = await sql<Goal[]>`
      SELECT * FROM goals WHERE sheetid = ${sheetid}
    `;

  return players[0];
}

export async function addGoal(goal: Goal) {
  let sheetid = goal.sheetid;
  let time = goal.time;
  let playerno_score = goal.playerscore;
  let playerno_assist = goal.playerassist;
  let goaltype = goal.goaltype;
  const result = await sql`
    INSERT INTO goals (sheetid, time, playerno_score, playerno_assist, goaltype) VALUES (${sheetid}, ${time}, ${playerno_score}, ${playerno_assist}, ${goaltype}) RETURNING *
  `;

  return result;
}

export async function deleteGoal(sheetid: number) {
  const result = await sql`
      DELETE FROM goals WHERE sheetid = ${sheetid}
    `;

  return result;
}

export async function dbGoalReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'goals';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  //Not entirely sure about this for the table
  await sql`CREATE TABLE goals(
            SHEET_ID INT,
            TIME INT,
            PLAYERNO_SCORE INT,
            PLAYERNO_ASSIST INT,
            GOALTYPE varchar(1),
            Foreign key (SHEET_ID) references sheets(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`;

  const res = await sql`INSERT INTO gamestats 
            (SHEET_ID, TIME, PLAYERNO_SCORE, PLAYERNO_ASSIST, GOALTYPE)
            VALUES (0, 0, 0, 0, X);`;

  return res;
}
