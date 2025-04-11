import type { LayoutServerLoad } from "./$types";
import { themeToBool } from "$lib/conversion/general";

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
    cookies.set("user-role", "admin", { path: '/' })

    // const token =cookies.get("user-role");
    // const visitorSBKRestrictedPaths = [ "/rosters", "/rosters/[teamID]", "/rosters/[teamID]/[player]" ];
    // const currentPath = new URL(fetch.url).pathname; // Get the current path from the fetch URL
    // if(token == "guest" && visitorSBKRestrictedPaths.includes(currentPath)|| token == "score-keeper" && visitorSBKRestrictedPaths.includes(currentPath)) {
    //   
    // }

    const theme = themeToBool(cookies.get("colortheme"));
    // const pathname = url.pathname;
    // console.log("searchParams", searchParams);
    // console.log("pathname", pathname);
    
    return { theme };
    
}