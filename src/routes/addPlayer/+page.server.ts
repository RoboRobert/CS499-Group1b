import * as db from '$lib/dbtest';
import type { Player } from '$lib/Player';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {

};

export const actions = {
    addPlayer: async ({ cookies, request }) => {
        const data = await request.formData();
        let player: Player = {name: data.get('name').toString(), team: data.get('team').toString()};

        db.addPlayer(player);
    }
} satisfies Actions;