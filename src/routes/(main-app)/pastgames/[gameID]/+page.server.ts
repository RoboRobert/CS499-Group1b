/*import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ params, fetch }) => {
    const gameId = params.gameID;  // Extracts the slug from the URL

    response = await fetch(`/api/games`);
    const games = await response.json();
    const game = games.find((game) => game.id === gameId);

    return {
        game  // Passes it to the page as a prop
    };
};
*/