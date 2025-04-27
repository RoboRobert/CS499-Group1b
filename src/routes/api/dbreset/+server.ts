import { dbReset } from '$lib/database/dbreset';
import { json } from '@sveltejs/kit';

export async function GET({cookies}) {
    await dbReset();
    return json({message: 'Database reset'});
}