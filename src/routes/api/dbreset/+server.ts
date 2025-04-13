import { error, json } from '@sveltejs/kit';
import { dbReset } from '$lib/database/dbreset';

export async function GET({cookies}) {
    const token = cookies.get("user-role");
    if (token !== "admin") {
       error(403, "You don't have the right O you don't have the right");
    }
    await dbReset();
    return json({message: 'Database reset'});
}