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
  let index = goal.index;
  let time = goal.time;
  let playerno_score = goal.playerno_score;
  let playerno_assist = goal.playerno_assist;
  let goaltype = goal.goaltype;
  let quarter = goal.quarter;
  const result = await sql`
      INSERT INTO goals (sheet_id, side, index, time, playerno_score, playerno_assist, goaltype, quarter) VALUES (${sheetid}, ${side}, ${index}, ${time}, ${playerno_score}, ${playerno_assist}, ${goaltype}, ${quarter}) RETURNING *;`;
}

export async function addGoals(goals: Goal[]) {
  for(const goal of goals) {
    addGoal(goal);
  }
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
              SHEET_ID VARCHAR(300),
              SIDE INT,
              INDEX INT,
              TIME varchar(5),
              PLAYERNO_SCORE INT,
              PLAYERNO_ASSIST INT,
              GOALTYPE varchar(1),
              QUARTER INT,
              Foreign key (SHEET_ID) references sheets(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`;

  const res = await addGoal({
    sheet_id: "dudes-bros-2025-04-03-15:20-0",
    side: 0,
    index: 0,
    time: "3:30",
    playerno_score: 42,
    playerno_assist: 69,
    goaltype: "F",
    quarter: 2
  });

  return res;
}
