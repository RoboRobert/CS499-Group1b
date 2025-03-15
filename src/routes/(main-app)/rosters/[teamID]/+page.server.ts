import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';


// Idea is that this loads in each of the teams from the api then we find the team that has the same id as the teamID
export const load: PageServerLoad =  async ({ params, fetch }) => {
    const teamId = params.teamID;  // Extracts the slug from the URL

    const response = await fetch(`/api/teams`);
    const teams = await response.json();
    const team = teams.find((team) => team.id === teamId);
    
    if (!team) {
      throw error(404, 'Team not found');
    }

    // Gets all players from the api
    const response2 = await fetch(`/api/players`);
    const players = await response2.json();
    // Filters out the players that are in the team
    const teamPlayers = players.filter((player) => player.teamId === teamId);

    // Adds the players to the team object
    for (const player of teamPlayers) {
        team.players.push(player);
    }

    
    
    return {
        team
    };
};