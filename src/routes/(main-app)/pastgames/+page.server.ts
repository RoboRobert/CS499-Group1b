import type { Game } from '$lib/database/Sheet';
import type { PageServerLoad } from './$types';
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const response = await fetch(`/api/games`);
        if (!response.ok) {
            throw error(response.status, 'Failed to fetch games');
        }
        const games: Game[] = await response.json();
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