import type { PageServerLoad } from "./$types";
import type { Team } from "$lib/database/Team";

// Loads in all the teams from the api
export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch("/api/teams")
    const teams: Team[] = await response.json()
    return {  teams }
}