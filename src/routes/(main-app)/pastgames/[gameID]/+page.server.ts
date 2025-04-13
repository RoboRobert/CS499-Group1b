import { getGame, getSheetsByGame } from "$lib/database/sheets";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
  const token = cookies.get("user-role");
  const gameID = params.gameID; // Extracts the slug from the URL
  try {
    const game = await getGame(gameID);
    const scoresheets = await getSheetsByGame(gameID);

    return {
      game,
      scoresheets,
      token,
    };
  } catch (err) {
    console.error("Failed to fetch data:", err);
    throw error(500, "Internal Server Error");
  }
};
