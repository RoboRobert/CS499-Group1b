import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { player, team } from '../rosters.svelte';
import type { Player, Team } from '$lib/database/Team';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const teamId = params.teamID;  // Extracts the slug from the URL

    try {
        const response = await fetch(`/api/teams`);
        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        }
        const teams: Team[] = await response.json();
        const team: Team = teams.find((team) => team.team_id === teamId);

        if (!team) {
            throw error(404, 'Team not found');
        }

        // Gets all players from the api
        const response2 = await fetch(`/api/teamPlayers/${team.team_id}`);
        if (!response2.ok) {
            throw new Error('Failed to fetch players');
        }
        const players: Player[] = await response2.json();

        return {
            team, players
        };
    } catch (err) {
        console.error('Error loading data:', err);
        // // Return default values if there is an error
        // return {
        //     loadTeam: {
        //         teamId,
        //         name: 'Default Team',
        //         hometown: 'Default Hometown',
        //         state: 'Default State',
        //         coach: 'Default Coach',
        //         players: []
        //     }
        // };
    }
};