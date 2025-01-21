import type { PageServerLoad } from './$types';
import * as db from '$lib/db';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    let data = await db.getPlayers();

    console.log(data);

    return { data };
};