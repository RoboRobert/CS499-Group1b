import type { PageServerLoad } from './$types';
import { error } from "@sveltejs/kit";
import type { Player } from '$lib/database/Team';

// Loads in all the players from the api
export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
    const playerName = params.player;  // Extracts the slug from the URL

    const token = cookies.get("user-role");
    if (token !== "coach" && token !== "admin") {
        error(403, "You don't have the right O you don't have the right");
    }

    try {
        const response = await fetch(`/api/players/${playerName}`);
        if (!response.ok) {
            throw error(response.status, 'Failed to fetch players');
        }
        const player: Player = await response.json();

        console.log(player);

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