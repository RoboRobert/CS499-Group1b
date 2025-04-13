import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    cookies.set("user-role", "guest", { path: '/' })

    // const token =cookies.get("user-role");
    // const visitorSBKRestrictedPaths = [ "/rosters", "/rosters/[teamID]", "/rosters/[teamID]/[player]" ];
    // const currentPath = new URL(fetch.url).pathname; // Get the current path from the fetch URL
    // if(token == "guest" && visitorSBKRestrictedPaths.includes(currentPath)|| token == "score-keeper" && visitorSBKRestrictedPaths.includes(currentPath)) {
    //   
    // }

    // const searchParams = cookies.get("colortheme") || "light";
    // const pathname = url.pathname;
    // console.log("searchParams", searchParams);
    // console.log("pathname", pathname);
    
    // return {
    //     searchParams,
    //     pathname,
    //   };
    
}