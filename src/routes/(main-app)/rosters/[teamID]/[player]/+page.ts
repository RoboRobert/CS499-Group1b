import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    const player = params.player;  // Extracts the slug from the URL
    

    return {
        player  // Passes it to the page as a prop
    };
};