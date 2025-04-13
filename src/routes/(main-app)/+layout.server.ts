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
    const role = cookies.get("user-role");
    console.log("username: ", username);
    if(role == "admin"){
        return {isLoggedIn: username || null, userRole: "Webmaster"};
    }
    else if (role == "score-keeper"){
        return {isLoggedIn: username || null, userRole: "Scorekeeper"};
    }
    else if (role == "coach"){
        return {isLoggedIn: username || null, userRole: "Coach"};
    }
    else {
        return {isLoggedIn: username || null, userRole: role || null};
    }
    

    
}