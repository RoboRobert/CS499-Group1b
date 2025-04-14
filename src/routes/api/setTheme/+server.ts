import { json } from "@sveltejs/kit";

export async function GET({ url, cookies }) {
  const theme = url.searchParams.get("theme");

  if (theme) {
    cookies.set("colortheme", theme, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return json({ success: true });
}
