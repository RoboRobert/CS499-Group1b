import { themeToBool } from "$lib/conversion/general";
import type { LayoutServerLoad } from "./$types";
export const load: LayoutServerLoad = async ({ cookies }) => {
  const username = cookies.get("username");
  const role = cookies.get("user-role");
  const theme = themeToBool(cookies.get("colortheme"));

  return {username: username || null, role: role || null, theme}
};
