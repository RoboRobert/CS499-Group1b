import type { Game, Sheet } from '$lib/database/Sheet';
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import { getGame, getSheets, getSheetsByGame } from '$lib/database/sheets';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const gameID = params.gameID;  // Extracts the slug from the URL
    try {
        const game = await getGame(gameID);
        const scoresheets = await getSheetsByGame(gameID);

        return {
            game,
            scoresheets
        };
    } catch (err) {
        console.error('Failed to fetch data:', err);
        throw error(500, 'Internal Server Error');
    }
};
