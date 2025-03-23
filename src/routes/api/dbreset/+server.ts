import { json } from '@sveltejs/kit';
import { dbReset } from '$lib/database/dbreset';

export async function GET() {
    await dbReset();
    return json({message: 'Database reset'});
}