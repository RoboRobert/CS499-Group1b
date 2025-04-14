import type { Game } from "$lib/database/Sheet";
import type { PageServerLoad } from "./$types";

// Loads in all the teams from the api
export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch("/api/games");
  const games: Game[] = await response.json();
  return { games };
};
