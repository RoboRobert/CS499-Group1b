import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    const teamId = params.teamID;  // Extracts the slug from the URL
    return {
        teamId  // Passes it to the page as a prop
    };
};