import sql from "$lib/database/postgres.server";
import type { GameStat } from "$lib/database/GameStats";

// export async function getGameStats(): Promise<GameStat[]> {
//   const players = await sql<GameStat[]>`
//       SELECT * FROM gamestats
//     `;

//   return players;
// }

export async function getGameStat(sheetid: string): Promise<GameStat[]> {
  const gameStats = await sql<GameStat[]>`
      SELECT * FROM gamestats WHERE sheet_id = ${sheetid}
    `;

  return gameStats;
}

export async function addGameStat(gamestat: GameStat) {
  let sheetID = gamestat.sheet_id;
  let side = gamestat.side;
  let quarter = gamestat.quarter;
  let ground = gamestat.ground;
  let shots = gamestat.shots;
  let clearpass = gamestat.clears_pass;
  let clearfail = gamestat.clears_fail;
  let extrascore = gamestat.extra_man_score;
  let extrafail = gamestat.extra_man_fail;
  let faceoffwin = gamestat.faceoff_win;
  let faceoffloss = gamestat.faceoff_loss;
  const result = await sql`
    INSERT INTO gamestats (sheet_id, side, quarter, ground, shots, CLEARS_PASS, CLEARS_FAIL, EXTRA_MAN_SCORE, EXTRA_MAN_FAIL, FACEOFF_WIN, FACEOFF_LOSS) VALUES (${sheetID}, ${side}, ${quarter}, ${ground}, ${shots}, ${clearpass}, ${clearfail}, ${extrascore}, ${extrafail}, ${faceoffwin}, ${faceoffloss}) RETURNING *
  `;

  return result;
}

export async function addgameStats(gameStats: GameStat[]) {
  for(const stat of gameStats) {
    await addGameStat(stat);
  }
}

export async function deleteGameStat(sheetid: number) {
  const result = await sql`
      DELETE FROM gamestats WHERE sheetid = ${sheetid}
    `;

  return result;
}

export async function dbGameStatReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'gamestats';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE gamestats(
            SHEET_ID VARCHAR(100),
            SIDE INT,
            QUARTER INT,
            GROUND INT,
            SHOTS INT,
            CLEARS_PASS INT,
            CLEARS_FAIL INT,
            EXTRA_MAN_SCORE INT,
            EXTRA_MAN_FAIL INT,
            FACEOFF_WIN INT,
            FACEOFF_LOSS INT,
            Foreign key (SHEET_ID) references sheets(SHEET_ID) ON DELETE CASCADE ON UPDATE CASCADE);`;

  const res = addGameStat({
    sheet_id: "dudes-bros-2025-04-03-15:20-0",
    side: 0,
    quarter: 1,
    ground: 3,
    shots: 4,
    clears_pass: 5,
    clears_fail: 7,
    extra_man_score: 8,
    extra_man_fail: 9,
    faceoff_win: 2,
    faceoff_loss: 1
  })

  return res;
}
