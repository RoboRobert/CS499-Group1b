import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    const gameId = params.gameID;  // Extracts the slug from the URL
    return {
        gameId  // Passes it to the page as a prop
    };
};