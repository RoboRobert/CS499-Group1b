import type { SheetErr } from "$lib/checkers/backendChecker";
import { removeError } from "$lib/checkers/frontendChecker.svelte";
import {
  clears,
  coachName,
  extraMan,
  faceoffs,
  game_id,
  getPlayerMap,
  goalTrack,
  metaStats,
  penalties,
  saves,
  substitutions,
  teamName,
  timeouts,
  turnovers,
  type SheetData,
} from "$lib/components/scoresheet/data.svelte";
import { getGoals } from "$lib/components/scoresheet/data.svelte";

// Returns true or false if any of the fields of an object are null or undefined
// function checkObj(object): boolean {
//     return Object.values(object).every((value) => value != null && value != undefined);
// }

// Returns true or false if all the fields of an object are null or undefined
export function checkObj(object): boolean {
  const valuesToCheck = Object.entries(object)
    .filter(([key]) => key !== "index")
    .map(([, value]) => value);

  return !valuesToCheck.every((value) => value === null || value === "" || value == undefined);
}

export function checkGoal(object): boolean {
  const valuesToCheck = Object.entries(object)
    .filter(([key]) => key !== "index" && key !== "quarter")
    .map(([, value]) => value);

  return !valuesToCheck.every((value) => value === null || value === "" || value == undefined);
}

// Returns the data needed to send a scoresheet to the database.
export function getScoresheetData(): SheetData {
  return {
    game_id: game_id.game_id,
    turnovers: turnovers,
    substitutions: substitutions,
    coachName: coachName,
    teamName: teamName,
    players: [Array.from(getPlayerMap(0).values()), Array.from(getPlayerMap(1).values())],
    saves: saves,
    goalTrack: [goalTrack[0].filter((p) => checkGoal(p)), goalTrack[1].filter((p) => checkGoal(p))],
    goals: [getGoals(0), getGoals(1)],
    clears: clears,
    faceoffs: faceoffs,
    extraMan: extraMan,
    timeouts: timeouts,
    penalties: [penalties[0].filter((p) => checkObj(p)), penalties[1].filter((p) => checkObj(p))],
    metaStats: metaStats,
  };
}

export async function checkScoresheet(): Promise<SheetErr[]> {
  // Start by resetting all existing errors.
  document
    .querySelectorAll("*")
    .values()
    .forEach((e) => removeError(e));

  const scoresheetData: SheetData = getScoresheetData();
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
