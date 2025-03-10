import type { PageLoad } from './$types';
import { teams } from '../rosters.svelte';

export const load: PageLoad = ({ params }) => {
    const teamId = params.teamID;  // Extracts the slug from the URL

    

    return {
        teamId
    };
};