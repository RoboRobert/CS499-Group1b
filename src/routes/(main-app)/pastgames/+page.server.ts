import type { Game } from '$lib/database/Sheet';
import { getGames } from '$lib/database/sheets';
import type { PageServerLoad } from './$types';
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const games = await getGames();
        return {
            games
        };
    } catch (err) {
        console.error('Failed to fetch games:', err);
        return {
            games: [] // Return an empty array or a default value
        };
    }
};