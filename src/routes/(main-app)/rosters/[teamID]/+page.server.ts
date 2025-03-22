import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import type {player, team} from '../rosters.svelte'


// Idea is that this loads in each of the teams from the api then we find the team that has the same id as the teamID
export const load: PageServerLoad =  async ({ params, fetch }) => {
    const teamId = params.teamID;  // Extracts the slug from the URL

    const response = await fetch(`/api/teams`);
    const teams: team[] = await response.json();
    const team: team = teams.find((team) => team.teamId === teamId);
    
    if (!team) {
      throw error(404, 'Team not found');
    }

    // Gets all players from the api
    const response2 = await fetch(`/api/players`);
    const players:player[] = await response2.json();
    // Filters out the players that are in the team
    const teamPlayers: player[] = players.filter((player) => player.team === teamId);

    // Adds the players to the team object
    for (const player of teamPlayers) {
        team.players.push(player);
    }

    
    
    return {
        team
    };
};