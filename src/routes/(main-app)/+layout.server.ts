import type { LayoutServerLoad } from "./$types";
export const load: LayoutServerLoad = async ({ cookies }) => {
    
    // cookies.set("user-role", "admin", { path: '/' })

    // const token =cookies.get("user-role");
    // const visitorSBKRestrictedPaths = [ "/rosters", "/rosters/[teamID]", "/rosters/[teamID]/[player]" ];
    // const currentPath = new URL(fetch.url).pathname; // Get the current path from the fetch URL
    // if(token == "guest" && visitorSBKRestrictedPaths.includes(currentPath)|| token == "score-keeper" && visitorSBKRestrictedPaths.includes(currentPath)) {
    //   
    // }

    const username = cookies.get("username");
    console.log("username: ", username);
    return {_isLoggedIn: username || null};

    
}