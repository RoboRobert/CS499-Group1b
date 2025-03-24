import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { player, team } from '../rosters.svelte';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const teamId = params.teamID;  // Extracts the slug from the URL

    try {
        const response = await fetch(`/api/teams`);
        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        }
        const teams: team[] = await response.json();
        const team: team = teams.find((team) => team.teamId === teamId);

        if (!team) {
            throw error(404, 'Team not found');
        }

        // Gets all players from the api
        const response2 = await fetch(`/api/players`);
        if (!response2.ok) {
            throw new Error('Failed to fetch players');
        }
        const players: player[] = await response2.json();
        // Filters out the players that are in the team
        const teamPlayers = players.filter(player => player.team === teamId);

        return {
            loadTeam: { ...team, players: teamPlayers }
        };
    } catch (err) {
        console.error('Error loading data:', err);
        // Return default values if there is an error
        return {
            loadTeam: {
                teamId,
                name: 'Default Team',
                hometown: 'Default Hometown',
                state: 'Default State',
                coach: 'Default Coach',
                players: []
            }
        };
    }
};