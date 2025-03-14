import type { PageServerLoad } from './$types';

// Idea this loads in all the teams from the api then we go through each teams to find the player that has the same idea
// given that each player has a unique id that is used as the slug
export const load: PageServerLoad = async ({ params, fetch }) => {
    const playerId = params.player;  // Extracts the slug from the URL

    const response = await fetch(`/api/teams`);
    const teams = await response.json();
    let player;
    let team;

    for (const t of teams) {
        player = t.players.find((p) => p.id === playerId);
        if (player) {
            team = t;
            break;
        }
    }

    return {
        player,
        team
    };
};