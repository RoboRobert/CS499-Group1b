import { getSheets } from "$lib/database/sheets";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const scoresheets = await getSheets()

    return json(scoresheets)
}
