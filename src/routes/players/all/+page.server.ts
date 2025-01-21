import type { PageServerLoad } from '../$types';
import * as db from '$lib/dbtest';

export const load: PageServerLoad = async ({ params }) => {
    let data = await db.getPlayers();

	return { data };
};