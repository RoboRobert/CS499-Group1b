import { themeToBool } from "$lib/conversion/general";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get("user-role");
    const theme = themeToBool(cookies.get("colortheme"));

    return { role: token, theme }
}