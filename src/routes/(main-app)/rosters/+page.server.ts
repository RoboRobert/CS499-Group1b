import type { team } from "./rosters.svelte";
import type { PageServerLoad } from "./$types";

// Loads in all the teams from the api
export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch("/api/teams")
    const teams: team[] = await response.json()
    return {  teams }
}