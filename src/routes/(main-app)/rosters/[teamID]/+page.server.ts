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
    
    return {
        team
    };
};