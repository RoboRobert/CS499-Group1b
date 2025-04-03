import type { PageServerLoad } from './$types';
import { error } from "@sveltejs/kit";
import type { Player } from '$lib/database/Team';

// Loads in all the players from the api
export const load: PageServerLoad = async ({ params, fetch }) => {
    const playerName = params.player;  // Extracts the slug from the URL

    try {
        const response = await fetch(`/api/players/${playerName}`);
        if (!response.ok) {
            throw error(response.status, 'Failed to fetch players');
        }
        const player: Player = await response.json();

        if (!player) {
            throw error(404, 'Player not found');
        }

        return {
            player
        };
    } catch (err) {
        console.error('Error loading data:', err);
        // Return default values if there is an error
        // return {
        //     player: {
        //         playerId,
        //         firstName: 'Default',
        //         lastName: 'Player',
        //         hometown: 'Default Hometown',
        //         state: 'Default State',
        //         number: '0',
        //         position: 'Default Position',
        //         class: 'Default Class',
        //         heightFeet: '0',
        //         heightInches: '0',
        //         weight: '0',
        //         team: 'Default Team'
        //     }
        // };
    }
};