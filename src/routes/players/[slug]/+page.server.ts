import * as db from '$lib/dbtest';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    let id = params.slug;
    let data = await db.getPlayer(parseInt(id));

    return { data };
};