import { checkSheet, type SheetErr } from "$lib/checkers/backendChecker.js";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST = async ({ request }) => {
  // Parse incoming JSON data from the request body
  const data = await request.json();

  const errors = checkSheet(data);

  // Return an array of any errors found in the sheet.
  return json({errors: errors});
};
