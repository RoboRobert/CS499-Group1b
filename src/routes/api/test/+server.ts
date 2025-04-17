import { json, type RequestHandler } from "@sveltejs/kit"
import { Complete_Insert_test } from "$lib/Tests/Inserts_Testing"

export const GET: RequestHandler = async (event) => {
    console.log(event)
    const teams = await Complete_Insert_test()
    return json(teams)
}
