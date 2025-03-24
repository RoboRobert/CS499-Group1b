import type { PageServerLoad } from './$types';
import type { player } from '../../rosters.svelte';
import { error } from "@sveltejs/kit";

// Loads in all the players from the api
export const load: PageServerLoad = async ({ params, fetch }) => {
    const playerId = params.player;  // Extracts the slug from the URL

    try {
        const response = await fetch(`/api/players`);
        if (!response.ok) {
            throw error(response.status, 'Failed to fetch players');
        }
        const players: player[] = await response.json();
        // Searches for the player with the same id as the playerID
        const player: player = players.find((player) => player.playerId === playerId);

        if (!player) {
            throw error(404, 'Player not found');
        }

        return {
            player
        };
    } catch (err) {
        console.error('Error loading data:', err);
        // Return default values if there is an error
        return {
            player: {
                playerId,
                firstName: 'Default',
                lastName: 'Player',
                hometown: 'Default Hometown',
                state: 'Default State',
                number: '0',
                position: 'Default Position',
                class: 'Default Class',
                heightFeet: '0',
                heightInches: '0',
                weight: '0',
                team: 'Default Team'
            }
        };
    }
};