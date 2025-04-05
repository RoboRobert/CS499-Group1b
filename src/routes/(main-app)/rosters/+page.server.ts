import type { PageServerLoad } from "./$types";
import type { Team } from "$lib/database/Team";
import { error } from "@sveltejs/kit";

// Loads in all the teams from the api
export const load: PageServerLoad = async ({ fetch, cookies}) => {
    const token = cookies.get("user-role");
    if (token !== "coach" && token !== "admin") {
        error(403, "You don't have the right O you don't have the right");
    }
    const response = await fetch("/api/teams")
    const teams: Team[] = await response.json()
    return {  teams, token }
}