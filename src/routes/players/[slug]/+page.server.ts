import type { PageServerLoad } from '../$types';
import * as db from '$lib/dbtest';

export const load: PageServerLoad = async ({ params }) => {
    let id = params.slug;
    let data = await db.getPlayer(id);

    return { data };
};