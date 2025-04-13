import { themeToBool } from "$lib/conversion/general";
import type { LayoutServerLoad } from "./$types";
export const load: LayoutServerLoad = async ({ cookies }) => {
  const username = cookies.get("username");
  const role = cookies.get("user-role");
  const theme = themeToBool(cookies.get("colortheme"));
  console.log("username: ", username);
  if (role == "admin") {
    return { theme: theme, isLoggedIn: username || null, userRole: "Webmaster" };
  } else if (role == "score-keeper") {
    return { theme: theme, isLoggedIn: username || null, userRole: "Scorekeeper" };
  } else if (role == "coach") {
    return { theme: theme, isLoggedIn: username || null, userRole: "Coach" };
  } else {
    return { theme: theme, isLoggedIn: username || null, userRole: role || null };
  }
};
