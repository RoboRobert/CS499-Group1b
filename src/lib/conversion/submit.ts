import type { SheetErr } from "$lib/checkers/backendChecker";
import {
  clears,
  coachName,
  extraMan,
  faceoffs,
  game_id,
  getPlayerMap,
  goals,
  goalTrack,
  groundBalls,
  metaStats,
  penalties,
  saves,
  shots,
  teamName,
  timeouts,
  type SheetData,
} from "$lib/components/scoresheet/data.svelte";

// Returns true or false if all the fields of an object are null or undefined
function checkObj(object): boolean {
    return Object.values(object).every((value) => value != null && value != undefined);
}

// function checkObj(object): boolean {
//   const valuesToCheck = Object.entries(object)
//     .filter(([key]) => key !== "index")
//     .map(([, value]) => value);

//   console.log(valuesToCheck);

//   return !valuesToCheck.every((value) => value === null || value === "" || value == undefined);
// }

// Returns the data needed to send a scoresheet to the database.
export function getScoresheetData(): SheetData {
  return {
    game_id: game_id.game_id,
    coachName: coachName,
    teamName: teamName,
    players: [Array.from(getPlayerMap(0).values()), Array.from(getPlayerMap(1).values())],
    saves: saves,
    goals: goals,
    goalTrack: [goalTrack[0].filter((p) => checkObj(p)), goalTrack[1].filter((p) => checkObj(p))],
    groundBalls: groundBalls,
    shots: shots,
    clears: clears,
    faceoffs: faceoffs,
    extraMan: extraMan,
    timeouts: timeouts,
    penalties: [penalties[0].filter((p) => checkObj(p)), penalties[1].filter((p) => checkObj(p))],
    metaStats: metaStats,
  };
}

// Returns all the data needed to check the scoresheet.
export function getCheckData(): SheetData {
  return {
    game_id: game_id.game_id,
    coachName: coachName,
    teamName: teamName,
    players: [Array.from(getPlayerMap(0).values()), Array.from(getPlayerMap(1).values())],
    saves: saves,
    goals: goals,
    goalTrack: goalTrack,
    groundBalls: groundBalls,
    shots: shots,
    clears: clears,
    faceoffs: faceoffs,
    extraMan: extraMan,
    timeouts: timeouts,
    penalties: penalties,
    metaStats: metaStats,
  };
}

export async function checkScoresheet(): Promise<SheetErr[]> {
  const scoresheetData: SheetData = getCheckData();
  const scoresheetJSON = JSON.stringify(scoresheetData);

  console.log(scoresheetJSON);

  // Ask the scoresheet/check endpoint if the scoresheet is valid.
  try {
    const result = await fetch("/api/scoresheet/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: scoresheetJSON,
    });

    // Await the JSON data resolution
    const data = await result.json();

    let errors: SheetErr[] = data.errors;
    return errors;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadScoresheet() {
  const scoresheetData: SheetData = getScoresheetData();
  const scoresheetJSON = JSON.stringify(scoresheetData);

  // Send the scoresheet data to the scoresheet/add endpoint
  try {
    const result = await fetch("/api/scoresheet/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: scoresheetJSON,
    });

    // Await the JSON data resolution
    const data = await result.json();
  } catch (error) {
    console.error(error);
  }
}

export async function correctScoresheet() {
  const scoresheetData: SheetData = getScoresheetData();
  const scoresheetJSON = JSON.stringify(scoresheetData);
  // Send the scoresheet data to the scoresheet POST endpoint
  try {
    const result = await fetch("/api/scoresheet/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: scoresheetJSON,
    });
  } catch (error) {
    console.error(error);
  }

  // Delete the previous scoresheet
  try {
    const result = await fetch(`/api/scoresheet/${game_id.sheet_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
