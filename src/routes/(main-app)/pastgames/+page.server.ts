import { getGames } from "$lib/database/sheets";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const token = cookies.get("user-role");
  try {
    const games = await getGames();
    return {
      games,
    };
  } catch (err) {
    console.error("Failed to fetch games:", err);
  }
};
