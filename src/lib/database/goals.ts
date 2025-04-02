import sql from "$lib/database/postgres.server";
import type { Goal } from "$lib/database/Goal";

export async function getGoals(sheetid: string): Promise<Goal[]> {
  const goals = await sql<Goal[]>`
        SELECT * FROM goals WHERE sheet_id = ${sheetid}
      `;
  return goals;
}

export async function addGoal(goal: Goal) {
  let sheetid = goal.sheet_id;
  let side = goal.side;
  let time = goal.time;
  let playerno_score = goal.playerno_score;
  let playerno_assist = goal.playerno_assist;
  let goaltype = goal.goaltype;
  const result = await sql`
      INSERT INTO goals (sheet_id, side, time, playerno_score, playerno_assist, goaltype) VALUES (${sheetid}, ${side}, ${time}, ${playerno_score}, ${playerno_assist}, ${goaltype}) RETURNING *;`;
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
              SIDE INT,
              TIME INT,
              PLAYERNO_SCORE INT,
              PLAYERNO_ASSIST INT,
              GOALTYPE varchar(1),
              Foreign key (SHEET_ID) references sheets(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`;

  const res = await addGoal({
    sheet_id: 0,
    side: 0,
    time: 0,
    playerno_score: 0,
    playerno_assist: 0,
    goaltype: "",
  });

  return res;
}
