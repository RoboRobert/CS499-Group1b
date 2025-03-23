import type { PageServerLoad } from './$types';
import type { game, scoresheet } from '../pastgames.svelte';
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, fetch }) => {
    const gameId = params.gameID;  // Extracts the slug from the URL
    try {
        const response = await fetch(`/api/games`);
        if (!response.ok) {
            throw error(response.status, 'Failed to fetch games');
        }
        const games: game[] = await response.json();
        const game: game = games.find((game) => game.gameId === gameId);

        const response2 = await fetch(`/api/scorsheets`);
        if (!response2.ok) {
            throw error(response2.status, 'Failed to fetch scoresheets');
        }
        const scorsheets: scoresheet[] = await response2.json();
        const gameScoresheets: scoresheet[] = scorsheets.filter((scorsheet) => scorsheet.gameId === gameId);

        return {
            game,
            gameScoresheets
        };
    } catch (err) {
        console.error('Failed to fetch data:', err);
        throw error(500, 'Internal Server Error');
    }
};
