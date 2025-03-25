import type { PageServerLoad } from "./$types";
import type { Team } from "$lib/database/Team";
import type { Game } from "$lib/database/Sheet";

// Loads in all the teams from the api
export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch("/api/games")
    const games: Game[] = await response.json()
    return {  games }
}