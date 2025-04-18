import { json } from "@sveltejs/kit";

export async function GET({ url, cookies }) {
  const theme = url.searchParams.get("theme");

  if (theme) {
    cookies.set("colortheme", theme, {
      path: '/',  // The cookie is valid for all paths
      sameSite: 'strict',  // Prevents the cookie from being sent on cross-site requests
      httpOnly: true,  // For security, prevent access to the cookie via JavaScript
      secure: false,
      maxAge: 60 * 60 * 24,  // Cookie expires in 1 day (adjust as needed)
    });
  }

  return json({ success: true });
}
