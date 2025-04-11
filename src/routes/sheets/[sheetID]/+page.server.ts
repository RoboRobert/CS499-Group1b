import { themeToBool } from "$lib/conversion/general";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get("user-role");
    if (token !== "coach" && token !== "admin" && token !== "score-keeper") {
        throw new Error("You don't have the right O you don't have the right");
    }

    const theme = themeToBool(cookies.get("colortheme"));

    return { theme }
}