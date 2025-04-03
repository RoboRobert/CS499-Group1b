import type { Game, Sheet } from '$lib/database/Sheet';
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const gameId = params.gameID;  // Extracts the slug from the URL
    try {
        const response = await fetch(`/api/games`);
        if (!response.ok) {
            throw error(response.status, 'Failed to fetch games');
        }
        const games: Game[] = await response.json();
        const game: Game = games[0];

        const response2 = await fetch(`/api/sheets?gameid=${game.gameid}`);
        if (!response2.ok) {
            throw error(response2.status, 'Failed to fetch scoresheets');
        }
        const scoresheets: Sheet[] = await response2.json();

        return {
            game,
            scoresheets
        };
    } catch (err) {
        console.error('Failed to fetch data:', err);
        throw error(500, 'Internal Server Error');
    }
};
