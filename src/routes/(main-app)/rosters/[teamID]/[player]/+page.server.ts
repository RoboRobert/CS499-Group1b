import type { PageServerLoad } from './$types';

// Loads in all the players from the api
export const load: PageServerLoad = async ({ params, fetch }) => {
    const playerId = params.player;  // Extracts the slug from the URL

    const response = await fetch(`/api/players`);
    const players = await response.json();
    // Searches for the player with the same id as the playerID
    const player = players.find((player) => player.id === playerId);
   
   

    return {
        player
    };
};